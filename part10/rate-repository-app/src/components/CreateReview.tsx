import { Formik } from 'formik';
import React from 'react';
import { Button, View } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import { useMakeReviewMutation } from '../generated/graphql';
import { FormikTextInput } from './FormikTextInput';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '0',
  text: '',
};

type CreateReviewFormProps = {
  onSubmit: any;
};

const CreateReviewForm: React.FC<CreateReviewFormProps> = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        testID="repositoryNameField"
        name="repositoryName"
        placeholder="Repository Name"
      />
      <FormikTextInput
        testID="ownerNameField"
        name="ownerName"
        placeholder="Repository Owner Username"
      />
      <FormikTextInput testID="ratingField" name="rating" placeholder="0" />
      <FormikTextInput
        testID="reviewTextField"
        name="text"
        placeholder="Review"
        multiline={true}
        numberOfLines={5}
      />
      <Button testID="submitButton" onPress={onSubmit} title="Create Review" />
    </View>
  );
};

export const CreateReviewContainer: React.FC<CreateReviewFormProps> = ({
  onSubmit,
}) => {
  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository Owner Username is required'),
    repositoryName: yup.string().required('Repository Name is required'),
    rating: yup
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
  const history = useHistory();
  const [mutate] = useMakeReviewMutation();

  type onSubmitProps = {
    repositoryName: string;
    ownerName: string;
    rating: number;
    text: string;
  };

  const onSubmit = async (values: onSubmitProps) => {
    const { data } = await mutate({
      variables: { ...values, rating: Number(values.rating) },
    });
    console.log(data);
    if (data && data.createReview) {
      history.push(`/repositories/${data.createReview?.repositoryId}`);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};
