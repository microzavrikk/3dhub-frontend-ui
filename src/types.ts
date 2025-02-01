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
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Asset = {
  __typename?: 'Asset';
  category: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  file: Scalars['Upload']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  publicAccess?: Maybe<Scalars['Boolean']['output']>;
  tags: Array<Scalars['String']['output']>;
  titleName: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
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
  login: AuthPayload;
  register: AuthPayload;
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
  accessToken: Scalars['String']['output'];
  user: User;
};

export type CategoryQuery = {
  __typename?: 'CategoryQuery';
  getAllCategoryInS3: Array<Scalars['String']['output']>;
  getCategories: Array<Scalars['String']['output']>;
};

export type CreateAssetInput = {
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
  publicAccess?: InputMaybe<Scalars['Boolean']['input']>;
  tags: Array<Scalars['String']['input']>;
  titleName: Scalars['String']['input'];
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

export type GlobalSearchQuery = {
  __typename?: 'GlobalSearchQuery';
  search: GlobalSearchResult;
};


export type GlobalSearchQuerySearchArgs = {
  query: Scalars['String']['input'];
};

export type GlobalSearchResult = {
  __typename?: 'GlobalSearchResult';
  executionTime: Scalars['Int']['output'];
  modelsCount: Scalars['Int']['output'];
  users: Array<UserSearchResult>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AssetsMutation?: Maybe<AssetsStorageMutation>;
  Auth?: Maybe<AuthMutation>;
  SetRoles?: Maybe<SetRolesMutation>;
  createPost: Post;
  createUser: User;
  deleteProfile: Scalars['Boolean']['output'];
  setAvatarUrl: Profile;
  updateProfile: Profile;
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


export type MutationDeleteProfileArgs = {
  userId: Scalars['String']['input'];
};


export type MutationSetAvatarUrlArgs = {
  avatarUrl: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUpdateProfileArgs = {
  profile: ProfileInput;
  userId: Scalars['String']['input'];
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

export type Profile = {
  __typename?: 'Profile';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  backgroundUrl?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  socialLinks?: Maybe<Scalars['JSON']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type ProfileInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  backgroundUrl?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  socialLinks?: InputMaybe<Scalars['JSON']['input']>;
};

export type Query = {
  __typename?: 'Query';
  AssetsQuery?: Maybe<AssetsStorageQuery>;
  Category?: Maybe<CategoryQuery>;
  GlobalSearch?: Maybe<GlobalSearchQuery>;
  Ping?: Maybe<PingQuery>;
  SearchUser?: Maybe<SearchUserQuery>;
  getPosts: Array<Post>;
  getProfile?: Maybe<Profile>;
  getUser?: Maybe<User>;
};


export type QueryGetProfileArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type SearchUserByEmailInput = {
  email: Scalars['String']['input'];
};

export type SearchUserByIdInput = {
  id: Scalars['ID']['input'];
};

export type SearchUserByUsernameInput = {
  username: Scalars['String']['input'];
};

export type SearchUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SearchUserQuery = {
  __typename?: 'SearchUserQuery';
  findAllUsers?: Maybe<Array<User>>;
  findUserByEmail?: Maybe<User>;
  findUserById?: Maybe<User>;
  findUserByUsername?: Maybe<User>;
  searchUsers?: Maybe<Array<User>>;
};


export type SearchUserQueryFindUserByEmailArgs = {
  data: SearchUserByEmailInput;
};


export type SearchUserQueryFindUserByIdArgs = {
  data: SearchUserByIdInput;
};


export type SearchUserQueryFindUserByUsernameArgs = {
  data: SearchUserByUsernameInput;
};


export type SearchUserQuerySearchUsersArgs = {
  data?: InputMaybe<SearchUserInput>;
};

export type SetRolesMutation = {
  __typename?: 'SetRolesMutation';
  setUserRole: Scalars['Boolean']['output'];
};


export type SetRolesMutationSetUserRoleArgs = {
  newRole: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  accessToken: Scalars['String']['output'];
};

export type UpdateAssetInput = {
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  publicAccess?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  titleName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
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

export type UserSearchResult = {
  __typename?: 'UserSearchResult';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', Auth?: { __typename?: 'AuthMutation', login: { __typename?: 'AuthPayload', accessToken: string, user: { __typename?: 'User', id: string, email: string, username: string, role: string } } } | null };

export type PingServerQueryVariables = Exact<{ [key: string]: never; }>;


export type PingServerQuery = { __typename?: 'Query', Ping?: { __typename?: 'PingQuery', ping: string } | null };

export type GlobalSearchQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type GlobalSearchQuery = { __typename?: 'Query', GlobalSearch?: { __typename?: 'GlobalSearchQuery', search: { __typename?: 'GlobalSearchResult', modelsCount: number, executionTime: number, users: Array<{ __typename?: 'UserSearchResult', username: string, avatarUrl?: string | null }> } } | null };

export type RegisterMutationVariables = Exact<{
  data: UserRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', Auth?: { __typename?: 'AuthMutation', register: { __typename?: 'AuthPayload', accessToken: string, user: { __typename?: 'User', id: string, email: string, username: string, role: string } } } | null };

export type GetProfileQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile?: { __typename?: 'Profile', id: string, userId: string, avatarUrl?: string | null, backgroundUrl?: string | null, bio?: string | null, socialLinks?: any | null, createdAt: any, updatedAt: any } | null };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  Auth {
    login(data: {email: $email, password: $password}) {
      accessToken
      user {
        id
        email
        username
        role
      }
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
export const GlobalSearchDocument = gql`
    query GlobalSearch($query: String!) {
  GlobalSearch {
    search(query: $query) {
      users {
        username
        avatarUrl
      }
      modelsCount
      executionTime
    }
  }
}
    `;

/**
 * __useGlobalSearchQuery__
 *
 * To run a query within a Vue component, call `useGlobalSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalSearchQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGlobalSearchQuery({
 *   query: // value for 'query'
 * });
 */
export function useGlobalSearchQuery(variables: GlobalSearchQueryVariables | VueCompositionApi.Ref<GlobalSearchQueryVariables> | ReactiveFunction<GlobalSearchQueryVariables>, options: VueApolloComposable.UseQueryOptions<GlobalSearchQuery, GlobalSearchQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GlobalSearchQuery, GlobalSearchQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GlobalSearchQuery, GlobalSearchQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GlobalSearchQuery, GlobalSearchQueryVariables>(GlobalSearchDocument, variables, options);
}
export function useGlobalSearchLazyQuery(variables?: GlobalSearchQueryVariables | VueCompositionApi.Ref<GlobalSearchQueryVariables> | ReactiveFunction<GlobalSearchQueryVariables>, options: VueApolloComposable.UseQueryOptions<GlobalSearchQuery, GlobalSearchQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GlobalSearchQuery, GlobalSearchQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GlobalSearchQuery, GlobalSearchQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GlobalSearchQuery, GlobalSearchQueryVariables>(GlobalSearchDocument, variables, options);
}
export type GlobalSearchQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GlobalSearchQuery, GlobalSearchQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($data: UserRegisterInput!) {
  Auth {
    register(data: $data) {
      accessToken
      user {
        id
        email
        username
        role
      }
    }
  }
}
    `;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(options: VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RegisterMutation, RegisterMutationVariables>;
export const GetProfileDocument = gql`
    query GetProfile($userId: String!) {
  getProfile(userId: $userId) {
    id
    userId
    avatarUrl
    backgroundUrl
    bio
    socialLinks
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a Vue component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetProfileQuery({
 *   userId: // value for 'userId'
 * });
 */
export function useGetProfileQuery(variables: GetProfileQueryVariables | VueCompositionApi.Ref<GetProfileQueryVariables> | ReactiveFunction<GetProfileQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, variables, options);
}
export function useGetProfileLazyQuery(variables?: GetProfileQueryVariables | VueCompositionApi.Ref<GetProfileQueryVariables> | ReactiveFunction<GetProfileQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetProfileQuery, GetProfileQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, variables, options);
}
export type GetProfileQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetProfileQuery, GetProfileQueryVariables>;