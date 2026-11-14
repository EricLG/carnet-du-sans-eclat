import { Platform } from 'react-native';

export const theme = {
  colors: {
    background: '#101311',
    surface: '#191D18',
    border: '#343B2E',
    gold: '#C5AD75',
    goldSoft: '#E2D2AC',
    text: '#EFEDE4',
    muted: '#B4B8AB',
  },
  fonts: {
    heading: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, serif' }),
  },
} as const;
