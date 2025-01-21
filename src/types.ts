import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Asset = {
  __typename?: 'Asset';
  bucketName: Scalars['String']['output'];
  category: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  file: Scalars['Upload']['output'];
  fileKey: Scalars['String']['output'];
  fileSize: Scalars['Int']['output'];
  fileType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  publicAccess: Scalars['Boolean']['output'];
  tags: Array<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  uploadDate: Scalars['String']['output'];
};

export type AssetsStorageMutation = {
  __typename?: 'AssetsStorageMutation';
  createAsset: Scalars['Boolean']['output'];
  deleteAsset: Scalars['Boolean']['output'];
  updateAsset: Scalars['Boolean']['output'];
};


export type AssetsStorageMutationCreateAssetArgs = {
  data: CreateAssetInput;
};


export type AssetsStorageMutationDeleteAssetArgs = {
  assetId: Scalars['String']['input'];
};


export type AssetsStorageMutationUpdateAssetArgs = {
  data: UpdateAssetInput;
};

export type AssetsStorageQuery = {
  __typename?: 'AssetsStorageQuery';
  getFileByUserId: FileOutput;
  getFileByUserIdAndFileName: FileOutput;
};


export type AssetsStorageQueryGetFileByUserIdArgs = {
  input: GetFileByUserIdDto;
};


export type AssetsStorageQueryGetFileByUserIdAndFileNameArgs = {
  input: GetFileByUserIdAndFileNameDto;
};

export type AuthMutation = {
  __typename?: 'AuthMutation';
  deleteAccount: Scalars['Boolean']['output'];
  login: TokenResponse;
  register: TokenResponse;
};


export type AuthMutationDeleteAccountArgs = {
  email: Scalars['String']['input'];
};


export type AuthMutationLoginArgs = {
  data: UserLoginInput;
};


export type AuthMutationRegisterArgs = {
  data: UserRegisterInput;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type CategoryQuery = {
  __typename?: 'CategoryQuery';
  getAllCategoryInS3: Array<Scalars['String']['output']>;
  getCategories: Array<Scalars['String']['output']>;
};

export type CreateAssetInput = {
  bucketName: Scalars['String']['input'];
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  fileKey: Scalars['String']['input'];
  fileSize: Scalars['Int']['input'];
  fileType: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
  publicAccess?: InputMaybe<Scalars['Boolean']['input']>;
  tags: Array<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
};

export type FileOutput = {
  __typename?: 'FileOutput';
  Body: Scalars['String']['output'];
};

export type GetFileByUserIdAndFileNameDto = {
  category: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type GetFileByUserIdDto = {
  category: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  AssetsMutation?: Maybe<AssetsStorageMutation>;
  Auth?: Maybe<AuthMutation>;
  createPost: Post;
  createUser: User;
};


export type MutationCreatePostArgs = {
  authorId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type PingQuery = {
  __typename?: 'PingQuery';
  ping: Scalars['String']['output'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  AssetsQuery?: Maybe<AssetsStorageQuery>;
  Category?: Maybe<CategoryQuery>;
  Ping?: Maybe<PingQuery>;
  getPosts: Array<Post>;
  getUser?: Maybe<User>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  accessToken: Scalars['String']['output'];
};

export type UpdateAssetInput = {
  bucketName?: InputMaybe<Scalars['String']['input']>;
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fileKey?: InputMaybe<Scalars['String']['input']>;
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  fileType?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  publicAccess?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', Auth?: { __typename?: 'AuthMutation', login: { __typename?: 'TokenResponse', accessToken: string } } | null };

export type PingServerQueryVariables = Exact<{ [key: string]: never; }>;


export type PingServerQuery = { __typename?: 'Query', Ping?: { __typename?: 'PingQuery', ping: string } | null };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  Auth {
    login(data: {email: $email, password: $password}) {
      accessToken
    }
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const PingServerDocument = gql`
    query PingServer {
  Ping {
    ping
  }
}
    `;

/**
 * __usePingServerQuery__
 *
 * To run a query within a Vue component, call `usePingServerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePingServerQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePingServerQuery();
 */
export function usePingServerQuery(options: VueApolloComposable.UseQueryOptions<PingServerQuery, PingServerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PingServerQuery, PingServerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PingServerQuery, PingServerQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<PingServerQuery, PingServerQueryVariables>(PingServerDocument, {}, options);
}
export function usePingServerLazyQuery(options: VueApolloComposable.UseQueryOptions<PingServerQuery, PingServerQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PingServerQuery, PingServerQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PingServerQuery, PingServerQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<PingServerQuery, PingServerQueryVariables>(PingServerDocument, {}, options);
}
export type PingServerQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PingServerQuery, PingServerQueryVariables>;