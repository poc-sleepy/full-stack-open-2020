import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: 'Address';
  street: Scalars['String'];
  city: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPerson?: Maybe<Person>;
  editNumber?: Maybe<Person>;
};

export type MutationAddPersonArgs = {
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  city: Scalars['String'];
};

export type MutationEditNumberArgs = {
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type Person = {
  __typename?: 'Person';
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  address: Address;
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  personCount: Scalars['Int'];
  allPersons: Array<Person>;
  findPerson?: Maybe<Person>;
};

export type QueryAllPersonsArgs = {
  phone?: Maybe<YesNo>;
};

export type QueryFindPersonArgs = {
  name: Scalars['String'];
};

export enum YesNo {
  Yes = 'YES',
  No = 'NO',
}

export type GetAllPersonsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllPersonsQuery = {
  __typename?: 'Query';
  allPersons: Array<{
    __typename?: 'Person';
    name: string;
    phone?: Maybe<string>;
    id: string;
  }>;
};

export type CreatePersonMutationVariables = Exact<{
  name: Scalars['String'];
  street: Scalars['String'];
  city: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
}>;

export type CreatePersonMutation = {
  __typename?: 'Mutation';
  addPerson?: Maybe<{
    __typename?: 'Person';
    name: string;
    phone?: Maybe<string>;
    id: string;
    address: { __typename?: 'Address'; street: string; city: string };
  }>;
};

export type FindPersonByNameQueryVariables = Exact<{
  nameToSearch: Scalars['String'];
}>;

export type FindPersonByNameQuery = {
  __typename?: 'Query';
  findPerson?: Maybe<{
    __typename?: 'Person';
    name: string;
    phone?: Maybe<string>;
    id: string;
    address: { __typename?: 'Address'; street: string; city: string };
  }>;
};

export const GetAllPersonsDocument = gql`
  query getAllPersons {
    allPersons {
      name
      phone
      id
    }
  }
`;

/**
 * __useGetAllPersonsQuery__
 *
 * To run a query within a React component, call `useGetAllPersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPersonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPersonsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllPersonsQuery,
    GetAllPersonsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllPersonsQuery, GetAllPersonsQueryVariables>(
    GetAllPersonsDocument,
    options
  );
}
export function useGetAllPersonsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllPersonsQuery,
    GetAllPersonsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllPersonsQuery, GetAllPersonsQueryVariables>(
    GetAllPersonsDocument,
    options
  );
}
export type GetAllPersonsQueryHookResult = ReturnType<
  typeof useGetAllPersonsQuery
>;
export type GetAllPersonsLazyQueryHookResult = ReturnType<
  typeof useGetAllPersonsLazyQuery
>;
export type GetAllPersonsQueryResult = Apollo.QueryResult<
  GetAllPersonsQuery,
  GetAllPersonsQueryVariables
>;
export const CreatePersonDocument = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;
export type CreatePersonMutationFn = Apollo.MutationFunction<
  CreatePersonMutation,
  CreatePersonMutationVariables
>;

/**
 * __useCreatePersonMutation__
 *
 * To run a mutation, you first call `useCreatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonMutation, { data, loading, error }] = useCreatePersonMutation({
 *   variables: {
 *      name: // value for 'name'
 *      street: // value for 'street'
 *      city: // value for 'city'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useCreatePersonMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePersonMutation,
    CreatePersonMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePersonMutation,
    CreatePersonMutationVariables
  >(CreatePersonDocument, options);
}
export type CreatePersonMutationHookResult = ReturnType<
  typeof useCreatePersonMutation
>;
export type CreatePersonMutationResult =
  Apollo.MutationResult<CreatePersonMutation>;
export type CreatePersonMutationOptions = Apollo.BaseMutationOptions<
  CreatePersonMutation,
  CreatePersonMutationVariables
>;
export const FindPersonByNameDocument = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

/**
 * __useFindPersonByNameQuery__
 *
 * To run a query within a React component, call `useFindPersonByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPersonByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPersonByNameQuery({
 *   variables: {
 *      nameToSearch: // value for 'nameToSearch'
 *   },
 * });
 */
export function useFindPersonByNameQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindPersonByNameQuery,
    FindPersonByNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindPersonByNameQuery, FindPersonByNameQueryVariables>(
    FindPersonByNameDocument,
    options
  );
}
export function useFindPersonByNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindPersonByNameQuery,
    FindPersonByNameQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindPersonByNameQuery,
    FindPersonByNameQueryVariables
  >(FindPersonByNameDocument, options);
}
export type FindPersonByNameQueryHookResult = ReturnType<
  typeof useFindPersonByNameQuery
>;
export type FindPersonByNameLazyQueryHookResult = ReturnType<
  typeof useFindPersonByNameLazyQuery
>;
export type FindPersonByNameQueryResult = Apollo.QueryResult<
  FindPersonByNameQuery,
  FindPersonByNameQueryVariables
>;
