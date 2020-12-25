import { InitState$ModalState } from "./initialState";

const Reducer$ModalState: ReducerType$ModalState = (
  previousState: StateType$ModalState = InitState$ModalState,
  { type, payload }: DispatchObject$ModalState
) => {
  switch (type) {
    case "modal@@set-create-group-state":
      return {
        ...previousState,
        createGroupState:payload as boolean

      }
    default:
      return previousState;
  }
};

export { Reducer$ModalState };
