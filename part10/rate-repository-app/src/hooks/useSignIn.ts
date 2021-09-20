import { useSignInMutation } from '../generated/graphql';

type signInProps = {
  username: string;
  password: string;
};

export const useSignIn = (): [typeof signIn, typeof result] => {
  const [mutate, result] = useSignInMutation();

  const signIn = async ({ username, password }: signInProps) => {
    return await mutate({ variables: { username, password } });
  };

  return [signIn, result];
};
