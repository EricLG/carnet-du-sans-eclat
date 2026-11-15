import { useId } from 'react';
import { View } from 'react-native';
import { theme } from '../theme';
import type { SelectProps } from './Select.types';

const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export function Select({ label, choices, selected, onChange }: SelectProps) {
  const id = useId();
  return <View style={{ gap: 8 }}>
    <label htmlFor={id} style={{ fontFamily, color: theme.colors.goldSoft, fontSize: 13, lineHeight: '20px' }}>{label}</label>
    <select id={id} aria-label={label} value={selected} onChange={event => onChange(event.target.value)}
      style={{ width: '100%', minWidth: 0, minHeight: 48, boxSizing: 'border-box', padding: '10px 12px',
        border: `1px solid ${theme.colors.border}`, borderRadius: 8, backgroundColor: theme.colors.background,
        color: theme.colors.text, colorScheme: 'dark', fontFamily, fontSize: 16, fontWeight: 400 }}>
      {Object.entries(choices).map(([value, text]) => <option key={value} value={value}>{text}</option>)}
    </select>
  </View>;
}
