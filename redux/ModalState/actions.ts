import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useCreateGroupStateSetter: ActionHook$ModalState<boolean> = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: boolean) =>
      dispatch<DispatchObject<ActionKeyType$ModalState, boolean>>({
        type: "modal@@set-create-group-state",
        payload: value,
      }),
    [dispatch]
  );
};

export {
  useCreateGroupStateSetter
};
