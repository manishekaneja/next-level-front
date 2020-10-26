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
  posts: Array<Post>;
  post?: Maybe<Post>;
  me?: Maybe<UserResponse>;
};

export type QueryPostArgs = {
  id: Scalars["Int"];
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
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  username: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost?: Maybe<Scalars["Boolean"]>;
  register: UserResponse;
  login?: Maybe<UserResponse>;
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

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type UsernamePasswordInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  first_name?: Maybe<Scalars["String"]>;
  last_name?: Maybe<Scalars["String"]>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login?: Maybe<
    { __typename?: "UserResponse" } & {
      errors?: Maybe<
        Array<
          { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
        >
      >;
      user?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "first_name">>;
    }
  >;
};

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & {
    user?: Maybe<{ __typename?: "User" } & Pick<User, "username">>;
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "message" | "field">
      >
    >;
  };
};

export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        first_name
      }
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const RegisterDocument = gql`
  mutation Register(
    $username: String!
    $password: String!
    $first_name: String!
    $last_name: String!
  ) {
    register(
      options: {
        username: $username
        password: $password
        first_name: $first_name
        last_name: $last_name
      }
    ) {
      user {
        username
      }
      errors {
        message
        field
      }
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
