import { useState, useCallback, useRef, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  ActivityIndicator, Modal, TextInput, Pressable,
  Alert, RefreshControl, Share, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { supabase } from '../../lib/supabase';
import { useCourse } from '../../lib/courseContext';
import Animated from 'react-native-reanimated';
import { useCollapsingTabBar, useTabBarInset } from '../../lib/tabBar';
import { useColors, T, S, R, GUTTER, HIT, HIT_SLOP } from '../../constants/theme';
import StatusBarScrim from '../../components/StatusBarScrim';
import type { ColorTokens } from '../../constants/theme';

interface Course {
  key: string;
  label: string;
  icon: string;
  hex: string;
  exam_date: string | null;
  is_secret: boolean;
  enrolled: boolean;
}

type ModalMode = 'none' | 'add' | 'code' | 'qr' | 'create';

const EMOJIS = ['📚','📊','📈','🔬','⚙️','💼','⚖️','💡','🌍','🎯','🏛️','🧬','💻','📐','🎓','🧮','📝','🎵'];
const COLORS  = ['#6366f1','#2563eb','#059669','#ea580c','#0d9488','#e11d48','#7c3aed','#ca8a04'];

export default function DashboardScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const onScroll = useCollapsingTabBar();
  const tabInset = useTabBarInset();
  const styles = useMemo(() => makeStyles(c), [c]);
  const { activeCourse, setActiveCourse } = useCourse();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const [enrolled, setEnrolled]     = useState<Course[]>([]);
  const [available, setAvailable]   = useState<Course[]>([]);
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal]           = useState<ModalMode>('none');

  // Code join
  const [secretCode, setSecretCode]       = useState('');
  const [joiningSecret, setJoiningSecret] = useState(false);

  // QR
  const [qrScanned, setQrScanned] = useState(false);

  // Public enroll
  const [joining, setJoining] = useState<string | null>(null);

  // Create course
  const [newName, setNewName]   = useState('');
  const [newEmoji, setNewEmoji] = useState('📚');
  const [newColor, setNewColor] = useState(COLORS[0]);
  const [creating, setCreating] = useState(false);
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  useFocusEffect(useCallback(() => { loadCourses(); }, []));

  async function loadCourses(isRefresh = false) {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const [coursesRes, enrollRes] = await Promise.all([
        supabase.from('k_courses')
          .select('key, label, icon, hex, exam_date, is_secret')
          .eq('active', true).order('sort_order'),
        supabase.from('user_course_enrollments')
          .select('course_key').eq('user_id', user.id),
      ]);
      const enrolledKeys = new Set((enrollRes.data ?? []).map(e => e.course_key));
      const all: Course[] = (coursesRes.data ?? []).map(c => ({ ...c, enrolled: enrolledKeys.has(c.key) }));
      setEnrolled(all.filter(c => c.enrolled));
      setAvailable(all.filter(c => !c.enrolled && !c.is_secret));
    } finally {
      setLoading(false); setRefreshing(false);
    }
  }

  async function enrollCourse(courseKey: string) {
    setJoining(courseKey);
    try {
      const { data, error } = await supabase.rpc('enroll_in_course', { p_course_key: courseKey });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      await loadCourses(); closeModal();
    } catch (e: any) {
      Alert.alert('Fehler', e?.message ?? 'Einschreibung fehlgeschlagen');
    } finally { setJoining(null); }
  }

  async function joinByCode(code?: string) {
    const c = (code ?? secretCode).trim().toUpperCase();
    if (!c) return;
    setJoiningSecret(true);
    try {
      const { data, error } = await supabase.rpc('join_secret_course', { p_code: c });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      await loadCourses(); closeModal();
      Alert.alert('Kurs freigeschaltet', `Du hast "${data.course_label}" ${data.course_icon} freigeschaltet.`);
    } catch (e: any) {
      Alert.alert('Ungültiger Code', e?.message ?? 'Code nicht gefunden');
      setQrScanned(false);
    } finally { setJoiningSecret(false); }
  }

  async function openQR() {
    if (!cameraPermission?.granted) {
      const res = await requestCameraPermission();
      if (!res.granted) {
        Alert.alert('Kamera benötigt', 'Erlaube K-Learning den Kamerazugriff in den Einstellungen.');
        return;
      }
    }
    setQrScanned(false);
    setModal('qr');
  }

  function handleQRScan({ data }: { data: string }) {
    if (qrScanned) return;
    setQrScanned(true);
    // QR codes can contain raw code or a deep link like k-learning://join?code=XXX
    const match = data.match(/[A-Z0-9]{4}-[A-Z0-9]{4}-\d{3}/i) ?? [data.trim()];
    joinByCode(match[0].toUpperCase());
  }

  async function createCourse() {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const { data, error } = await supabase.rpc('create_user_course', {
        p_label: newName.trim(),
        p_icon:  newEmoji,
        p_hex:   newColor,
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      await loadCourses();
      setCreatedCode(data.access_code);
    } catch (e: any) {
      Alert.alert('Fehler', e?.message ?? 'Kurs konnte nicht erstellt werden');
    } finally { setCreating(false); }
  }

  function closeModal() {
    setModal('none'); setSecretCode(''); setQrScanned(false);
    setNewName(''); setNewEmoji('📚'); setNewColor(COLORS[0]); setCreatedCode(null);
  }

  function toggleActive(key: string) {
    setActiveCourse(activeCourse === key ? null : key);
  }

  if (loading) {
    return <View style={styles.center}><ActivityIndicator color={c.textSub} size="large" /></View>;
  }

  const activeLabel = enrolled.find(x => x.key === activeCourse)?.label ?? activeCourse;

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <StatusBarScrim />
      <Animated.ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + S.lg, paddingBottom: tabInset }]}
        scrollEventThrottle={16}
        onScroll={onScroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadCourses(true)} tintColor={c.textSub} />}
      >
        <View style={styles.header}>
          <Text style={styles.heading} accessibilityRole="header">Meine Kurse</Text>
          <Pressable
            style={({ pressed }) => [styles.addBtn, pressed && styles.pressed]}
            onPress={() => setModal('add')}
            accessibilityRole="button"
            accessibilityLabel="Kurs hinzufügen"
          >
            <Ionicons name="add" size={22} color={c.accent} />
            <Text style={styles.addBtnText}>Hinzufügen</Text>
          </Pressable>
        </View>

        {activeCourse && (
          <View style={styles.activeHint}>
            <Ionicons name="radio-button-on" size={18} color={c.green} />
            <Text style={styles.activeHintText}>
              Aktiv: <Text style={{ fontWeight: '600', color: c.text }}>{activeLabel}</Text>
            </Text>
            <Pressable
              onPress={() => setActiveCourse(null)}
              accessibilityRole="button"
              accessibilityLabel="Kursfilter aufheben"
              style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
            >
              <Ionicons name="close-circle" size={22} color={c.textSub} />
            </Pressable>
          </View>
        )}

        {enrolled.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="school-outline" size={44} color={c.textSub} />
            <Text style={styles.emptyTitle}>Noch keine Kurse</Text>
            <Text style={styles.emptyText}>Füge deinen ersten Kurs hinzu.</Text>
            <Pressable
              style={({ pressed }) => [styles.primaryBtn, styles.emptyBtn, pressed && styles.pressed]}
              onPress={() => setModal('add')}
              accessibilityRole="button"
            >
              <Text style={styles.primaryBtnText}>Kurs hinzufügen</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.group}>
            {enrolled.map((course, idx) => {
              const isActive = activeCourse === course.key;
              return (
                <View key={course.key}>
                  {idx > 0 && <View style={styles.rowSeparator} />}
                  <Pressable
                    style={({ pressed }) => [styles.courseRow, pressed && { backgroundColor: c.surfaceHigh }]}
                    onPress={() => toggleActive(course.key)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                    accessibilityLabel={`${course.label}${isActive ? ', aktiv' : ''}`}
                    accessibilityHint={isActive ? 'Tippen hebt den Filter auf' : 'Tippen filtert Feed und Karten auf diesen Kurs'}
                  >
                    <View style={[styles.courseIconBox, { backgroundColor: (course.hex ?? c.accent) + '22' }]}>
                      <Text style={styles.courseIcon}>{course.icon}</Text>
                    </View>
                    <View style={styles.courseInfo}>
                      <Text style={styles.courseLabel}>{course.label}</Text>
                      {course.exam_date && (
                        <Text style={styles.courseMeta}>
                          Prüfung {new Date(course.exam_date).toLocaleDateString('de-CH', { day: '2-digit', month: 'short' })}
                        </Text>
                      )}
                      {course.is_secret && (
                        <View style={styles.secretRow}>
                          <Ionicons name="lock-closed" size={12} color={c.textSub} />
                          <Text style={styles.courseMeta}>Privat</Text>
                        </View>
                      )}
                    </View>
                    {isActive
                      ? <View style={styles.activeCheck}><Ionicons name="checkmark-circle" size={22} color={c.green} /><Text style={styles.activeCheckText}>Aktiv</Text></View>
                      : <Ionicons name="radio-button-off" size={22} color={c.textMuted} />
                    }
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}

        <Text style={styles.tip}>
          {activeCourse ? 'Tippe erneut, um den Filter aufzuheben.' : 'Tippe auf einen Kurs, um Feed und Karten zu filtern.'}
        </Text>
      </Animated.ScrollView>

      {/* ── MODAL ── */}
      <Modal visible={modal !== 'none'} animationType="slide" transparent onRequestClose={closeModal}>

        {/* ── QR FULLSCREEN ── */}
        {modal === 'qr' && (
          <View style={styles.qrContainer}>
            <CameraView
              style={StyleSheet.absoluteFill}
              facing="back"
              onBarcodeScanned={handleQRScan}
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            />
            {/* Overlay */}
            <View style={styles.qrOverlay}>
              <Pressable
                style={styles.qrClose}
                onPress={closeModal}
                accessibilityRole="button"
                accessibilityLabel="Scanner schliessen"
              >
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
              <View style={styles.qrFrame} />
              <Text style={styles.qrHint}>
                {joiningSecret ? 'Code wird geprüft…' : 'QR-Code auf den Rahmen ausrichten'}
              </Text>
              {joiningSecret && <ActivityIndicator color="white" style={{ marginTop: S.md }} />}
            </View>
          </View>
        )}

        {/* ── SHEET MODES ── */}
        {modal !== 'qr' && (
          <Pressable style={styles.overlay} onPress={closeModal} accessibilityLabel="Schliessen">
            <Pressable style={styles.sheet} onPress={() => {}}>
              <View style={styles.sheetHandle} />

              {/* ── ADD ── */}
              {modal === 'add' && (
                <>
                  <Text style={styles.sheetTitle} accessibilityRole="header">Kurs hinzufügen</Text>

                  <View style={styles.addOptionGrid}>
                    <Pressable style={({ pressed }) => [styles.addOption, pressed && styles.pressed]} onPress={openQR} accessibilityRole="button">
                      <View style={[styles.addOptionIcon, { backgroundColor: c.accentSoft }]}>
                        <Ionicons name="qr-code-outline" size={26} color={c.accent} />
                      </View>
                      <Text style={styles.addOptionLabel}>QR scannen</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [styles.addOption, pressed && styles.pressed]} onPress={() => setModal('code')} accessibilityRole="button">
                      <View style={[styles.addOptionIcon, { backgroundColor: c.accentSoft }]}>
                        <Ionicons name="key-outline" size={26} color={c.accent} />
                      </View>
                      <Text style={styles.addOptionLabel}>Code eingeben</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [styles.addOption, pressed && styles.pressed]} onPress={() => setModal('create')} accessibilityRole="button">
                      <View style={[styles.addOptionIcon, { backgroundColor: c.accentSoft }]}>
                        <Ionicons name="add-circle-outline" size={26} color={c.accent} />
                      </View>
                      <Text style={styles.addOptionLabel}>Eigener Kurs</Text>
                    </Pressable>
                  </View>

                  {available.length > 0 && (
                    <>
                      <Text style={styles.sheetSection}>Öffentliche Kurse beitreten</Text>
                      <View style={styles.sheetGroup}>
                        {available.map((course, idx) => (
                          <View key={course.key}>
                            {idx > 0 && <View style={styles.rowSeparator} />}
                            <Pressable
                              style={({ pressed }) => [styles.availableRow, pressed && { backgroundColor: c.surfaceHigh }]}
                              onPress={() => enrollCourse(course.key)}
                              disabled={joining === course.key}
                              accessibilityRole="button"
                              accessibilityLabel={`${course.label} beitreten`}
                            >
                              <View style={[styles.availableIcon, { backgroundColor: (course.hex ?? c.accent) + '22' }]}>
                                <Text style={{ fontSize: 18 }}>{course.icon}</Text>
                              </View>
                              <Text style={styles.availableLabel}>{course.label}</Text>
                              {joining === course.key
                                ? <ActivityIndicator size="small" color={c.textSub} />
                                : <Ionicons name="add-circle-outline" size={24} color={c.accent} />
                              }
                            </Pressable>
                          </View>
                        ))}
                      </View>
                    </>
                  )}
                </>
              )}

              {/* ── CODE ── */}
              {modal === 'code' && (
                <>
                  <Pressable onPress={() => setModal('add')} style={({ pressed }) => [styles.backRow, pressed && styles.pressed]} accessibilityRole="button" accessibilityLabel="Zurück" hitSlop={HIT_SLOP}>
                    <Ionicons name="chevron-back" size={24} color={c.accent} />
                    <Text style={styles.backText}>Zurück</Text>
                  </Pressable>
                  <Text style={styles.sheetTitle} accessibilityRole="header">Einladungscode eingeben</Text>
                  <Text style={styles.sheetSub}>Gib den Code ein, den du erhalten hast.</Text>
                  <View style={styles.codeInputRow}>
                    <Ionicons name="lock-closed-outline" size={20} color={c.textSub} style={{ marginRight: S.sm }} />
                    <TextInput
                      style={styles.codeInput}
                      value={secretCode}
                      onChangeText={t => setSecretCode(t.toUpperCase())}
                      placeholder="XXXX-XXXX-000"
                      placeholderTextColor={c.textMuted}
                      autoCapitalize="characters"
                      autoFocus
                      autoCorrect={false}
                      accessibilityLabel="Einladungscode"
                    />
                  </View>
                  <Pressable
                    style={({ pressed }) => [styles.primaryBtn, (!secretCode.trim() || joiningSecret) && styles.btnDisabled, pressed && styles.pressed]}
                    onPress={() => joinByCode()}
                    disabled={!secretCode.trim() || joiningSecret}
                    accessibilityRole="button"
                  >
                    {joiningSecret ? <ActivityIndicator color={c.onAccent} /> : <Text style={styles.primaryBtnText}>Kurs freischalten</Text>}
                  </Pressable>
                </>
              )}

              {/* ── CREATE ── */}
              {modal === 'create' && !createdCode && (
                <>
                  <Pressable onPress={() => setModal('add')} style={({ pressed }) => [styles.backRow, pressed && styles.pressed]} accessibilityRole="button" accessibilityLabel="Zurück" hitSlop={HIT_SLOP}>
                    <Ionicons name="chevron-back" size={24} color={c.accent} />
                    <Text style={styles.backText}>Zurück</Text>
                  </Pressable>
                  <Text style={styles.sheetTitle} accessibilityRole="header">Eigenen Kurs erstellen</Text>

                  <TextInput
                    style={styles.nameInput}
                    value={newName}
                    onChangeText={setNewName}
                    placeholder="Kursname…"
                    placeholderTextColor={c.textMuted}
                    autoFocus
                    accessibilityLabel="Kursname"
                  />

                  <Text style={styles.sheetSection}>Symbol</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.emojiRow}>
                    {EMOJIS.map(e => (
                      <Pressable
                        key={e}
                        style={[styles.emojiBtn, newEmoji === e && styles.emojiBtnActive]}
                        onPress={() => setNewEmoji(e)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: newEmoji === e }}
                        accessibilityLabel={`Symbol ${e}`}
                      >
                        <Text style={{ fontSize: 22 }}>{e}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>

                  <Text style={styles.sheetSection}>Farbe</Text>
                  <View style={styles.colorRow}>
                    {COLORS.map((col, ci) => (
                      <Pressable
                        key={col}
                        style={styles.colorHit}
                        onPress={() => setNewColor(col)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: newColor === col }}
                        accessibilityLabel={`Kursfarbe ${ci + 1}`}
                      >
                        <View style={[styles.colorDot, { backgroundColor: col }, newColor === col && styles.colorDotActive]}>
                          {newColor === col && <Ionicons name="checkmark" size={18} color="white" />}
                        </View>
                      </Pressable>
                    ))}
                  </View>

                  <Pressable
                    style={({ pressed }) => [styles.primaryBtn, (!newName.trim() || creating) && styles.btnDisabled, pressed && styles.pressed]}
                    onPress={createCourse}
                    disabled={!newName.trim() || creating}
                    accessibilityRole="button"
                  >
                    {creating ? <ActivityIndicator color={c.onAccent} /> : <Text style={styles.primaryBtnText}>Kurs erstellen</Text>}
                  </Pressable>
                </>
              )}

              {/* ── CREATED — show code ── */}
              {modal === 'create' && createdCode && (
                <>
                  <Text style={styles.sheetTitle} accessibilityRole="header">Kurs erstellt</Text>
                  <Text style={styles.sheetSub}>Teile diesen Code, damit andere deinem Kurs beitreten können:</Text>
                  <View style={styles.generatedCodeBox}>
                    <Text style={styles.generatedCode} selectable>{createdCode}</Text>
                  </View>
                  <Pressable
                    style={({ pressed }) => [styles.shareBtn, pressed && styles.pressed]}
                    onPress={() => Share.share({ message: `Tritt meinem K-Learning Kurs bei!\nCode: ${createdCode}` })}
                    accessibilityRole="button"
                  >
                    <Ionicons name="share-outline" size={20} color={c.accent} />
                    <Text style={styles.shareBtnText}>Code teilen</Text>
                  </Pressable>
                  <Pressable style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]} onPress={closeModal} accessibilityRole="button">
                    <Text style={styles.primaryBtnText}>Fertig</Text>
                  </Pressable>
                </>
              )}

            </Pressable>
          </Pressable>
        )}
      </Modal>
    </View>
  );
}

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: c.bg },
    content: { paddingHorizontal: GUTTER, gap: S.lg },
    pressed: { opacity: 0.6 },
    iconBtn: { width: HIT, height: HIT, alignItems: 'center', justifyContent: 'center' },
    rowSeparator: { height: StyleSheet.hairlineWidth, backgroundColor: c.separator, marginLeft: S.lg },

    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: S.md },
    heading: { ...T.largeTitle, color: c.text, flexShrink: 1 },
    addBtn: {
      flexDirection: 'row', alignItems: 'center', gap: S.xs,
      backgroundColor: c.accentSoft, borderRadius: R.md,
      paddingHorizontal: S.md, minHeight: HIT,
    },
    addBtnText: { ...T.subhead, fontWeight: '600', color: c.accent },

    activeHint: {
      flexDirection: 'row', alignItems: 'center', gap: S.sm,
      backgroundColor: c.greenSoft, borderRadius: R.md,
      paddingLeft: S.md, minHeight: HIT,
    },
    activeHintText: { flex: 1, ...T.subhead, color: c.textSub },

    emptyCard: {
      backgroundColor: c.surface, borderRadius: R.md,
      padding: S.xxl, alignItems: 'center', gap: S.sm,
    },
    emptyTitle: { ...T.title3, color: c.text },
    emptyText: { ...T.subhead, color: c.textSub },
    emptyBtn: { marginTop: S.sm, alignSelf: 'stretch' },

    group: { backgroundColor: c.surface, borderRadius: R.md, overflow: 'hidden' },
    courseRow: {
      flexDirection: 'row', alignItems: 'center', gap: S.md,
      paddingHorizontal: S.lg, paddingVertical: S.md, minHeight: 64,
    },
    courseIconBox: { width: 44, height: 44, borderRadius: R.md, alignItems: 'center', justifyContent: 'center' },
    courseIcon: { fontSize: 22 },
    courseInfo: { flex: 1 },
    courseLabel: { ...T.body, color: c.text },
    courseMeta: { ...T.footnote, color: c.textSub, marginTop: S.xxs },
    secretRow: { flexDirection: 'row', alignItems: 'center', gap: S.xs, marginTop: S.xxs },
    activeCheck: { alignItems: 'center', gap: S.xxs },
    activeCheckText: { ...T.caption1, fontWeight: '600', color: c.green },

    tip: { ...T.footnote, color: c.textSub, textAlign: 'center', paddingHorizontal: S.xl },

    // QR fullscreen (Kamera-Overlay bleibt unabhängig vom Theme)
    qrContainer: { flex: 1, backgroundColor: 'black' },
    qrOverlay: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
    qrClose: {
      position: 'absolute', top: 56, right: S.lg,
      width: HIT, height: HIT, borderRadius: HIT / 2,
      backgroundColor: c.overlay, alignItems: 'center', justifyContent: 'center',
    },
    qrFrame: {
      width: 240, height: 240,
      borderWidth: 3, borderColor: 'white', borderRadius: R.lg,
      backgroundColor: 'transparent',
    },
    qrHint: { ...T.subhead, fontWeight: '600', color: 'white', marginTop: S.xl, textAlign: 'center', paddingHorizontal: S.xxxl },

    // Sheet
    overlay: { flex: 1, backgroundColor: c.overlay, justifyContent: 'flex-end' },
    sheet: {
      backgroundColor: c.surface, borderTopLeftRadius: R.xl, borderTopRightRadius: R.xl,
      padding: S.xl, paddingBottom: S.xxl + S.sm, gap: S.md, maxHeight: '88%',
    },
    sheetHandle: { width: 36, height: 4, backgroundColor: c.separator, borderRadius: 2, alignSelf: 'center', marginBottom: S.xs },
    sheetTitle: { ...T.title2, color: c.text },
    sheetSub: { ...T.subhead, color: c.textSub },
    sheetSection: { ...T.footnote, fontWeight: '600', color: c.textSub, textTransform: 'uppercase', letterSpacing: 0.4 },
    sheetGroup: { backgroundColor: c.bg, borderRadius: R.md, overflow: 'hidden' },

    // 3-option grid
    addOptionGrid: { flexDirection: 'row', gap: S.md },
    addOption: {
      flex: 1, backgroundColor: c.bg, borderRadius: R.md,
      padding: S.md, alignItems: 'center', gap: S.sm, minHeight: 100,
    },
    addOptionIcon: { width: 52, height: 52, borderRadius: R.md, alignItems: 'center', justifyContent: 'center' },
    addOptionLabel: { ...T.footnote, fontWeight: '600', color: c.text, textAlign: 'center' },

    availableRow: {
      flexDirection: 'row', alignItems: 'center', gap: S.md,
      paddingHorizontal: S.lg, paddingVertical: S.sm, minHeight: 56,
    },
    availableIcon: { width: 40, height: 40, borderRadius: R.md, alignItems: 'center', justifyContent: 'center' },
    availableLabel: { flex: 1, ...T.body, color: c.text },

    backRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', minHeight: HIT, marginLeft: -S.xs },
    backText: { ...T.body, color: c.accent },

    codeInputRow: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: c.bg, borderRadius: R.md,
      paddingHorizontal: S.lg, minHeight: 52,
    },
    codeInput: { flex: 1, ...T.title3, color: c.text, letterSpacing: 2 },

    nameInput: {
      ...T.body,
      backgroundColor: c.bg, borderRadius: R.md,
      color: c.text, paddingHorizontal: S.lg, minHeight: 52,
    },

    emojiRow: { gap: S.sm, paddingVertical: S.xs },
    emojiBtn: { width: HIT, height: HIT, alignItems: 'center', justifyContent: 'center', borderRadius: R.sm, borderWidth: 2, borderColor: 'transparent' },
    emojiBtnActive: { borderColor: c.accent, backgroundColor: c.accentSoft },

    colorRow: { flexDirection: 'row', flexWrap: 'wrap' },
    colorHit: { width: HIT, height: HIT, alignItems: 'center', justifyContent: 'center' },
    colorDot: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
    colorDotActive: { borderWidth: 2, borderColor: c.text },

    primaryBtn: { backgroundColor: c.accent, borderRadius: R.md, minHeight: 50, paddingHorizontal: S.xl, alignItems: 'center', justifyContent: 'center' },
    btnDisabled: { opacity: 0.4 },
    primaryBtnText: { ...T.headline, color: c.onAccent },

    generatedCodeBox: {
      backgroundColor: c.bg, borderRadius: R.md,
      borderWidth: 2, borderColor: c.accent,
      padding: S.xl, alignItems: 'center',
    },
    generatedCode: { ...T.title2, color: c.accent, letterSpacing: 3 },

    shareBtn: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: S.sm,
      backgroundColor: c.accentSoft, borderRadius: R.md, minHeight: 50,
    },
    shareBtnText: { ...T.headline, color: c.accent },
  });
}
