import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
};

export type Contribution = {
  __typename?: 'Contribution';
  color: Scalars['String'];
  count: Scalars['Int'];
  language: Scalars['String'];
};

/** Autogenerated input type of CreateFavorite */
export type CreateFavoriteInput = {
  uid: Scalars['String'];
  projectId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateFavorite */
export type CreateFavoritePayload = {
  __typename?: 'CreateFavoritePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  favorite: Favorite;
  result?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated input type of CreateParticipant */
export type CreateParticipantInput = {
  uid: Scalars['String'];
  projectId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateParticipant */
export type CreateParticipantPayload = {
  __typename?: 'CreateParticipantPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  participant: Participant;
  result?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated input type of CreateProject */
export type CreateProjectInput = {
  ownerUid: Scalars['String'];
  name: Scalars['String'];
  /** プロジェクト概要 */
  description?: Maybe<Scalars['String']>;
  /** GitHubリポジトリURL */
  githubUrl?: Maybe<Scalars['String']>;
  /** 開発期間：開始 */
  startsAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** 開発期間：終了 */
  endsAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** 使用言語 */
  languages?: Maybe<Array<LanguageInput>>;
  /** 募集人数 */
  recruitmentNumbers?: Maybe<Scalars['Int']>;
  /** コミュニケーションツールのリンク */
  toolLink?: Maybe<Scalars['String']>;
  /** コントリビュート方法 */
  contribution?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateProject */
export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  result?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated input type of CreateUser */
export type CreateUserInput = {
  uid: Scalars['String'];
  githubId: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateUser */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['Boolean']>;
  user: User;
};

/** Autogenerated input type of DeleteFavorite */
export type DeleteFavoriteInput = {
  id: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteFavorite */
export type DeleteFavoritePayload = {
  __typename?: 'DeleteFavoritePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  favorite: Favorite;
  result?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated input type of DeleteParticipant */
export type DeleteParticipantInput = {
  id: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteParticipant */
export type DeleteParticipantPayload = {
  __typename?: 'DeleteParticipantPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  participant: Participant;
  result?: Maybe<Scalars['Boolean']>;
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  project: Project;
  updatedAt: Scalars['ISO8601DateTime'];
  user: User;
};

/** The connection type for Favorite. */
export type FavoriteConnection = {
  __typename?: 'FavoriteConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<FavoriteEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Favorite>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type FavoriteEdge = {
  __typename?: 'FavoriteEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Favorite>;
};


export type Language = {
  __typename?: 'Language';
  color: Scalars['String'];
  name: Scalars['String'];
};

export type LanguageInput = {
  name: Scalars['String'];
  color: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFavorite?: Maybe<CreateFavoritePayload>;
  createParticipant?: Maybe<CreateParticipantPayload>;
  createProject?: Maybe<CreateProjectPayload>;
  createUser?: Maybe<CreateUserPayload>;
  deleteFavorite?: Maybe<DeleteFavoritePayload>;
  deleteParticipant?: Maybe<DeleteParticipantPayload>;
  updateParticipant?: Maybe<UpdateParticipantPayload>;
  updateProject?: Maybe<UpdateProjectPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
};


export type MutationCreateFavoriteArgs = {
  input: CreateFavoriteInput;
};


export type MutationCreateParticipantArgs = {
  input: CreateParticipantInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteFavoriteArgs = {
  input: DeleteFavoriteInput;
};


export type MutationDeleteParticipantArgs = {
  input: DeleteParticipantInput;
};


export type MutationUpdateParticipantArgs = {
  input: UpdateParticipantInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Participant = {
  __typename?: 'Participant';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  isAdmitted: Scalars['Boolean'];
  project: Project;
  updatedAt: Scalars['ISO8601DateTime'];
  user: User;
};

/** The connection type for Participant. */
export type ParticipantConnection = {
  __typename?: 'ParticipantConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ParticipantEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Participant>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ParticipantEdge = {
  __typename?: 'ParticipantEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Participant>;
};

export type Project = {
  __typename?: 'Project';
  contribution: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  description: Scalars['String'];
  endsAt?: Maybe<Scalars['ISO8601DateTime']>;
  githubUrl: Scalars['String'];
  id: Scalars['ID'];
  languages: Array<Language>;
  name: Scalars['String'];
  owner: User;
  recruitmentNumbers?: Maybe<Scalars['Int']>;
  startsAt?: Maybe<Scalars['ISO8601DateTime']>;
  toolLink: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for Project. */
export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProjectEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Project>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Project>;
};

export type Query = {
  __typename?: 'Query';
  favorite: Favorite;
  participant: Participant;
  project: Project;
  projectFavorites: FavoriteConnection;
  projectParticipants: ParticipantConnection;
  projects: ProjectConnection;
  user: User;
  userFavorites: FavoriteConnection;
  userParticipants: ParticipantConnection;
  users: UserConnection;
};


export type QueryFavoriteArgs = {
  id: Scalars['ID'];
};


export type QueryParticipantArgs = {
  id: Scalars['ID'];
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};


export type QueryProjectFavoritesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  projectId: Scalars['ID'];
};


export type QueryProjectParticipantsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  projectId: Scalars['ID'];
};


export type QueryProjectsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
};


export type QueryUserArgs = {
  uid: Scalars['String'];
};


export type QueryUserFavoritesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  uid: Scalars['String'];
};


export type QueryUserParticipantsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  uid: Scalars['String'];
};


export type QueryUsersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  language?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateParticipant */
export type UpdateParticipantInput = {
  id: Scalars['ID'];
  isAdmitted: Scalars['Boolean'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateParticipant */
export type UpdateParticipantPayload = {
  __typename?: 'UpdateParticipantPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  participant: Participant;
  result?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated input type of UpdateProject */
export type UpdateProjectInput = {
  /** プロジェクトID */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  /** プロジェクト概要 */
  description?: Maybe<Scalars['String']>;
  /** GitHubリポジトリURL */
  githubUrl?: Maybe<Scalars['String']>;
  /** 開発期間：開始 */
  startsAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** 開発期間：終了 */
  endsAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** 使用言語 */
  languages?: Maybe<Array<LanguageInput>>;
  /** 募集人数 */
  recruitmentNumbers?: Maybe<Scalars['Int']>;
  /** コミュニケーションツールのリンク */
  toolLink?: Maybe<Scalars['String']>;
  /** コントリビュート方法 */
  contribution?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateProject */
export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  project: Project;
  result?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated input type of UpdateUser */
export type UpdateUserInput = {
  uid: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateUser */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['Boolean']>;
  user: User;
};

export type User = {
  __typename?: 'User';
  contributions: Array<Contribution>;
  createdAt: Scalars['ISO8601DateTime'];
  description: Scalars['String'];
  githubIconUrl: Scalars['String'];
  githubId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  uid: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for User. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<User>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<User>;
};

export type GetProjectsQueryVariables = Exact<{
  uid: Scalars['String'];
  projectsFirst: Scalars['Int'];
  userParticipantsFirst: Scalars['Int'];
  userFavoritsFirst: Scalars['Int'];
}>;


export type GetProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'ProjectConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name' | 'description' | 'startsAt' | 'endsAt' | 'recruitmentNumbers' | 'toolLink' | 'contribution'>
      & { languages: Array<(
        { __typename?: 'Language' }
        & Pick<Language, 'name' | 'color'>
      )> }
    )>>> }
  ), userParticipants: (
    { __typename?: 'ParticipantConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Participant' }
      & { project: (
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name' | 'description' | 'startsAt' | 'endsAt' | 'recruitmentNumbers' | 'toolLink' | 'contribution'>
        & { languages: Array<(
          { __typename?: 'Language' }
          & Pick<Language, 'name' | 'color'>
        )> }
      ) }
    )>>> }
  ), userFavorites: (
    { __typename?: 'FavoriteConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Favorite' }
      & Pick<Favorite, 'id'>
      & { project: (
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name' | 'description' | 'startsAt' | 'endsAt' | 'recruitmentNumbers' | 'toolLink' | 'contribution'>
        & { languages: Array<(
          { __typename?: 'Language' }
          & Pick<Language, 'name' | 'color'>
        )> }
      ) }
    )>>> }
  ) }
);

