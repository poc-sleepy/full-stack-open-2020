import React, { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import { TextInput } from './TextInput';
import { Text } from './Text';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
});

type FormikTextInputProps = ComponentProps<typeof TextInput> & {
  name: string;
};

export const FormikTextInput: React.FC<FormikTextInputProps> = ({
  name,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value: string) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};
