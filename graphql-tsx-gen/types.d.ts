  type Maybe<T> = T | null;
  type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
  type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

  type Query = {
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

  type QueryGetTransactionSummaryArgs = {
  groupid: Scalars["Float"];
};

  type QueryPostArgs = {
  id: Scalars["Int"];
};

  type QueryGetUserListArgs = {
  searchKey: Scalars["String"];
};

  type Group = {
  __typename?: "Group";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  name: Scalars["String"];
  transactionList: Array<Transaction>;
  memberList: Array<ApplicationUser>;
};

  type Transaction = {
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

  type ApplicationUser = {
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

  type Split = {
  __typename?: "Split";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  splitAmount: Scalars["Float"];
  onwer: ApplicationUser;
  transactionRef: Transaction;
};

  type Post = {
  __typename?: "Post";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  title: Scalars["String"];
};

  type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<ApplicationUser>;
};

  type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

  type Mutation = {
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

  type MutationCreateNewGroupArgs = {
  group_name: Scalars["String"];
};

  type MutationAddNewMemberArgs = {
  groupid: Scalars["Float"];
  userid: Scalars["Float"];
};

  type MutationCreatePostArgs = {
  title: Scalars["String"];
};

  type MutationUpdatePostArgs = {
  title?: Maybe<Scalars["String"]>;
  id: Scalars["Float"];
};

  type MutationDeletePostArgs = {
  id: Scalars["Float"];
};

  type MutationAddNewTransactionArgs = {
  groupid: Scalars["Float"];
  userid: Scalars["Float"];
  amount: Scalars["Float"];
  message: Scalars["String"];
};

  type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

  type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

  type MutationLogoutArgs = {
  removeAll: Scalars["Boolean"];
};

  type UsernamePasswordInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  firstname?: Maybe<Scalars["String"]>;
  lastname?: Maybe<Scalars["String"]>;
};

  type RegularErrorFragment = { __typename?: "FieldError" } & Pick<
  FieldError,
  "field" | "message"
>;

  type RegularUserFragment = { __typename?: "ApplicationUser" } & Pick<
  ApplicationUser,
  "firstname" | "lastname" | "username" | "email"
> & { groupList: Array<{ __typename?: "Group" } & Pick<Group, "name">> };

  type RegularUserResponseFragment = { __typename?: "UserResponse" } & {
  errors?: Maybe<Array<{ __typename?: "FieldError" } & RegularErrorFragment>>;
  user?: Maybe<{ __typename?: "ApplicationUser" } & RegularUserFragment>;
};

  type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

  type LoginMutation = { __typename?: "Mutation" } & {
  login?: Maybe<{ __typename?: "UserResponse" } & RegularUserResponseFragment>;
};

  type LogoutMutationVariables = Exact<{
  removeAll: Scalars["Boolean"];
}>;

  type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

  type RegisterMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  email: Scalars["String"];
}>;

  type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

  type GetUserListQueryVariables = Exact<{
  searchKey: Scalars["String"];
}>;

  type GetUserListQuery = { __typename?: "Query" } & {
  getUserList: Array<
    { __typename?: "ApplicationUser" } & Pick<
      ApplicationUser,
      "id" | "firstname" | "lastname" | "username"
    >
  >;
};

  type MeQueryVariables = Exact<{ [key: string]: never }>;

  type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "UserResponse" } & RegularUserResponseFragment>;
};
