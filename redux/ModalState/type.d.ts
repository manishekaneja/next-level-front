type StateType$ModalState = {
  createGroupState: boolean;
  createTransactionState:boolean;
};

type ActionKeyType$ModalState = "modal@@set-create-group-state" | "modal@@set-create-transaction-state";

type ReducerType$ModalState = (
  initialState: StateType$ModalState,
  action: DispatchObject$ModalState
) => StateType$ModalState;

type DispatchObject$ModalState = DispatchObject<
  ActionKeyType$ModalState,
  boolean
>;

type ActionHook$ModalState<T> = ActionHook<ActionKeyType$ModalState, T>;
