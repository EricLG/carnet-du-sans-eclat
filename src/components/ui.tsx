import type { ReactNode } from 'react';
import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../theme';
import { useProgress } from '../state/ProgressProvider';

const { colors, fonts } = theme;
export function Page({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return <ScrollView style={ui.screen} contentContainerStyle={ui.pageContent} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic">
    <View style={ui.page}>
      <Text accessibilityRole="header" style={ui.pageTitle}>{title}</Text>
      {subtitle && <Text style={ui.body}>{subtitle}</Text>}
      <SaveState />
      {children}
    </View>
  </ScrollView>;
}
export function SaveState() {
  const { loading, pending, error, service } = useProgress();
  if (error) return <View accessibilityRole="alert" style={ui.errorBox}>
    <Text style={ui.error}>{error}</Text>
    <Button title="Recharger les données" variant="quiet" onPress={() => void service.load()} disabled={pending > 0} />
  </View>;
  if (loading || pending) return <View style={ui.row}><ActivityIndicator color={colors.gold} size="small" /><Text style={ui.caption}>{loading ? 'Chargement…' : 'Sauvegarde en cours…'}</Text></View>;
  return <Text accessibilityLiveRegion="polite" style={ui.saveState}>Enregistré sur cet appareil</Text>;
}
export function Card({ children }: { children: ReactNode }) { return <View style={ui.card}>{children}</View>; }
export function Heading({ children }: { children: ReactNode }) { return <Text accessibilityRole="header" style={ui.heading}>{children}</Text>; }
export function Button({ title, onPress, disabled = false, variant = 'gold' }: {
  title: string; onPress: () => void; disabled?: boolean; variant?: 'gold' | 'quiet';
}) {
  return <Pressable accessibilityRole="button" accessibilityLabel={title} accessibilityState={{ disabled }} aria-disabled={disabled} disabled={disabled}
    onPress={onPress} style={({ pressed }) => [ui.button, variant === 'quiet' && ui.quietButton, (pressed || disabled) && ui.dim]}>
    <Text style={[ui.buttonText, variant === 'quiet' && ui.quietText]}>{title}</Text>
  </Pressable>;
}
export function Field({ label, value, onChangeText, placeholder, onSubmitEditing }: {
  label: string; value: string; onChangeText: (value: string) => void; placeholder?: string; onSubmitEditing?: () => void;
}) {
  return <View style={ui.field}><Text style={ui.label}>{label}</Text><TextInput accessibilityLabel={label}
    value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.muted}
    style={ui.input} maxLength={120} onSubmitEditing={onSubmitEditing} /></View>;
}
export function Choice({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="radio" accessibilityState={{ checked: selected }} aria-checked={selected} onPress={onPress}
    style={[ui.chip, selected && ui.chipSelected]}><Text style={[ui.chipText, selected && ui.chipTextSelected]}>{label}</Text></Pressable>;
}
export function CheckRow({ label, checked, onPress, detail }: { label: string; checked: boolean; onPress: () => void; detail?: string }) {
  return <Pressable accessibilityRole="checkbox" accessibilityLabel={label} accessibilityState={{ checked }} aria-checked={checked} onPress={onPress} style={ui.checkRow}>
    <View style={[ui.checkbox, checked && ui.checked]}><Text style={ui.tick}>{checked ? '✓' : ''}</Text></View>
    <View style={ui.grow}><Text style={ui.checkLabel}>{label}</Text>{detail && <Text style={ui.caption}>{detail}</Text>}</View>
  </Pressable>;
}
export function SourceLink({ url, label = 'Consulter la source' }: { url: string; label?: string }) {
  return <Button title={label} variant="quiet" onPress={() => void Linking.openURL(url)} />;
}
export const ui = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  pageContent: { flexGrow: 1, alignItems: 'center', padding: 20, paddingBottom: 36 },
  page: { width: '100%', maxWidth: 640, gap: 16 },
  pageTitle: { color: colors.text, fontFamily: fonts.heading, fontSize: 32, lineHeight: 40 },
  heading: { color: colors.text, fontFamily: fonts.heading, fontSize: 23, lineHeight: 30 },
  body: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  caption: { color: colors.muted, fontSize: 12, lineHeight: 19 },
  label: { color: colors.goldSoft, fontSize: 13, lineHeight: 20 },
  card: { padding: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, borderRadius: 12, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  grow: { flex: 1, gap: 4 },
  field: { gap: 8 },
  input: { minHeight: 48, padding: 12, color: colors.text, borderColor: colors.border, borderWidth: 1, borderRadius: 8, backgroundColor: colors.background, fontSize: 16 },
  button: { minHeight: 46, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: colors.background, fontSize: 14, fontWeight: '600', textAlign: 'center', lineHeight: 20 },
  quietButton: { backgroundColor: 'transparent', borderColor: colors.border, borderWidth: 1 },
  quietText: { color: colors.goldSoft },
  dim: { opacity: 0.5 },
  saveState: { color: colors.muted, fontSize: 11, lineHeight: 17 },
  errorBox: { borderColor: '#C9887C', borderWidth: 1, backgroundColor: '#2D1F1B', padding: 14, borderRadius: 8, gap: 10 },
  error: { color: '#F2BFB0', fontSize: 14, lineHeight: 22 },
  chip: { minHeight: 44, paddingVertical: 11, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 8, justifyContent: 'center' },
  chipSelected: { borderColor: colors.gold, backgroundColor: colors.surface },
  chipText: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  chipTextSelected: { color: colors.goldSoft },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, minHeight: 48, paddingVertical: 10 },
  checkbox: { width: 24, height: 24, borderRadius: 5, borderColor: colors.gold, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  checked: { backgroundColor: colors.gold },
  tick: { color: colors.background, fontSize: 17, fontWeight: 'bold' },
  checkLabel: { color: colors.text, fontSize: 15, lineHeight: 23 },
});