export type GetMyProjectsQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetMyProjectsQuery = (
  { __typename?: 'Query' }
  & { userParticipants: (
    { __typename?: 'ParticipantConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Participant' }
      & { project: (
        { __typename?: 'Project' }
        & Pick<Project, 'id' | 'name' | 'description' | 'startsAt' | 'endsAt' | 'recruitmentNumbers' | 'toolLink' | 'contribution'>
        & { owner: (
          { __typename?: 'User' }
          & Pick<User, 'uid'>
        ), languages: Array<(
          { __typename?: 'Language' }
          & Pick<Language, 'name' | 'color'>
        )> }
      ) }
    )>>> }
  ), userFavorites: (
    { __typename?: 'FavoriteConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Favorite' }
      & { project: (
        { __typename?: 'Project' }
        & Pick<Project, 'id'>
      ) }
    )>>> }
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  githubUrl?: Maybe<Scalars['String']>;
  startsAt?: Maybe<Scalars['ISO8601DateTime']>;
  endsAt?: Maybe<Scalars['ISO8601DateTime']>;
  languages?: Maybe<Array<LanguageInput> | LanguageInput>;
  recruitmentNumbers?: Maybe<Scalars['Int']>;
  toolLink?: Maybe<Scalars['String']>;
  contribution?: Maybe<Scalars['String']>;
  ownerUid: Scalars['String'];
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject?: Maybe<(
    { __typename?: 'CreateProjectPayload' }
    & { project?: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name' | 'description' | 'startsAt' | 'endsAt' | 'recruitmentNumbers' | 'toolLink' | 'contribution'>
      & { languages: Array<(
        { __typename?: 'Language' }
        & Pick<Language, 'name' | 'color'>
      )>, owner: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      ) }
    )> }
  )> }
);

