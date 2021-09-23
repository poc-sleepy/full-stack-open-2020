import React from 'react';
import {
  Text as NativeText,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';

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

interface TextProps {
  color?: 'textSecondary' | 'primary' | 'inverse';
  fontSize?: 'subheading';
  fontWeight?: 'bold';
  style?: StyleProp<TextStyle>;
  children: any;
  testID?: string;
}

export const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  ...props
}: TextProps) => {
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
