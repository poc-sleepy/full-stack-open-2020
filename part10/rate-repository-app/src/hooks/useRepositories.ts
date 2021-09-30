import {
  AllRepositoriesOrderBy,
  OrderDirection,
  useGetRepositoriesQuery,
} from '../generated/graphql';

type useRepositoriesProps = {
  orderBy?: AllRepositoriesOrderBy;
  orderDirection?: OrderDirection;
};

export const useRepositories = (props: useRepositoriesProps = {}) => {
  const { data, loading } = useGetRepositoriesQuery({
    fetchPolicy: 'cache-and-network',
    variables: props,
  });

  console.log(data);

  return { repositories: data?.repositories, loading };
};
