import { Formik } from 'formik';
import React from 'react';
import { Button, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import { useSignUpMutation } from '../generated/graphql';
import { useSignIn } from '../hooks/useSignIn';
import { FormikTextInput } from './FormikTextInput';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

type SignUpFormProps = {
  onSubmit: any;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        testID="usernameField"
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        testID="passwordField"
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <FormikTextInput
        testID="passwordConfirmField"
        name="passwordConfirm"
        placeholder="Password Confirmation"
        secureTextEntry
      />
      <Button testID="submitButton" onPress={onSubmit} title="Sign Up" />
    </View>
  );
};

export const SignUpContainer: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(1).max(30),
    password: yup.string().required('Password is required').min(5).max(50),
    passwordConfirm: yup
      .string()
      .required('Password confirm is required')
      .oneOf([yup.ref('password'), null]),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  );
};

export const SignUp = () => {
  const [mutate] = useSignUpMutation();
  const [signIn] = useSignIn();
  const history = useHistory();

  type onSubmitProps = {
    username: string;
    password: string;
    passwordConfirm: string;
  };

  const onSubmit = async (values: onSubmitProps) => {
    const { data } = await mutate({
      variables: {
        username: values.username,
        password: values.password,
      },
    });

    if (data) {
      await signIn({
        username: values.username,
        password: values.password,
      });
      history.push('/');
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};
