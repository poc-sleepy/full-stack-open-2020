import { Formik } from 'formik';
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { FormikTextInput } from './FormikTextInput';

const initialValues = {
  username: '',
  password: '',
};

type SignInForm = {
  onSubmit: any;
};

const SignInForm: React.FC<SignInForm> = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: theme.backgroundColors.white,
    },
  });

  return (
    <View>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.input}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />
      <Button onPress={onSubmit} title="Sign In" />
    </View>
  );
};

export const SignIn = () => {
  type onSubmitProps = {
    username: string;
    password: string;
  };

  const onSubmit = (values: onSubmitProps) => {
    console.log(values);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  );
};
