import { useApolloClient } from '@apollo/client';
import { useSignInMutation } from '../generated/graphql';
import { useAuthStorage } from './useAuthStorage';

type signInProps = {
  username: string;
  password: string;
};

export const useSignIn = (): [typeof signIn, typeof result] => {
  const [mutate, result] = useSignInMutation();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }: signInProps) => {
    const { data } = await mutate({ variables: { username, password } });
    console.log(data);
    data &&
      data?.authorize &&
      (await authStorage.setAccessToken(data?.authorize?.accessToken));
    apolloClient.resetStore();
    return data;
  };

  return [signIn, result];
};
