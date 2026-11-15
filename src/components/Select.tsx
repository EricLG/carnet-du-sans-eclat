import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Button, Heading, ui } from './ui';
import type { SelectProps } from './Select.types';

export function Select({ label, choices, selected, onChange }: SelectProps) {
  const [open, setOpen] = useState(false);
  return <View style={{ gap: 8 }}>
    <Text style={ui.label}>{label}</Text>
    <Pressable accessibilityRole="button" accessibilityLabel={`${label} : ${choices[selected]}`}
      accessibilityState={{ expanded: open }} onPress={() => setOpen(true)} style={[ui.input, ui.row]}>
      <Text style={[ui.body, { flex: 1, color: theme.colors.text }]}>{choices[selected]}</Text>
      <Text accessible={false} style={ui.label}>▾</Text>
    </Pressable>
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <SafeAreaView style={styles.overlay}>
        <Pressable accessibilityRole="button" accessibilityLabel="Fermer la liste des choix" style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
        <View accessibilityViewIsModal style={styles.dialog}>
          <Heading>{label}</Heading>
          <ScrollView keyboardShouldPersistTaps="handled">
            {Object.entries(choices).map(([value, text]) => <Pressable key={value} accessibilityRole="radio"
              accessibilityState={{ checked: value === selected }} onPress={() => { onChange(value); setOpen(false); }}
              style={[styles.option, value === selected && styles.selected]}>
              <Text style={[ui.body, value === selected && { color: theme.colors.goldSoft }]}>{text}</Text>
            </Pressable>)}
          </ScrollView>
          <Button title="Fermer" variant="quiet" onPress={() => setOpen(false)} />
        </View>
      </SafeAreaView>
    </Modal>
  </View>;
}
const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.65)' },
  dialog: { width: '100%', maxWidth: 640, maxHeight: '80%', padding: 16, gap: 12, borderRadius: 12, backgroundColor: theme.colors.surface },
  option: { minHeight: 48, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8 },
  selected: { backgroundColor: theme.colors.background },
});
