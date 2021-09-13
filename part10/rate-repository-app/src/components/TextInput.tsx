import React, { ComponentProps } from 'react';
import { TextInput as NativeTextInput } from 'react-native';

type TextInputProps = ComponentProps<typeof NativeTextInput> & {
  style?: any;
  error?: any;
};

export const TextInput: React.FC<TextInputProps> = ({ style, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};
