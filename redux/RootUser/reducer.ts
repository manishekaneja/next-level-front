import InitState$RootUser from "./initialState";

const Reducer$RootUser: ReducerType$RootUser = (
  previousState: StateType$RootUser = InitState$RootUser,
  { type, payload }: DispatchObject$RootUser
) => {
  switch (type) {
    case "root-user|set-user":
      return {
        ...previousState,
        ...payload,
      };
    case "root-user|update-user":
      return {
        ...previousState,
        ...payload,
        email: previousState.email,
        username: previousState.username,
        id: previousState.id,
      };
    case "root-user|reset-user":
      return InitState$RootUser;
    default:
      return previousState;
  }
};

export { Reducer$RootUser };
