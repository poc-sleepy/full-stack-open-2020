import React, { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';

import { TextInput } from './TextInput';
import { Text } from './Text';
import { theme } from '../theme';

type FormikTextInputProps = ComponentProps<typeof TextInput> & {
  name: string;
};

export const FormikTextInput: React.FC<FormikTextInputProps> = ({
  name,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const styles = StyleSheet.create({
    view: {
      margin: 12,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: showError ? theme.borderColor.error : undefined,
      padding: 10,
      backgroundColor: theme.backgroundColors.white,
    },
    errorText: {
      marginTop: 5,
      color: theme.colors.error,
    },
  });

  return (
    <View style={styles.view}>
      <TextInput
        onChangeText={(value: string) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.input}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};
