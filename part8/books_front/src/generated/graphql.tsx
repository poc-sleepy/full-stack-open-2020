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
  allBooks: Array<Book>;
  allAuthors: Array<AuthorWithBookCount>;
};

export type QueryAllBooksArgs = {
  author?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
};

export type CreateBookMutationVariables = Exact<{
  title: Scalars['String'];
  author: Scalars['String'];
  published: Scalars['Int'];
  genres: Array<Scalars['String']> | Scalars['String'];
}>;

export type CreateBookMutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<{
    __typename?: 'Book';
    id: string;
    title: string;
    published: number;
    author: string;
  }>;
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

export type GetAllBooksQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllBooksQuery = {
  __typename?: 'Query';
  allBooks: Array<{
    __typename?: 'Book';
    id: string;
    title: string;
    published: number;
    author: string;
  }>;
};

export type UpdateAuthorMutationVariables = Exact<{
  name: Scalars['String'];
  setBornTo: Scalars['Int'];
}>;

export type UpdateAuthorMutation = {
  __typename?: 'Mutation';
  editAuthor?: Maybe<{
    __typename?: 'Author';
    id: string;
    name: string;
    born?: Maybe<number>;
  }>;
};

export const CreateBookDocument = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
      title
      published
      author
    }
  }
`;
export type CreateBookMutationFn = Apollo.MutationFunction<
  CreateBookMutation,
  CreateBookMutationVariables
>;

/**
 * __useCreateBookMutation__
 *
 * To run a mutation, you first call `useCreateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookMutation, { data, loading, error }] = useCreateBookMutation({
 *   variables: {
 *      title: // value for 'title'
 *      author: // value for 'author'
 *      published: // value for 'published'
 *      genres: // value for 'genres'
 *   },
 * });
 */
export function useCreateBookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBookMutation,
    CreateBookMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(
    CreateBookDocument,
    options
  );
}
export type CreateBookMutationHookResult = ReturnType<
  typeof useCreateBookMutation
>;
export type CreateBookMutationResult =
  Apollo.MutationResult<CreateBookMutation>;
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<
  CreateBookMutation,
  CreateBookMutationVariables
>;
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
export const GetAllBooksDocument = gql`
  query getAllBooks {
    allBooks {
      id
      title
      published
      author
    }
  }
`;

/**
 * __useGetAllBooksQuery__
 *
 * To run a query within a React component, call `useGetAllBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllBooksQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllBooksQuery,
    GetAllBooksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllBooksQuery, GetAllBooksQueryVariables>(
    GetAllBooksDocument,
    options
  );
}
export function useGetAllBooksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllBooksQuery,
    GetAllBooksQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllBooksQuery, GetAllBooksQueryVariables>(
    GetAllBooksDocument,
    options
  );
}
export type GetAllBooksQueryHookResult = ReturnType<typeof useGetAllBooksQuery>;
export type GetAllBooksLazyQueryHookResult = ReturnType<
  typeof useGetAllBooksLazyQuery
>;
export type GetAllBooksQueryResult = Apollo.QueryResult<
  GetAllBooksQuery,
  GetAllBooksQueryVariables
>;
export const UpdateAuthorDocument = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
    }
  }
`;
export type UpdateAuthorMutationFn = Apollo.MutationFunction<
  UpdateAuthorMutation,
  UpdateAuthorMutationVariables
>;

/**
 * __useUpdateAuthorMutation__
 *
 * To run a mutation, you first call `useUpdateAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAuthorMutation, { data, loading, error }] = useUpdateAuthorMutation({
 *   variables: {
 *      name: // value for 'name'
 *      setBornTo: // value for 'setBornTo'
 *   },
 * });
 */
export function useUpdateAuthorMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAuthorMutation,
    UpdateAuthorMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAuthorMutation,
    UpdateAuthorMutationVariables
  >(UpdateAuthorDocument, options);
}
export type UpdateAuthorMutationHookResult = ReturnType<
  typeof useUpdateAuthorMutation
>;
export type UpdateAuthorMutationResult =
  Apollo.MutationResult<UpdateAuthorMutation>;
export type UpdateAuthorMutationOptions = Apollo.BaseMutationOptions<
  UpdateAuthorMutation,
  UpdateAuthorMutationVariables
>;
