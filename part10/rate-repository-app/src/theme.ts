import { Platform } from 'react-native';

const primary = '#0366d6';
const white = '#FFFFFF';
const red = '#D73A4A';

export const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary,
    inverse: white,
    error: red,
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400' as const,
    bold: '700' as const,
  },
  backgroundColors: {
    lightGray: '#e1e4e8',
    darkGray: '#24292e',
    white,
    primary,
  },
  borderColor: {
    error: red,
  },
};
