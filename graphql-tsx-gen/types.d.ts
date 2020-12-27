type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

type Query = {
  __typename?: 'Query';
  getAllGroups: Array<Group>;
  allUsers: Array<ApplicationUser>;
  getAllTransactions: Array<Transaction>;
  getTransactionSummary: Array<Split>;
  fetchGroupById?: Maybe<Group>;
  posts: Array<Post>;
  post?: Maybe<Post>;
  me?: Maybe<UserResponse>;
  getUserList: Array<ApplicationUser>;
};


type QueryGetTransactionSummaryArgs = {
  groupid: Scalars['Float'];
};


type QueryFetchGroupByIdArgs = {
  groupId: Scalars['Float'];
};


type QueryPostArgs = {
  id: Scalars['Int'];
};


type QueryGetUserListArgs = {
  searchKey: Scalars['String'];
};

type Group = {
  __typename?: 'Group';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  transactionList: Array<Transaction>;
  memberList: Array<ApplicationUser>;
};

type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  message: Scalars['String'];
  amount: Scalars['Float'];
  owner: ApplicationUser;
  groupRef: Group;
  splitList: Array<Split>;
};

type ApplicationUser = {
  __typename?: 'ApplicationUser';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  groupList: Array<Group>;
  transactionList: Array<Transaction>;
  splitList: Array<Split>;
};

type Split = {
  __typename?: 'Split';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  splitAmount: Scalars['Float'];
  onwer: ApplicationUser;
  transactionRef: Transaction;
};

type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
};

type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<ApplicationUser>;
};

type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

type Mutation = {
  __typename?: 'Mutation';
  genrateDataForUse: Scalars['Boolean'];
  clean: Scalars['Boolean'];
  createNewGroup: ApplicationUser;
  addNewMember: Scalars['Boolean'];
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost?: Maybe<Scalars['Boolean']>;
  addNewTransaction: Group;
  register: UserResponse;
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
};


type MutationCreateNewGroupArgs = {
  data: CreateGroupInputType;
};


type MutationAddNewMemberArgs = {
  groupid: Scalars['Float'];
  userid: Scalars['Float'];
};


type MutationCreatePostArgs = {
  title: Scalars['String'];
};


type MutationUpdatePostArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


type MutationAddNewTransactionArgs = {
  data: CreateTransactionInputType;
};


type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


type MutationLogoutArgs = {
  removeAll: Scalars['Boolean'];
};

type CreateGroupInputType = {
  groupName: Scalars['String'];
  membersIdList: Array<Scalars['Int']>;
};

type CreateTransactionInputType = {
  message: Scalars['String'];
  amount: Scalars['Int'];
  groupId: Scalars['Int'];
};

type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
};

type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'message' | 'field'>
);

type RegularUserFragment = (
  { __typename?: 'ApplicationUser' }
  & Pick<ApplicationUser, 'id' | 'firstname' | 'lastname' | 'username' | 'email'>
  & { groupList: Array<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name'>
  )> }
);

type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'ApplicationUser' }
    & RegularUserFragment
  )> }
);

type AddNewTransactionMutationVariables = Exact<{
  message: Scalars['String'];
  amount: Scalars['Int'];
  groupId: Scalars['Int'];
}>;


type AddNewTransactionMutation = (
  { __typename?: 'Mutation' }
  & { addNewTransaction: (
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name'>
    & { memberList: Array<(
      { __typename?: 'ApplicationUser' }
      & Pick<ApplicationUser, 'username' | 'firstname' | 'lastname' | 'id'>
    )>, transactionList: Array<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'id' | 'message' | 'amount'>
      & { owner: (
        { __typename?: 'ApplicationUser' }
        & Pick<ApplicationUser, 'username' | 'firstname' | 'lastname' | 'id'>
      ) }
    )> }
  ) }
);

type GroupCreationMutationVariables = Exact<{
  name: Scalars['String'];
  memberList: Array<Scalars['Int']>;
}>;


type GroupCreationMutation = (
  { __typename?: 'Mutation' }
  & { createNewGroup: (
    { __typename?: 'ApplicationUser' }
    & Pick<ApplicationUser, 'id' | 'username'>
    & { groupList: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )> }
  ) }
);

type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  )> }
);

type LogoutMutationVariables = Exact<{
  removeAll: Scalars['Boolean'];
}>;


type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
}>;


type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

type GetGroupDetailsByIdQueryVariables = Exact<{
  grpId: Scalars['Float'];
}>;


type GetGroupDetailsByIdQuery = (
  { __typename?: 'Query' }
  & { fetchGroupById?: Maybe<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name'>
    & { memberList: Array<(
      { __typename?: 'ApplicationUser' }
      & Pick<ApplicationUser, 'username' | 'firstname' | 'lastname' | 'id'>
    )>, transactionList: Array<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'id' | 'message' | 'amount'>
      & { owner: (
        { __typename?: 'ApplicationUser' }
        & Pick<ApplicationUser, 'username' | 'firstname' | 'lastname' | 'id'>
      ) }
    )> }
  )> }
);

type GetUserListQueryVariables = Exact<{
  searchKey: Scalars['String'];
}>;


type GetUserListQuery = (
  { __typename?: 'Query' }
  & { getUserList: Array<(
    { __typename?: 'ApplicationUser' }
    & Pick<ApplicationUser, 'id' | 'firstname' | 'lastname' | 'username'>
  )> }
);

type MeQueryVariables = Exact<{ [key: string]: never; }>;


type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  )> }
);
