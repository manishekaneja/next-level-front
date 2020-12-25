type StateType$RootUser = ApplicationUser & {};

type ActionKeyType$RootUser = "root-user|set-user" | "root-user|reset-user";

type ReducerType$RootUser = (
  initialState: StateType$RootUser,
  action: DispatchObject$RootUser
) => StateType$RootUser;

type DispatchObject$RootUser = DispatchObject<
  ActionKeyType$RootUser,
  ApplicationUser | undefined
>;

type ActionHook$RootUser<T> = ActionHook<ActionKeyType$RootUser, T>;
