type StateType$ModalState = {
  createGroupState: boolean;
};

type ActionKeyType$ModalState = "modal@@set-create-group-state";

type ReducerType$ModalState = (
  initialState: StateType$ModalState,
  action: DispatchObject$ModalState
) => StateType$ModalState;

type DispatchObject$ModalState = DispatchObject<
  ActionKeyType$ModalState,
  boolean
>;

type ActionHook$ModalState<T> = ActionHook<ActionKeyType$ModalState, T>;
