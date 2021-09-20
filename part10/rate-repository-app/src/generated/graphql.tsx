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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export enum AllRepositoriesOrderBy {
  CreatedAt = 'CREATED_AT',
  RatingAverage = 'RATING_AVERAGE',
}

export type AuthorizationPayload = {
  __typename?: 'AuthorizationPayload';
  accessToken: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  user: User;
};

export type AuthorizeInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreateReviewInput = {
  ownerName: Scalars['String'];
  rating: Scalars['Int'];
  repositoryName: Scalars['String'];
  text?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Generates a new access token, if provided credentials (username and password) match any registered user. */
  authorize?: Maybe<AuthorizationPayload>;
  /** Creates a review for the given repository defined by repositoryName and ownerName. */
  createReview?: Maybe<Review>;
  /** Creates a new user, if the provided username does not already exist. */
  createUser?: Maybe<User>;
  /** Deletes the review which has the given id, if it is created by the authorized user. */
  deleteReview?: Maybe<Scalars['Boolean']>;
  root?: Maybe<Scalars['String']>;
};

export type MutationAuthorizeArgs = {
  credentials?: Maybe<AuthorizeInput>;
};

export type MutationCreateReviewArgs = {
  review?: Maybe<CreateReviewInput>;
};

export type MutationCreateUserArgs = {
  user?: Maybe<CreateUserInput>;
};

export type MutationDeleteReviewArgs = {
  id: Scalars['ID'];
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Returns the authorized user. */
  authorizedUser?: Maybe<User>;
  /** Returns paginated repositories. */
  repositories: RepositoryConnection;
  /** Returns repository by an id. */
  repository?: Maybe<Repository>;
  root?: Maybe<Scalars['String']>;
  /** Returns paginated users. */
  users: UserConnection;
};

export type QueryRepositoriesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AllRepositoriesOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  ownerName?: Maybe<Scalars['String']>;
  searchKeyword?: Maybe<Scalars['String']>;
};

export type QueryRepositoryArgs = {
  id: Scalars['ID'];
};

export type QueryUsersArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};

export type Repository = {
  __typename?: 'Repository';
  authorizedUserHasReviewed?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  forksCount?: Maybe<Scalars['Int']>;
  fullName: Scalars['String'];
  id: Scalars['ID'];
  language?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  openIssuesCount?: Maybe<Scalars['Int']>;
  ownerAvatarUrl?: Maybe<Scalars['String']>;
  ownerName: Scalars['String'];
  ratingAverage: Scalars['Int'];
  reviewCount: Scalars['Int'];
  reviews: ReviewConnection;
  stargazersCount?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  user: User;
  watchersCount?: Maybe<Scalars['Int']>;
};

export type RepositoryReviewsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};

export type RepositoryConnection = {
  __typename?: 'RepositoryConnection';
  edges: Array<RepositoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type RepositoryEdge = {
  __typename?: 'RepositoryEdge';
  cursor: Scalars['String'];
  node: Repository;
};

export type Review = {
  __typename?: 'Review';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  rating: Scalars['Int'];
  repository: Repository;
  repositoryId: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type ReviewConnection = {
  __typename?: 'ReviewConnection';
  edges: Array<ReviewEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ReviewEdge = {
  __typename?: 'ReviewEdge';
  cursor: Scalars['String'];
  node: Review;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  reviewCount: Scalars['Int'];
  reviews: ReviewConnection;
  username: Scalars['String'];
};

export type UserReviewsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type SignInMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  authorize?: Maybe<{
    __typename?: 'AuthorizationPayload';
    accessToken: string;
  }>;
};

export type GetRepositoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetRepositoriesQuery = {
  __typename?: 'Query';
  repositories: {
    __typename?: 'RepositoryConnection';
    totalCount: number;
    pageInfo: {
      __typename?: 'PageInfo';
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor?: Maybe<string>;
      endCursor?: Maybe<string>;
    };
    edges: Array<{
      __typename?: 'RepositoryEdge';
      node: {
        __typename?: 'Repository';
        id: string;
        name: string;
        ownerName: string;
        createdAt: any;
        fullName: string;
        reviewCount: number;
        ratingAverage: number;
        forksCount?: Maybe<number>;
        stargazersCount?: Maybe<number>;
        description?: Maybe<string>;
        language?: Maybe<string>;
        ownerAvatarUrl?: Maybe<string>;
      };
    }>;
  };
};

export const SignInDocument = gql`
  mutation SignIn($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const GetRepositoriesDocument = gql`
  query getRepositories {
    repositories {
      totalCount
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

/**
 * __useGetRepositoriesQuery__
 *
 * To run a query within a React component, call `useGetRepositoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepositoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepositoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRepositoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetRepositoriesQuery,
    GetRepositoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRepositoriesQuery, GetRepositoriesQueryVariables>(
    GetRepositoriesDocument,
    options
  );
}
export function useGetRepositoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRepositoriesQuery,
    GetRepositoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRepositoriesQuery,
    GetRepositoriesQueryVariables
  >(GetRepositoriesDocument, options);
}
export type GetRepositoriesQueryHookResult = ReturnType<
  typeof useGetRepositoriesQuery
>;
export type GetRepositoriesLazyQueryHookResult = ReturnType<
  typeof useGetRepositoriesLazyQuery
>;
export type GetRepositoriesQueryResult = Apollo.QueryResult<
  GetRepositoriesQuery,
  GetRepositoriesQueryVariables
>;
