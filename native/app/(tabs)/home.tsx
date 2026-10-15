import { useState, useCallback, useRef, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  ActivityIndicator, Modal, TextInput, Pressable,
  RefreshControl, Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { supabase } from '../../lib/supabase';
import { useCourse } from '../../lib/courseContext';
import { useScrollContext } from './_layout';
import { useColors, DarkColors as d, T, S, R, GUTTER, HIT, HIT_SLOP, MAX_SCALE_CHROME } from '../../constants/theme';
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
// Kursfarben sind Nutzerdaten (werden mit dem Kurs gespeichert), keine UI-Tokens.
const COLORS  = ['#6366f1','#2563eb','#059669','#ea580c','#0d9488','#e11d48','#7c3aed','#ca8a04'];

export default function HomeScreen() {
  const c = useColors();
  const styles = useMemo(() => makeStyles(c), [c]);
  const insets = useSafeAreaInsets();
  const { onScroll } = useScrollContext();
  const lastY = useRef(0);
  const { activeCourse, setActiveCourse } = useCourse();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const [enrolled, setEnrolled]     = useState<Course[]>([]);
  const [available, setAvailable]   = useState<Course[]>([]);
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal]           = useState<ModalMode>('none');

  const [secretCode, setSecretCode]       = useState('');
  const [joiningSecret, setJoiningSecret] = useState(false);
  const [qrScanned, setQrScanned]         = useState(false);
  const [joining, setJoining]             = useState<string | null>(null);

  const [newName, setNewName]       = useState('');
  const [newEmoji, setNewEmoji]     = useState('📚');
  const [newColor, setNewColor]     = useState(COLORS[0]);
  const [creating, setCreating]     = useState(false);
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [error, setError]   = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    setJoining(courseKey); setError(null);
    try {
      const { data, error } = await supabase.rpc('enroll_in_course', { p_course_key: courseKey });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      await loadCourses(); closeModal();
    } catch (e: any) {
      setError(e?.message ?? 'Einschreibung fehlgeschlagen');
    } finally { setJoining(null); }
  }

  async function joinByCode(code?: string) {
    const entered = (code ?? secretCode).trim().toUpperCase();
    if (!entered) return;
    setJoiningSecret(true); setError(null);
    try {
      const { data, error } = await supabase.rpc('join_secret_course', { p_code: entered });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      await loadCourses(); closeModal();
      setSuccess(`Du hast "${data.course_label}" ${data.course_icon} freigeschaltet.`);
    } catch (e: any) {
      setError(e?.message ?? 'Code nicht gefunden');
      setQrScanned(false);
    } finally { setJoiningSecret(false); }
  }

  async function openQR() {
    setError(null);
    if (!cameraPermission?.granted) {
      const res = await requestCameraPermission();
      if (!res.granted) {
        setError('Erlaube K-Learning den Kamerazugriff in den Einstellungen, um QR-Codes zu scannen.');
        return;
      }
    }
    setQrScanned(false);
    setModal('qr');
  }

  function handleQRScan({ data }: { data: string }) {
    if (qrScanned) return;
    setQrScanned(true);
    const match = data.match(/[A-Z0-9]{4}-[A-Z0-9]{4}-\d{3}/i) ?? [data.trim()];
    joinByCode(match[0].toUpperCase());
  }

  async function createCourse() {
    if (!newName.trim()) return;
    setCreating(true); setError(null);
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
      setError(e?.message ?? 'Kurs konnte nicht erstellt werden');
    } finally { setCreating(false); }
  }

  function closeModal() {
    setModal('none'); setError(null); setSecretCode(''); setQrScanned(false);
    setNewName(''); setNewEmoji('📚'); setNewColor(COLORS[0]); setCreatedCode(null);
  }

  function openCourse(key: string) {
    router.push(`/course/${key}` as any);
  }

  function toggleActiveFilter(key: string) {
    setActiveCourse(activeCourse === key ? null : key);
  }

  const errorBox = error ? (
    <View style={styles.errorBox} accessibilityLiveRegion="polite">
      <Ionicons name="alert-circle" size={20} color={c.red} />
      <Text style={styles.errorText}>{error}</Text>
    </View>
  ) : null;

  if (loading) {
    return <View style={[styles.center, { backgroundColor: c.bg }]}><ActivityIndicator color={c.textSub} size="large" /></View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + S.sm, paddingBottom: 100 }]}
        scrollEventThrottle={16}
        onScroll={({ nativeEvent }) => {
          const dy = nativeEvent.contentOffset.y - lastY.current;
          lastY.current = nativeEvent.contentOffset.y;
          onScroll(dy);
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadCourses(true)} tintColor={c.textSub} />}
      >
        <View style={styles.header}>
          <Text style={styles.heading} accessibilityRole="header">Meine Kurse</Text>
          <Pressable
            style={({ pressed }) => [styles.addBtn, pressed && styles.pressed]}
            onPress={() => setModal('add')}
            accessibilityRole="button"
          >
            <Ionicons name="add" size={22} color={c.accent} />
            <Text style={styles.addBtnText} maxFontSizeMultiplier={MAX_SCALE_CHROME}>Hinzufügen</Text>
          </Pressable>
        </View>

        {success && (
          <View style={styles.successBox} accessibilityLiveRegion="polite">
            <Ionicons name="checkmark-circle" size={20} color={c.green} />
            <Text style={styles.successText}>{success}</Text>
            <Pressable onPress={() => setSuccess(null)} hitSlop={HIT_SLOP} style={styles.iconBtn}
              accessibilityRole="button" accessibilityLabel="Hinweis schliessen">
              <Ionicons name="close" size={20} color={c.textSub} />
            </Pressable>
          </View>
        )}

        {activeCourse && (
          <View style={styles.activeHint}>
            <Ionicons name="funnel" size={16} color={c.accent} />
            <Text style={styles.activeHintText}>
              Feed-Filter: <Text style={{ fontWeight: '600', color: c.text }}>{enrolled.find(x => x.key === activeCourse)?.label ?? activeCourse}</Text>
            </Text>
            <Pressable onPress={() => setActiveCourse(null)} hitSlop={HIT_SLOP} style={styles.iconBtn}
              accessibilityRole="button" accessibilityLabel="Feed-Filter entfernen">
              <Ionicons name="close-circle" size={22} color={c.textSub} />
            </Pressable>
          </View>
        )}

        {enrolled.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="library-outline" size={48} color={c.textSub} />
            <Text style={styles.emptyTitle}>Noch keine Kurse</Text>
            <Text style={styles.emptyText}>Füge deinen ersten Kurs hinzu</Text>
            <Pressable style={({ pressed }) => [styles.primaryBtn, styles.emptyBtn, pressed && styles.pressed]} onPress={() => setModal('add')} accessibilityRole="button">
              <Text style={styles.primaryBtnText}>Kurs hinzufügen</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.group}>
            {enrolled.map((course, i) => {
              const isActive = activeCourse === course.key;
              const daysLeft = course.exam_date
                ? Math.ceil((new Date(course.exam_date).getTime() - Date.now()) / 86_400_000)
                : null;
              return (
                <View key={course.key}>
                  {i > 0 && <View style={styles.separator} />}
                  <View style={styles.courseRow}>
                    <Pressable
                      style={({ pressed }) => [styles.courseMain, pressed && styles.pressedRow]}
                      onPress={() => openCourse(course.key)}
                      accessibilityRole="button"
                    >
                      <View style={styles.courseIconBox}>
                        <Text style={styles.courseIcon}>{course.icon}</Text>
                      </View>
                      <View style={styles.courseInfo}>
                        <View style={styles.courseTitleRow}>
                          <View style={[styles.courseDot, { backgroundColor: course.hex ?? c.accent }]} />
                          <Text style={styles.courseLabel} numberOfLines={2}>{course.label}</Text>
                        </View>
                        {course.exam_date && daysLeft !== null && (
                          <Text style={[styles.courseMeta, daysLeft <= 7 && { color: c.red }]}>
                            {daysLeft > 0 ? `Prüfung in ${daysLeft} Tagen` : daysLeft === 0 ? 'Prüfung heute' : 'Prüfung vorbei'}
                          </Text>
                        )}
                        {course.is_secret && (
                          <View style={styles.secretRow}>
                            <Ionicons name="lock-closed" size={12} color={c.textSub} />
                            <Text style={styles.courseMeta}>Privat</Text>
                          </View>
                        )}
                      </View>
                    </Pressable>
                    {/* Filter toggle */}
                    <Pressable
                      onPress={() => toggleActiveFilter(course.key)}
                      style={({ pressed }) => [styles.filterBtn, pressed && styles.pressed]}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isActive }}
                      accessibilityLabel={isActive ? `Feed-Filter ${course.label} entfernen` : `Feed auf ${course.label} filtern`}
                    >
                      <Ionicons
                        name={isActive ? 'funnel' : 'funnel-outline'}
                        size={22}
                        color={isActive ? c.accent : c.textSub}
                      />
                    </Pressable>
                    <Ionicons name="chevron-forward" size={18} color={c.textMuted} style={styles.chevron} />
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <Text style={styles.tip}>
          Tippe einen Kurs, um Lerninhalte zu öffnen. Mit dem Filter-Symbol zeigt der Feed nur diesen Kurs.
        </Text>
      </ScrollView>

      {/* ── MODAL ── */}
      <Modal visible={modal !== 'none'} animationType="slide" transparent onRequestClose={closeModal}>

        {modal === 'qr' && (
          <View style={styles.qrContainer}>
            <CameraView
              style={StyleSheet.absoluteFill}
              facing="back"
              onBarcodeScanned={handleQRScan}
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            />
            <View style={styles.qrOverlay}>
              <Pressable
                style={({ pressed }) => [styles.qrClose, { top: insets.top + S.sm }, pressed && styles.pressed]}
                onPress={closeModal}
                accessibilityRole="button"
                accessibilityLabel="Scanner schliessen"
              >
                <Ionicons name="close" size={24} color={d.text} />
              </Pressable>
              <View style={styles.qrFrame} />
              <Text style={styles.qrHint}>
                {joiningSecret ? 'Code wird geprüft…' : 'QR-Code auf den Rahmen ausrichten'}
              </Text>
              {joiningSecret && <ActivityIndicator color={d.text} style={{ marginTop: S.md }} />}
              {error && <Text style={styles.qrError}>{error}</Text>}
            </View>
          </View>
        )}

        {modal !== 'qr' && (
          <Pressable style={styles.overlay} onPress={closeModal} accessible={false}>
            <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + S.lg }]} onPress={() => {}} accessibilityViewIsModal>
              <View style={styles.sheetHandle} />

              {modal === 'add' && (
                <>
                  <Text style={styles.sheetTitle} accessibilityRole="header">Kurs hinzufügen</Text>
                  {errorBox}
                  <View style={styles.addOptionGrid}>
                    <Pressable style={({ pressed }) => [styles.addOption, pressed && styles.pressed]} onPress={openQR} accessibilityRole="button">
                      <Ionicons name="qr-code-outline" size={28} color={c.accent} />
                      <Text style={styles.addOptionLabel}>QR scannen</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [styles.addOption, pressed && styles.pressed]} onPress={() => { setError(null); setModal('code'); }} accessibilityRole="button">
                      <Ionicons name="key-outline" size={28} color={c.accent} />
                      <Text style={styles.addOptionLabel}>Code eingeben</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [styles.addOption, pressed && styles.pressed]} onPress={() => { setError(null); setModal('create'); }} accessibilityRole="button">
                      <Ionicons name="add-circle-outline" size={28} color={c.accent} />
                      <Text style={styles.addOptionLabel}>Eigener Kurs</Text>
                    </Pressable>
                  </View>

                  {available.length > 0 && (
                    <>
                      <Text style={styles.sheetSection}>Öffentliche Kurse beitreten</Text>
                      <ScrollView style={styles.availableList} bounces={false}>
                        {available.map((course, i) => (
                          <View key={course.key}>
                            {i > 0 && <View style={styles.separator} />}
                            <Pressable
                              style={({ pressed }) => [styles.availableRow, pressed && styles.pressedRow]}
                              onPress={() => enrollCourse(course.key)}
                              disabled={joining === course.key}
                              accessibilityRole="button"
                            >
                              <View style={styles.availableIcon}>
                                <Text style={{ fontSize: 20 }}>{course.icon}</Text>
                              </View>
                              <View style={[styles.courseDot, { backgroundColor: course.hex ?? c.accent }]} />
                              <Text style={styles.availableLabel}>{course.label}</Text>
                              {joining === course.key
                                ? <ActivityIndicator size="small" color={c.textSub} />
                                : <Ionicons name="add-circle-outline" size={24} color={c.accent} />
                              }
                            </Pressable>
                          </View>
                        ))}
                      </ScrollView>
                    </>
                  )}
                </>
              )}

              {modal === 'code' && (
                <>
                  <Pressable onPress={() => { setError(null); setModal('add'); }} style={styles.backRow} accessibilityRole="button" accessibilityLabel="Zurück">
                    <Ionicons name="chevron-back" size={22} color={c.accent} />
                    <Text style={styles.backText}>Zurück</Text>
                  </Pressable>
                  <Text style={styles.sheetTitle} accessibilityRole="header">Einladungscode eingeben</Text>
                  <Text style={styles.sheetSub}>Gib den Code ein, den du erhalten hast.</Text>
                  {errorBox}
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

              {modal === 'create' && !createdCode && (
                <>
                  <Pressable onPress={() => { setError(null); setModal('add'); }} style={styles.backRow} accessibilityRole="button" accessibilityLabel="Zurück">
                    <Ionicons name="chevron-back" size={22} color={c.accent} />
                    <Text style={styles.backText}>Zurück</Text>
                  </Pressable>
                  <Text style={styles.sheetTitle} accessibilityRole="header">Eigenen Kurs erstellen</Text>
                  {errorBox}
                  <TextInput
                    style={styles.nameInput}
                    value={newName}
                    onChangeText={setNewName}
                    placeholder="Kursname"
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
                      >
                        <Text style={{ fontSize: 24 }}>{e}</Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                  <Text style={styles.sheetSection}>Farbe</Text>
                  <View style={styles.colorRow}>
                    {COLORS.map((col, idx) => (
                      <Pressable
                        key={col}
                        style={styles.colorHit}
                        onPress={() => setNewColor(col)}
                        accessibilityRole="button"
                        accessibilityLabel={`Farbe ${idx + 1}`}
                        accessibilityState={{ selected: newColor === col }}
                      >
                        <View style={[styles.colorDot, { backgroundColor: col }, newColor === col && styles.colorDotActive]} />
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

              {modal === 'create' && createdCode && (
                <>
                  <Text style={styles.sheetTitle} accessibilityRole="header">Kurs erstellt</Text>
                  <Text style={styles.sheetSub}>Teile diesen Code, damit andere deinem Kurs beitreten können:</Text>
                  <View style={styles.generatedCodeBox}>
                    <Text style={styles.generatedCode} selectable>{createdCode}</Text>
                  </View>
                  <Pressable
                    style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
                    onPress={() => Share.share({ message: `Tritt meinem K-Learning Kurs bei!\nCode: ${createdCode}` })}
                    accessibilityRole="button"
                  >
                    <Ionicons name="share-outline" size={22} color={c.accent} />
                    <Text style={styles.secondaryBtnText}>Code teilen</Text>
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

const makeStyles = (c: ColorTokens) => StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: GUTTER, gap: S.lg },
  pressed: { opacity: 0.6 },
  pressedRow: { backgroundColor: c.surfaceHigh },
  btnDisabled: { opacity: 0.4 },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: c.separator, marginLeft: GUTTER },
  iconBtn: { minWidth: HIT, minHeight: HIT, alignItems: 'center', justifyContent: 'center', marginVertical: -S.sm },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: S.sm },
  heading: { ...T.largeTitle, color: c.text },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', gap: S.xs,
    minHeight: HIT, paddingHorizontal: S.sm,
  },
  addBtnText: { ...T.body, color: c.accent },

  activeHint: {
    flexDirection: 'row', alignItems: 'center', gap: S.sm,
    backgroundColor: c.accentSoft, borderRadius: R.md,
    paddingLeft: S.lg, paddingRight: S.xs, paddingVertical: S.sm,
  },
  activeHintText: { flex: 1, ...T.subhead, color: c.textSub },
  successBox: {
    flexDirection: 'row', alignItems: 'center', gap: S.sm,
    backgroundColor: c.greenSoft, borderRadius: R.md,
    paddingLeft: S.lg, paddingRight: S.xs, paddingVertical: S.sm,
  },
  successText: { flex: 1, ...T.subhead, color: c.text },
  errorBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: S.sm,
    backgroundColor: c.redSoft, borderRadius: R.md, padding: S.md,
  },
  errorText: { flex: 1, ...T.subhead, color: c.text },

  emptyCard: {
    backgroundColor: c.surface, borderRadius: R.md,
    padding: S.xxl, alignItems: 'center', gap: S.sm,
  },
  emptyTitle: { ...T.title3, color: c.text },
  emptyText: { ...T.subhead, color: c.textSub, textAlign: 'center' },
  emptyBtn: { marginTop: S.sm, alignSelf: 'stretch' },

  group: { backgroundColor: c.surface, borderRadius: R.md, overflow: 'hidden' },
  courseRow: { flexDirection: 'row', alignItems: 'center' },
  courseMain: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: S.md,
    minHeight: 64, paddingVertical: S.md, paddingLeft: GUTTER,
  },
  courseIconBox: {
    width: 40, height: 40, borderRadius: R.sm, backgroundColor: c.surfaceHigh,
    alignItems: 'center', justifyContent: 'center',
  },
  courseIcon: { fontSize: 22 },
  courseInfo: { flex: 1, gap: S.xxs },
  courseTitleRow: { flexDirection: 'row', alignItems: 'center', gap: S.sm },
  courseDot: { width: 8, height: 8, borderRadius: 4 },
  courseLabel: { ...T.body, color: c.text, flexShrink: 1 },
  courseMeta: { ...T.footnote, color: c.textSub },
  secretRow: { flexDirection: 'row', alignItems: 'center', gap: S.xs },
  filterBtn: { width: HIT, height: HIT, alignItems: 'center', justifyContent: 'center' },
  chevron: { marginRight: GUTTER, marginLeft: -S.xs },

  tip: { ...T.footnote, color: c.textSub, paddingHorizontal: GUTTER },

  qrContainer: { flex: 1, backgroundColor: 'black' },
  qrOverlay: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  qrClose: {
    position: 'absolute', right: GUTTER,
    width: HIT, height: HIT, borderRadius: HIT / 2,
    backgroundColor: d.overlay, alignItems: 'center', justifyContent: 'center',
  },
  qrFrame: { width: 240, height: 240, borderWidth: 3, borderColor: d.text, borderRadius: R.lg, backgroundColor: 'transparent' },
  qrHint: { ...T.subhead, fontWeight: '600', color: d.text, marginTop: S.xl, textAlign: 'center', paddingHorizontal: S.xxl },
  qrError: { ...T.subhead, color: d.red, marginTop: S.md, textAlign: 'center', paddingHorizontal: S.xxl },

  overlay: { flex: 1, backgroundColor: c.overlay, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: c.surface, borderTopLeftRadius: R.xl, borderTopRightRadius: R.xl,
    padding: GUTTER + S.xs, gap: S.md, maxHeight: '88%',
  },
  sheetHandle: { width: 36, height: 5, backgroundColor: c.separator, borderRadius: 3, alignSelf: 'center', marginBottom: S.xs },
  sheetTitle: { ...T.title2, color: c.text },
  sheetSub: { ...T.subhead, color: c.textSub, marginTop: -S.sm },
  sheetSection: { ...T.footnote, color: c.textSub, textTransform: 'uppercase' },

  addOptionGrid: { flexDirection: 'row', gap: S.sm },
  addOption: {
    flex: 1, minHeight: 88, backgroundColor: c.surfaceHigh, borderRadius: R.md,
    paddingVertical: S.md, paddingHorizontal: S.xs, alignItems: 'center', justifyContent: 'center', gap: S.sm,
  },
  addOptionLabel: { ...T.footnote, fontWeight: '600', color: c.text, textAlign: 'center' },

  availableList: { flexGrow: 0, backgroundColor: c.bg, borderRadius: R.md },
  availableRow: {
    flexDirection: 'row', alignItems: 'center', gap: S.md,
    minHeight: 56, paddingVertical: S.sm, paddingHorizontal: S.md,
  },
  availableIcon: { width: 40, height: 40, borderRadius: R.sm, backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center' },
  availableLabel: { ...T.body, color: c.text, flex: 1 },

  backRow: { flexDirection: 'row', alignItems: 'center', minHeight: HIT, alignSelf: 'flex-start', marginLeft: -S.xs },
  backText: { ...T.body, color: c.accent },

  codeInputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: c.surfaceHigh, borderRadius: R.md,
    paddingHorizontal: S.lg, minHeight: 50,
  },
  codeInput: { flex: 1, ...T.title3, color: c.text, letterSpacing: 2, paddingVertical: S.md },

  nameInput: {
    ...T.body,
    backgroundColor: c.surfaceHigh, borderRadius: R.md,
    color: c.text, paddingHorizontal: S.lg, minHeight: 50,
  },

  emojiRow: { gap: S.sm, paddingVertical: S.xs },
  emojiBtn: { width: HIT, height: HIT, alignItems: 'center', justifyContent: 'center', borderRadius: R.sm, borderWidth: 2, borderColor: 'transparent' },
  emojiBtnActive: { borderColor: c.accent, backgroundColor: c.accentSoft },

  colorRow: { flexDirection: 'row', flexWrap: 'wrap' },
  colorHit: { width: HIT, height: HIT, alignItems: 'center', justifyContent: 'center' },
  colorDot: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: 'transparent' },
  colorDotActive: { borderColor: c.text, transform: [{ scale: 1.15 }] },

  primaryBtn: {
    backgroundColor: c.accent, borderRadius: R.md, minHeight: 50,
    paddingHorizontal: S.xl, alignItems: 'center', justifyContent: 'center',
  },
  primaryBtnText: { ...T.headline, color: c.onAccent },
  secondaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: S.sm,
    backgroundColor: c.accentSoft, borderRadius: R.md, minHeight: 50,
  },
  secondaryBtnText: { ...T.headline, color: c.accent },

  generatedCodeBox: {
    backgroundColor: c.surfaceHigh, borderRadius: R.md,
    padding: S.xl, alignItems: 'center',
  },
  generatedCode: { ...T.title1, color: c.accent, letterSpacing: 3 },
});
