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

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID'];
  name: Scalars['String'];
  born?: Maybe<Scalars['Int']>;
};

export type AuthorWithBookCount = {
  __typename?: 'AuthorWithBookCount';
  id: Scalars['ID'];
  name: Scalars['String'];
  born?: Maybe<Scalars['Int']>;
  bookCount: Scalars['Int'];
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['ID'];
  title: Scalars['String'];
  published: Scalars['Int'];
  author: Scalars['String'];
  genres: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<Book>;
  editAuthor?: Maybe<Author>;
};

export type MutationAddBookArgs = {
  title: Scalars['String'];
  author: Scalars['String'];
  published: Scalars['Int'];
  genres: Array<Scalars['String']>;
};

export type MutationEditAuthorArgs = {
  name: Scalars['String'];
  setBornTo?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  bookCount: Scalars['Int'];
  authorCount: Scalars['Int'];
  allBooks: Array<Maybe<Book>>;
  allAuthors: Array<AuthorWithBookCount>;
};

export type QueryAllBooksArgs = {
  author?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
};

export type GetAllAuthorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllAuthorsQuery = {
  __typename?: 'Query';
  allAuthors: Array<{
    __typename?: 'AuthorWithBookCount';
    id: string;
    name: string;
    born?: Maybe<number>;
    bookCount: number;
  }>;
};

export const GetAllAuthorsDocument = gql`
  query getAllAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

/**
 * __useGetAllAuthorsQuery__
 *
 * To run a query within a React component, call `useGetAllAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAuthorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAuthorsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllAuthorsQuery,
    GetAllAuthorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllAuthorsQuery, GetAllAuthorsQueryVariables>(
    GetAllAuthorsDocument,
    options
  );
}
export function useGetAllAuthorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllAuthorsQuery,
    GetAllAuthorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllAuthorsQuery, GetAllAuthorsQueryVariables>(
    GetAllAuthorsDocument,
    options
  );
}
export type GetAllAuthorsQueryHookResult = ReturnType<
  typeof useGetAllAuthorsQuery
>;
export type GetAllAuthorsLazyQueryHookResult = ReturnType<
  typeof useGetAllAuthorsLazyQuery
>;
export type GetAllAuthorsQueryResult = Apollo.QueryResult<
  GetAllAuthorsQuery,
  GetAllAuthorsQueryVariables
>;
