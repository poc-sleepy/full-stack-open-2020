import { Formik } from 'formik';
import React from 'react';
import { Button, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';
import { FormikTextInput } from './FormikTextInput';

const initialValues = {
  username: '',
  password: '',
};

type SignInForm = {
  onSubmit: any;
};

const SignInForm: React.FC<SignInForm> = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Button onPress={onSubmit} title="Sign In" />
    </View>
  );
};

export const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  type onSubmitProps = {
    username: string;
    password: string;
  };

  const onSubmit = async (values: onSubmitProps) => {
    await signIn({
      username: values.username,
      password: values.password,
    });
    history.push('/');
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  );
};
