import React from 'react';
import { useApolloClient } from '@apollo/client';
import { Redirect } from 'react-router-native';
import { useAuthStorage } from '../hooks/useAuthStorage';

export const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  authStorage.removeAccessToken();
  apolloClient.resetStore();

  return <Redirect to="/" />;
};
