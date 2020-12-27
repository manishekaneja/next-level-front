type StateType$SelectedGroup = Group & {};

type ActionKeyType$SelectedGroup =
  | "actv-grp|set-group"
  | "actv-grp|reset-group";

type ReducerType$SelectedGroup = (
  initialState: StateType$SelectedGroup,
  action: DispatchObject$SelectedGroup
) => StateType$SelectedGroup;

type DispatchObject$SelectedGroup = DispatchObject<
  ActionKeyType$SelectedGroup,
  Group | null
>;

type ActionHook$SelectedGroup<T> = ActionHook<ActionKeyType$SelectedGroup, T>;
