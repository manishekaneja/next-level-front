import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useLoaderStateSetter: ActionHook$BasicType<boolean> = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: boolean) =>
      dispatch<DispatchObject<ActionKeyType$BasicInfo, boolean>>({
        type: "basic@@update-loader",
        payload: value,
      }),
    [dispatch]
  );
};

const useLoadingStateSetter: ActionHook$BasicType<boolean> = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: boolean) =>
      dispatch<DispatchObject<ActionKeyType$BasicInfo, boolean>>({
        type: "basic@@update-loggin-state",
        payload: value,
      }),
    [dispatch]
  );
};

const useRegisterNewCall: ActionHook$BasicType<string> = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: string) =>
      dispatch<DispatchObject<ActionKeyType$BasicInfo, string>>({
        type: "basic@@made-new-ajax-call",
        payload: value,
      }),
    [dispatch]
  );
};

const useUnregisterNewCall: ActionHook$BasicType<string> = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: string) =>
      dispatch<DispatchObject<ActionKeyType$BasicInfo, string>>({
        type: "basic@@some-ajax-call-completed",
        payload: value,
      }),
    [dispatch]
  );
};

const useSnackbarSetter: ActionHook$BasicType<SnackbarObject> = () => {
  const dispatch = useDispatch();
  return useCallback(
    ({ message }: Pick<SnackbarObject, "message">, type?: "info") =>
      dispatch<DispatchObject<ActionKeyType$BasicInfo, SnackbarObject>>({
        type: "basic@@set-snackbar",
        payload: {
          message,
          open: true,
          type: type || "info",
        } as SnackbarObject,
      }),
    [dispatch]
  );
};

const useSnackbarResetter: ActionHook$BasicType<null> = () => {
  const dispatch = useDispatch();
  return useCallback(
    () =>
      dispatch<DispatchObject<ActionKeyType$BasicInfo, null>>({
        type: "basic@@reset-snackbar",
        payload: null,
      }),
    [dispatch]
  );
};

export {
  useLoaderStateSetter,
  useLoadingStateSetter,
  useRegisterNewCall,
  useUnregisterNewCall,
  useSnackbarSetter,
  useSnackbarResetter,
};
