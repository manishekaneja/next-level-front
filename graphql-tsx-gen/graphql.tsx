import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  getAllGroups: Array<Group>;
  allUsers: Array<ApplicationUser>;
  getAllTransactions: Array<Transaction>;
  getTransactionSummary: Array<Split>;
  posts: Array<Post>;
  post?: Maybe<Post>;
  me?: Maybe<UserResponse>;
  getUserList: Array<ApplicationUser>;
};

export type QueryGetTransactionSummaryArgs = {
  groupid: Scalars["Float"];
};

export type QueryPostArgs = {
  id: Scalars["Int"];
};

export type QueryGetUserListArgs = {
  searchKey: Scalars["String"];
};

export type Group = {
  __typename?: "Group";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  name: Scalars["String"];
  transactionList: Array<Transaction>;
  memberList: Array<ApplicationUser>;
};

export type Transaction = {
  __typename?: "Transaction";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  message: Scalars["String"];
  amount: Scalars["Float"];
  owner: ApplicationUser;
  groupRef: Group;
  splitList: Array<Split>;
};

export type ApplicationUser = {
  __typename?: "ApplicationUser";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  firstname: Scalars["String"];
  lastname: Scalars["String"];
  username: Scalars["String"];
  email: Scalars["String"];
  groupList: Array<Group>;
  transactionList: Array<Transaction>;
  splitList: Array<Split>;
};

export type Split = {
  __typename?: "Split";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  splitAmount: Scalars["Float"];
  onwer: ApplicationUser;
  transactionRef: Transaction;
};

export type Post = {
  __typename?: "Post";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  title: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<ApplicationUser>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  genrateDataForUse: Scalars["Boolean"];
  clean: Scalars["Boolean"];
  createNewGroup: Scalars["Boolean"];
  addNewMember: Scalars["Boolean"];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost?: Maybe<Scalars["Boolean"]>;
  addNewTransaction: Scalars["Boolean"];
  register: UserResponse;
  login?: Maybe<UserResponse>;
  logout: Scalars["Boolean"];
};

export type MutationCreateNewGroupArgs = {
  group_name: Scalars["String"];
};

export type MutationAddNewMemberArgs = {
  groupid: Scalars["Float"];
  userid: Scalars["Float"];
};

export type MutationCreatePostArgs = {
  title: Scalars["String"];
};

export type MutationUpdatePostArgs = {
  title?: Maybe<Scalars["String"]>;
  id: Scalars["Float"];
};

export type MutationDeletePostArgs = {
  id: Scalars["Float"];
};

export type MutationAddNewTransactionArgs = {
  groupid: Scalars["Float"];
  userid: Scalars["Float"];
  amount: Scalars["Float"];
  message: Scalars["String"];
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type MutationLogoutArgs = {
  removeAll: Scalars["Boolean"];
};

export type UsernamePasswordInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  firstname?: Maybe<Scalars["String"]>;
  lastname?: Maybe<Scalars["String"]>;
};

export type RegularErrorFragment = { __typename?: "FieldError" } & Pick<
  FieldError,
  "field" | "message"
>;

export type RegularUserFragment = { __typename?: "ApplicationUser" } & Pick<
  ApplicationUser,
  "id" | "firstname" | "lastname" | "username" | "email"
> & { groupList: Array<{ __typename?: "Group" } & Pick<Group, "name">> };

export type RegularUserResponseFragment = { __typename?: "UserResponse" } & {
  errors?: Maybe<Array<{ __typename?: "FieldError" } & RegularErrorFragment>>;
  user?: Maybe<{ __typename?: "ApplicationUser" } & RegularUserFragment>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login?: Maybe<{ __typename?: "UserResponse" } & RegularUserResponseFragment>;
};

export type LogoutMutationVariables = Exact<{
  removeAll: Scalars["Boolean"];
}>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  email: Scalars["String"];
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type GetUserListQueryVariables = Exact<{
  searchKey: Scalars["String"];
}>;

export type GetUserListQuery = { __typename?: "Query" } & {
  getUserList: Array<
    { __typename?: "ApplicationUser" } & Pick<
      ApplicationUser,
      "id" | "firstname" | "lastname" | "username"
    >
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "UserResponse" } & RegularUserResponseFragment>;
};

export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    message
    field
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on ApplicationUser {
    id
    firstname
    lastname
    username
    email
    groupList {
      name
    }
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation logout($removeAll: Boolean!) {
    logout(removeAll: $removeAll)
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const RegisterDocument = gql`
  mutation Register(
    $username: String!
    $password: String!
    $first_name: String!
    $last_name: String!
    $email: String!
  ) {
    register(
      options: {
        username: $username
        password: $password
        email: $email
        firstname: $first_name
        lastname: $last_name
      }
    ) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const GetUserListDocument = gql`
  query GetUserList($searchKey: String!) {
    getUserList(searchKey: $searchKey) {
      id
      firstname
      lastname
      username
    }
  }
`;

export function useGetUserListQuery(
  options: Omit<Urql.UseQueryArgs<GetUserListQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<GetUserListQuery>({
    query: GetUserListDocument,
    ...options,
  });
}
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
