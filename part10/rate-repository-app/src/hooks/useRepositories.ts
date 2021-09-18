import { useGetRepositoriesQuery } from '../generated/graphql';

export const useRepositories = () => {
  const { data, loading } = useGetRepositoriesQuery({
    fetchPolicy: 'cache-and-network',
  });

  console.log(data);

  return { repositories: data?.repositories, loading };
};
