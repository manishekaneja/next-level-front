import InitState$SelectedGroup from "./initialState";

const Reducer$SelectedGroup: ReducerType$SelectedGroup = (
  previousState: StateType$SelectedGroup = InitState$SelectedGroup,
  { type, payload }: DispatchObject$SelectedGroup
) => {
  switch (type) {
    case "actv-grp|set-group":
      return {
        ...previousState,
        ...payload,
      };
    case "actv-grp|reset-group":
      return null;
    default:
      return previousState;
  }
};

export { Reducer$SelectedGroup };
