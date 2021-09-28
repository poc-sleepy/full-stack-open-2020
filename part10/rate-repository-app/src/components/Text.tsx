import React, { ComponentProps } from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import { theme } from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorInverse: {
    color: theme.colors.inverse,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

interface TextProps extends ComponentProps<typeof NativeText> {
  color?: 'textSecondary' | 'primary' | 'inverse';
  fontSize?: 'subheading';
  fontWeight?: 'bold';
}

export const Text: React.FC<TextProps> = ({
  color,
  fontSize,
  fontWeight,
  style,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'inverse' && styles.colorInverse,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};
