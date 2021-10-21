import {
  GetRepositoriesQueryVariables,
  useGetRepositoriesQuery,
} from '../generated/graphql';

export const useRepositories = (props: GetRepositoriesQueryVariables = {}) => {
  const { data, loading } = useGetRepositoriesQuery({
    fetchPolicy: 'cache-and-network',
    variables: props,
  });

  console.log(data);

  return { repositories: data?.repositories, loading };
};
