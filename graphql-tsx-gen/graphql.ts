import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
    id
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
${RegularUserFragmentDoc}`;
export const AddNewTransactionDocument = gql`
    mutation AddNewTransaction($message: String!, $amount: Int!, $groupId: Int!) {
  addNewTransaction(data: {groupId: $groupId, amount: $amount, message: $message}) {
    id
    name
    memberList {
      username
      firstname
      lastname
      id
    }
    transactionList {
      id
      message
      amount
      owner {
        username
        firstname
        lastname
        id
      }
    }
  }
}
    `;

export function useAddNewTransactionMutation() {
  return Urql.useMutation<AddNewTransactionMutation, AddNewTransactionMutationVariables>(AddNewTransactionDocument);
};
export const GroupCreationDocument = gql`
    mutation GroupCreation($name: String!, $memberList: [Int!]!) {
  createNewGroup(data: {groupName: $name, membersIdList: $memberList}) {
    id
    username
    groupList {
      id
      name
    }
  }
}
    `;

export function useGroupCreationMutation() {
  return Urql.useMutation<GroupCreationMutation, GroupCreationMutationVariables>(GroupCreationDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(options: {username: $username, password: $password}) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation logout($removeAll: Boolean!) {
  logout(removeAll: $removeAll)
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $first_name: String!, $last_name: String!, $email: String!) {
  register(
    options: {username: $username, password: $password, email: $email, firstname: $first_name, lastname: $last_name}
  ) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetGroupDetailsByIdDocument = gql`
    query GetGroupDetailsById($grpId: Float!) {
  fetchGroupById(groupId: $grpId) {
    id
    name
    memberList {
      username
      firstname
      lastname
      id
    }
    transactionList {
      id
      message
      amount
      owner {
        username
        firstname
        lastname
        id
      }
    }
  }
}
    `;

export function useGetGroupDetailsByIdQuery(options: Omit<Urql.UseQueryArgs<GetGroupDetailsByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetGroupDetailsByIdQuery>({ query: GetGroupDetailsByIdDocument, ...options });
};
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

export function useGetUserListQuery(options: Omit<Urql.UseQueryArgs<GetUserListQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserListQuery>({ query: GetUserListDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};