export type CreateParticipantMutationVariables = Exact<{
  uid: Scalars['String'];
  projectId: Scalars['ID'];
}>;


export type CreateParticipantMutation = (
  { __typename?: 'Mutation' }
  & { createParticipant?: Maybe<(
    { __typename?: 'CreateParticipantPayload' }
    & { participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ), project: (
        { __typename?: 'Project' }
        & Pick<Project, 'id'>
      ) }
    ) }
  )> }
);

export type CreateFavoriteMutationVariables = Exact<{
  uid: Scalars['String'];
  projectId: Scalars['ID'];
}>;


export type CreateFavoriteMutation = (
  { __typename?: 'Mutation' }
  & { createFavorite?: Maybe<(
    { __typename?: 'CreateFavoritePayload' }
    & { favorite: (
      { __typename?: 'Favorite' }
      & Pick<Favorite, 'id'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ), project: (
        { __typename?: 'Project' }
        & Pick<Project, 'id'>
      ) }
    ) }
  )> }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'UserConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'uid'>
    )>>> }
  ) }
);

export type GetUserQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'uid' | 'description' | 'githubId' | 'githubIconUrl'>
    & { contributions: Array<(
      { __typename?: 'Contribution' }
      & Pick<Contribution, 'language' | 'color' | 'count'>
    )> }
  ) }
);

export type CreateUserMutationVariables = Exact<{
  uid: Scalars['String'];
  githubId: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'CreateUserPayload' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'uid'>
    ) }
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  uid: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'UpdateUserPayload' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'uid'>
    ) }
  )> }
);


