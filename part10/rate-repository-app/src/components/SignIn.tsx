import { Formik } from 'formik';
import React from 'react';
import { Button, View } from 'react-native';
import * as yup from 'yup';
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
  type onSubmitProps = {
    username: string;
    password: string;
  };

  const onSubmit = (values: onSubmitProps) => {
    console.log(values);
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
