import { useGetRepositoryQuery } from '../generated/graphql';

export const useRepository = (id: string) => {
  const { data, loading } = useGetRepositoryQuery({
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  });

  return { repository: data?.repository, loading };
};
