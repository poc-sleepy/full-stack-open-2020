import { Formik } from 'formik';
import React from 'react';
import { Button, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import { FormikTextInput } from './FormikTextInput';

const initialValues = {
  repositoryOwner: '',
  repositoryName: '',
  rate: '0',
  reviewText: '',
};

type CreateReviewFormProps = {
  onSubmit: any;
};

const CreateReviewForm: React.FC<CreateReviewFormProps> = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        testID="repositoryOwnerField"
        name="repositoryOwner"
        placeholder="Repository Owner Username"
      />
      <FormikTextInput
        testID="repositoryNameField"
        name="repositoryName"
        placeholder="Repository Name"
      />
      <FormikTextInput testID="rateField" name="rate" placeholder="0" />
      <FormikTextInput
        testID="reviewTextField"
        name="reviewText"
        placeholder="Review"
        multiline={true}
        numberOfLines={5}
      />
      <Button testID="submitButton" onPress={onSubmit} title="Sign In" />
    </View>
  );
};

export const CreateReviewContainer: React.FC<CreateReviewFormProps> = ({
  onSubmit,
}) => {
  const validationSchema = yup.object().shape({
    repositoryOwner: yup
      .string()
      .required('Repository Owner Username is required'),
    repositoryName: yup.string().required('Repository Name is required'),
    rate: yup
      .number()
      .required('Rate is required')
      .integer('Rate is expected to be integer')
      .min(0, 'Rate must be greater than 0 or 0')
      .max(100, 'Rate must be less than 100 or 100'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export const CreateReview = () => {
  // const [signIn] = useSignIn();
  const history = useHistory();

  type onSubmitProps = {
    repositoryOwner: string;
    repositoryName: string;
    rate: string;
    reviewText: string;
  };

  const onSubmit = (values: onSubmitProps) => {
    console.log(values);
    history.push('/');
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};