export const GetProjectsDocument = gql`
    query GetProjects($uid: String!, $projectsFirst: Int!, $userParticipantsFirst: Int!, $userFavoritsFirst: Int!) {
  projects(first: $projectsFirst) {
    nodes {
      id
      name
      description
      startsAt
      endsAt
      languages {
        name
        color
      }
      recruitmentNumbers
      toolLink
      contribution
    }
  }
  userParticipants(uid: $uid, first: $userParticipantsFirst) {
    nodes {
      project {
        id
        name
        description
        startsAt
        endsAt
        languages {
          name
          color
        }
        recruitmentNumbers
        toolLink
        contribution
      }
    }
  }
  userFavorites(uid: $uid, first: $userFavoritsFirst) {
    nodes {
      id
      project {
        id
        name
        description
        startsAt
        endsAt
        languages {
          name
          color
        }
        recruitmentNumbers
        toolLink
        contribution
      }
    }
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *      uid: // value for 'uid'
 *      projectsFirst: // value for 'projectsFirst'
 *      userParticipantsFirst: // value for 'userParticipantsFirst'
 *      userFavoritsFirst: // value for 'userFavoritsFirst'
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetMyProjectsDocument = gql`
    query GetMyProjects($uid: String!) {
  userParticipants(uid: $uid) {
    nodes {
      project {
        id
        name
        owner {
          uid
        }
        description
        startsAt
        endsAt
        languages {
          name
          color
        }
        recruitmentNumbers
        toolLink
        contribution
      }
    }
  }
  userFavorites(uid: $uid) {
    nodes {
      project {
        id
      }
    }
  }
}
    `;

/**
 * __useGetMyProjectsQuery__
 *
 * To run a query within a React component, call `useGetMyProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProjectsQuery({
 *   variables: {
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useGetMyProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetMyProjectsQuery, GetMyProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProjectsQuery, GetMyProjectsQueryVariables>(GetMyProjectsDocument, options);
      }
export function useGetMyProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProjectsQuery, GetMyProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProjectsQuery, GetMyProjectsQueryVariables>(GetMyProjectsDocument, options);
        }
export type GetMyProjectsQueryHookResult = ReturnType<typeof useGetMyProjectsQuery>;
export type GetMyProjectsLazyQueryHookResult = ReturnType<typeof useGetMyProjectsLazyQuery>;
export type GetMyProjectsQueryResult = Apollo.QueryResult<GetMyProjectsQuery, GetMyProjectsQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($name: String!, $description: String, $githubUrl: String, $startsAt: ISO8601DateTime, $endsAt: ISO8601DateTime, $languages: [LanguageInput!], $recruitmentNumbers: Int, $toolLink: String, $contribution: String, $ownerUid: String!) {
  createProject(
    input: {name: $name, description: $description, githubUrl: $githubUrl, startsAt: $startsAt, endsAt: $endsAt, languages: $languages, recruitmentNumbers: $recruitmentNumbers, toolLink: $toolLink, contribution: $contribution, ownerUid: $ownerUid}
  ) {
    project {
      id
      name
      description
      startsAt
      endsAt
      languages {
        name
        color
      }
      recruitmentNumbers
      toolLink
      contribution
      owner {
        id
        name
      }
    }
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      githubUrl: // value for 'githubUrl'
 *      startsAt: // value for 'startsAt'
 *      endsAt: // value for 'endsAt'
 *      languages: // value for 'languages'
 *      recruitmentNumbers: // value for 'recruitmentNumbers'
 *      toolLink: // value for 'toolLink'
 *      contribution: // value for 'contribution'
 *      ownerUid: // value for 'ownerUid'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateParticipantDocument = gql`
    mutation CreateParticipant($uid: String!, $projectId: ID!) {
  createParticipant(input: {uid: $uid, projectId: $projectId}) {
    participant {
      id
      user {
        id
      }
      project {
        id
      }
    }
  }
}
    `;
export type CreateParticipantMutationFn = Apollo.MutationFunction<CreateParticipantMutation, CreateParticipantMutationVariables>;

/**
 * __useCreateParticipantMutation__
 *
 * To run a mutation, you first call `useCreateParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createParticipantMutation, { data, loading, error }] = useCreateParticipantMutation({
 *   variables: {
 *      uid: // value for 'uid'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCreateParticipantMutation(baseOptions?: Apollo.MutationHookOptions<CreateParticipantMutation, CreateParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateParticipantMutation, CreateParticipantMutationVariables>(CreateParticipantDocument, options);
      }
export type CreateParticipantMutationHookResult = ReturnType<typeof useCreateParticipantMutation>;
export type CreateParticipantMutationResult = Apollo.MutationResult<CreateParticipantMutation>;
export type CreateParticipantMutationOptions = Apollo.BaseMutationOptions<CreateParticipantMutation, CreateParticipantMutationVariables>;
export const CreateFavoriteDocument = gql`
    mutation CreateFavorite($uid: String!, $projectId: ID!) {
  createFavorite(input: {uid: $uid, projectId: $projectId}) {
    favorite {
      id
      user {
        id
      }
      project {
        id
      }
    }
  }
}
    `;
export type CreateFavoriteMutationFn = Apollo.MutationFunction<CreateFavoriteMutation, CreateFavoriteMutationVariables>;

/**
 * __useCreateFavoriteMutation__
 *
 * To run a mutation, you first call `useCreateFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFavoriteMutation, { data, loading, error }] = useCreateFavoriteMutation({
 *   variables: {
 *      uid: // value for 'uid'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCreateFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFavoriteMutation, CreateFavoriteMutationVariables>(CreateFavoriteDocument, options);
      }
export type CreateFavoriteMutationHookResult = ReturnType<typeof useCreateFavoriteMutation>;
export type CreateFavoriteMutationResult = Apollo.MutationResult<CreateFavoriteMutation>;
export type CreateFavoriteMutationOptions = Apollo.BaseMutationOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    nodes {
      id
      name
      uid
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($uid: String!) {
  user(uid: $uid) {
    id
    name
    uid
    description
    githubId
    githubIconUrl
    contributions {
      language
      color
      count
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($uid: String!, $githubId: String!) {
  createUser(input: {uid: $uid, githubId: $githubId}) {
    user {
      id
      name
      uid
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      uid: // value for 'uid'
 *      githubId: // value for 'githubId'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($uid: String!, $name: String!, $description: String!) {
  updateUser(input: {uid: $uid, name: $name, description: $description}) {
    user {
      id
      name
      uid
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      uid: // value for 'uid'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;