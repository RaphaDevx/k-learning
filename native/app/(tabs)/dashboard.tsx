import { useState, useCallback, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  ActivityIndicator, Modal, TextInput, Pressable,
  Alert, RefreshControl, Share, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { supabase } from '../../lib/supabase';
import { useCourse } from '../../lib/courseContext';
import { useScrollContext } from './_layout';
import { C, R, F } from '../../constants/theme';

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
      Alert.alert('Freigeschaltet! 🎉', `Du hast "${data.course_label}" ${data.course_icon} freigeschaltet.`);
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
    return <View style={[styles.center, { backgroundColor: C.bg }]}><ActivityIndicator color={C.accentLight} size="large" /></View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: 100 }]}
        scrollEventThrottle={16}
        onScroll={({ nativeEvent }) => {
          const dy = nativeEvent.contentOffset.y - lastY.current;
          lastY.current = nativeEvent.contentOffset.y;
          onScroll(dy);
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadCourses(true)} tintColor={C.accentLight} />}
      >
        <View style={styles.header}>
          <Text style={styles.heading}>Meine Kurse</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setModal('add')} activeOpacity={0.7}>
            <Ionicons name="add" size={20} color={C.text} />
            <Text style={styles.addBtnText}>Hinzufügen</Text>
          </TouchableOpacity>
        </View>

        {activeCourse && (
          <View style={styles.activeHint}>
            <Ionicons name="radio-button-on" size={13} color={C.green} />
            <Text style={styles.activeHintText}>
              Aktiv: <Text style={{ fontWeight: '800' }}>{enrolled.find(c => c.key === activeCourse)?.label ?? activeCourse}</Text>
            </Text>
            <TouchableOpacity onPress={() => setActiveCourse(null)}>
              <Ionicons name="close-circle" size={16} color={C.textMuted} />
            </TouchableOpacity>
          </View>
        )}

        {enrolled.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>📚</Text>
            <Text style={styles.emptyTitle}>Noch keine Kurse</Text>
            <Text style={styles.emptyText}>Füge deinen ersten Kurs hinzu</Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={() => setModal('add')}>
              <Text style={styles.emptyBtnText}>Kurs hinzufügen</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.courseList}>
            {enrolled.map(course => {
              const isActive = activeCourse === course.key;
              return (
                <TouchableOpacity
                  key={course.key}
                  style={[styles.courseCard, isActive && styles.courseCardActive]}
                  onPress={() => toggleActive(course.key)}
                  activeOpacity={0.75}
                >
                  <View style={[styles.courseIconBox, { backgroundColor: (course.hex ?? C.accent) + '22' }]}>
                    <Text style={styles.courseIcon}>{course.icon}</Text>
                  </View>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseLabel}>{course.label}</Text>
                    {course.exam_date && (
                      <Text style={styles.courseMeta}>
                        Prüfung {new Date(course.exam_date).toLocaleDateString('de-CH', { day: '2-digit', month: 'short' })}
                      </Text>
                    )}
                    {course.is_secret && <Text style={styles.secretTag}>🔒 Privat</Text>}
                  </View>
                  {isActive
                    ? <View style={styles.activeCheck}><Ionicons name="checkmark-circle" size={22} color={C.green} /><Text style={styles.activeCheckText}>Aktiv</Text></View>
                    : <Ionicons name="radio-button-off" size={20} color={C.textMuted} />
                  }
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <Text style={styles.tip}>
          {activeCourse ? 'Tippe erneut um Filter aufzuheben' : 'Tippe auf einen Kurs um Feed & Karten zu filtern'}
        </Text>
      </ScrollView>

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
              <TouchableOpacity style={styles.qrClose} onPress={closeModal}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.qrFrame} />
              <Text style={styles.qrHint}>
                {joiningSecret ? 'Code wird geprüft…' : 'QR-Code auf den Rahmen ausrichten'}
              </Text>
              {joiningSecret && <ActivityIndicator color="#fff" style={{ marginTop: 12 }} />}
            </View>
          </View>
        )}

        {/* ── SHEET MODES ── */}
        {modal !== 'qr' && (
          <Pressable style={styles.overlay} onPress={closeModal}>
            <Pressable style={styles.sheet} onPress={() => {}}>
              <View style={styles.sheetHandle} />

              {/* ── ADD ── */}
              {modal === 'add' && (
                <>
                  <Text style={styles.sheetTitle}>Kurs hinzufügen</Text>

                  <View style={styles.addOptionGrid}>
                    <TouchableOpacity style={styles.addOption} onPress={openQR} activeOpacity={0.75}>
                      <View style={[styles.addOptionIcon, { backgroundColor: C.accent + '20' }]}>
                        <Ionicons name="qr-code-outline" size={26} color={C.accentLight} />
                      </View>
                      <Text style={styles.addOptionLabel}>QR scannen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addOption} onPress={() => setModal('code')} activeOpacity={0.75}>
                      <View style={[styles.addOptionIcon, { backgroundColor: C.blue + '20' }]}>
                        <Ionicons name="key-outline" size={26} color={C.blue} />
                      </View>
                      <Text style={styles.addOptionLabel}>Code eingeben</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addOption} onPress={() => setModal('create')} activeOpacity={0.75}>
                      <View style={[styles.addOptionIcon, { backgroundColor: C.green + '20' }]}>
                        <Ionicons name="add-circle-outline" size={26} color={C.green} />
                      </View>
                      <Text style={styles.addOptionLabel}>Eigener Kurs</Text>
                    </TouchableOpacity>
                  </View>

                  {available.length > 0 && (
                    <>
                      <Text style={styles.sheetSection}>Öffentliche Kurse beitreten</Text>
                      {available.map(course => (
                        <TouchableOpacity
                          key={course.key}
                          style={styles.availableRow}
                          onPress={() => enrollCourse(course.key)}
                          disabled={joining === course.key}
                          activeOpacity={0.7}
                        >
                          <View style={[styles.availableIcon, { backgroundColor: (course.hex ?? C.accent) + '20' }]}>
                            <Text style={{ fontSize: 18 }}>{course.icon}</Text>
                          </View>
                          <Text style={styles.availableLabel}>{course.label}</Text>
                          {joining === course.key
                            ? <ActivityIndicator size="small" color={C.accentLight} />
                            : <Ionicons name="add-circle-outline" size={22} color={C.accentLight} />
                          }
                        </TouchableOpacity>
                      ))}
                    </>
                  )}
                </>
              )}

              {/* ── CODE ── */}
              {modal === 'code' && (
                <>
                  <TouchableOpacity onPress={() => setModal('add')} style={styles.backRow}>
                    <Ionicons name="arrow-back" size={18} color={C.textSub} />
                    <Text style={styles.backText}>Zurück</Text>
                  </TouchableOpacity>
                  <Text style={styles.sheetTitle}>Einladungscode eingeben</Text>
                  <Text style={styles.sheetSub}>Gib den Code ein, den du erhalten hast.</Text>
                  <View style={styles.codeInputRow}>
                    <Ionicons name="lock-closed-outline" size={18} color={C.textMuted} style={{ marginRight: 10 }} />
                    <TextInput
                      style={styles.codeInput}
                      value={secretCode}
                      onChangeText={t => setSecretCode(t.toUpperCase())}
                      placeholder="XXXX-XXXX-000"
                      placeholderTextColor={C.textMuted}
                      autoCapitalize="characters"
                      autoFocus
                      autoCorrect={false}
                    />
                  </View>
                  <TouchableOpacity
                    style={[styles.joinBtn, (!secretCode.trim() || joiningSecret) && styles.btnDisabled]}
                    onPress={() => joinByCode()}
                    disabled={!secretCode.trim() || joiningSecret}
                    activeOpacity={0.8}
                  >
                    {joiningSecret ? <ActivityIndicator color="#fff" /> : <Text style={styles.joinBtnText}>Kurs freischalten</Text>}
                  </TouchableOpacity>
                </>
              )}

              {/* ── CREATE ── */}
              {modal === 'create' && !createdCode && (
                <>
                  <TouchableOpacity onPress={() => setModal('add')} style={styles.backRow}>
                    <Ionicons name="arrow-back" size={18} color={C.textSub} />
                    <Text style={styles.backText}>Zurück</Text>
                  </TouchableOpacity>
                  <Text style={styles.sheetTitle}>Eigenen Kurs erstellen</Text>

                  <TextInput
                    style={styles.nameInput}
                    value={newName}
                    onChangeText={setNewName}
                    placeholder="Kursname…"
                    placeholderTextColor={C.textMuted}
                    autoFocus
                  />

                  <Text style={styles.sheetSection}>Emoji</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.emojiRow}>
                    {EMOJIS.map(e => (
                      <TouchableOpacity
                        key={e}
                        style={[styles.emojiBtn, newEmoji === e && styles.emojiBtnActive]}
                        onPress={() => setNewEmoji(e)}
                      >
                        <Text style={{ fontSize: 22 }}>{e}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  <Text style={styles.sheetSection}>Farbe</Text>
                  <View style={styles.colorRow}>
                    {COLORS.map(col => (
                      <TouchableOpacity
                        key={col}
                        style={[styles.colorDot, { backgroundColor: col }, newColor === col && styles.colorDotActive]}
                        onPress={() => setNewColor(col)}
                      />
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[styles.joinBtn, (!newName.trim() || creating) && styles.btnDisabled]}
                    onPress={createCourse}
                    disabled={!newName.trim() || creating}
                    activeOpacity={0.8}
                  >
                    {creating ? <ActivityIndicator color="#fff" /> : <Text style={styles.joinBtnText}>Kurs erstellen</Text>}
                  </TouchableOpacity>
                </>
              )}

              {/* ── CREATED — show code ── */}
              {modal === 'create' && createdCode && (
                <>
                  <Text style={styles.sheetTitle}>Kurs erstellt 🎉</Text>
                  <Text style={styles.sheetSub}>Teile diesen Code damit andere deinen Kurs beitreten können:</Text>
                  <View style={styles.generatedCodeBox}>
                    <Text style={styles.generatedCode}>{createdCode}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.shareBtn}
                    onPress={() => Share.share({ message: `Tritt meinem K-Learning Kurs bei!\nCode: ${createdCode}` })}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="share-outline" size={18} color={C.text} />
                    <Text style={styles.shareBtnText}>Code teilen</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.joinBtn, { marginTop: 0 }]} onPress={closeModal} activeOpacity={0.8}>
                    <Text style={styles.joinBtnText}>Fertig</Text>
                  </TouchableOpacity>
                </>
              )}

            </Pressable>
          </Pressable>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: 20, gap: 16 },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heading: { color: C.text, fontSize: 26, fontWeight: '800' },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: C.surfaceHigh, borderRadius: R.lg,
    paddingHorizontal: 12, paddingVertical: 8,
    borderWidth: 1, borderColor: C.border,
  },
  addBtnText: { color: C.text, fontSize: F.sm, fontWeight: '700' },

  activeHint: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: C.green + '14', borderRadius: R.lg,
    paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: C.green + '30',
  },
  activeHintText: { flex: 1, color: C.textSub, fontSize: F.sm },

  emptyCard: {
    backgroundColor: C.surface, borderRadius: R.xl,
    borderWidth: 1, borderColor: C.border,
    padding: 32, alignItems: 'center', gap: 8,
  },
  emptyEmoji: { fontSize: 40, marginBottom: 4 },
  emptyTitle: { color: C.text, fontSize: F.lg, fontWeight: '700' },
  emptyText: { color: C.textSub, fontSize: F.sm },
  emptyBtn: { marginTop: 8, backgroundColor: C.accent, borderRadius: R.lg, paddingHorizontal: 20, paddingVertical: 12 },
  emptyBtnText: { color: C.text, fontSize: F.base, fontWeight: '700' },

  courseList: { gap: 10 },
  courseCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: C.surface, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.border, padding: 16,
  },
  courseCardActive: { borderColor: C.green + '60', backgroundColor: C.green + '08' },
  courseIconBox: { width: 48, height: 48, borderRadius: R.md, alignItems: 'center', justifyContent: 'center' },
  courseIcon: { fontSize: 24 },
  courseInfo: { flex: 1 },
  courseLabel: { color: C.text, fontSize: F.base, fontWeight: '700' },
  courseMeta: { color: C.textMuted, fontSize: F.xs, marginTop: 3 },
  secretTag: { color: C.textMuted, fontSize: F.xs, marginTop: 3 },
  activeCheck: { alignItems: 'center', gap: 2 },
  activeCheckText: { color: C.green, fontSize: F.xs, fontWeight: '700' },

  tip: { color: C.textMuted, fontSize: F.xs, textAlign: 'center', paddingHorizontal: 20, lineHeight: 18 },

  // QR fullscreen
  qrContainer: { flex: 1, backgroundColor: '#000' },
  qrOverlay: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  qrClose: {
    position: 'absolute', top: 56, right: 20,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center',
  },
  qrFrame: {
    width: 240, height: 240,
    borderWidth: 3, borderColor: '#fff', borderRadius: 16,
    backgroundColor: 'transparent',
  },
  qrHint: { color: '#fff', fontSize: 14, fontWeight: '600', marginTop: 24, textAlign: 'center', paddingHorizontal: 40 },

  // Sheet
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: C.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, paddingBottom: 40, gap: 14, maxHeight: '88%',
  },
  sheetHandle: { width: 36, height: 4, backgroundColor: C.border, borderRadius: 2, alignSelf: 'center', marginBottom: 4 },
  sheetTitle: { color: C.text, fontSize: F.xl, fontWeight: '800' },
  sheetSub: { color: C.textSub, fontSize: F.sm, lineHeight: 20, marginTop: -6 },
  sheetSection: { color: C.textMuted, fontSize: F.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },

  // 3-option grid
  addOptionGrid: { flexDirection: 'row', gap: 10 },
  addOption: {
    flex: 1, backgroundColor: C.surfaceHigh, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.border,
    padding: 16, alignItems: 'center', gap: 10,
  },
  addOptionIcon: { width: 52, height: 52, borderRadius: R.md, alignItems: 'center', justifyContent: 'center' },
  addOptionLabel: { color: C.text, fontSize: F.xs, fontWeight: '700', textAlign: 'center' },

  availableRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.border,
  },
  availableIcon: { width: 42, height: 42, borderRadius: R.md, alignItems: 'center', justifyContent: 'center' },
  availableLabel: { flex: 1, color: C.text, fontSize: F.base, fontWeight: '600' },

  backRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: C.textSub, fontSize: F.sm },

  codeInputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.surfaceHigh, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.border,
    paddingHorizontal: 14, paddingVertical: 14,
  },
  codeInput: { flex: 1, color: C.text, fontSize: F.lg, fontWeight: '700', letterSpacing: 2 },

  nameInput: {
    backgroundColor: C.surfaceHigh, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.border,
    color: C.text, fontSize: F.base, paddingHorizontal: 14, paddingVertical: 14,
  },

  emojiRow: { gap: 8, paddingVertical: 4 },
  emojiBtn: { padding: 8, borderRadius: R.sm, borderWidth: 2, borderColor: 'transparent' },
  emojiBtnActive: { borderColor: C.accentLight, backgroundColor: C.accent + '20' },

  colorRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  colorDot: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: 'transparent' },
  colorDotActive: { borderColor: C.text, transform: [{ scale: 1.2 }] },

  joinBtn: { backgroundColor: C.accent, borderRadius: R.lg, paddingVertical: 16, alignItems: 'center' },
  btnDisabled: { opacity: 0.4 },
  joinBtnText: { color: C.text, fontSize: F.base, fontWeight: '700' },

  generatedCodeBox: {
    backgroundColor: C.surfaceHigh, borderRadius: R.lg,
    borderWidth: 2, borderColor: C.accentLight + '60',
    padding: 20, alignItems: 'center',
  },
  generatedCode: { color: C.accentLight, fontSize: 24, fontWeight: '800', letterSpacing: 3 },

  shareBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: C.surfaceHigh, borderRadius: R.lg,
    borderWidth: 1, borderColor: C.border,
    paddingVertical: 14,
  },
  shareBtnText: { color: C.text, fontSize: F.base, fontWeight: '700' },
});
