import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useRootUserSetter: ActionHook$RootUser<ApplicationUser> = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: ApplicationUser) =>
      dispatch<DispatchObject<ActionKeyType$RootUser, ApplicationUser>>({
        type: "root-user|set-user",
        payload: value,
      }),
    [dispatch]
  );
};

const useRootUserUpdater: ActionHook$RootUser<
  Partial<ApplicationUser>
> = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: ApplicationUser) =>
      dispatch<
        DispatchObject<ActionKeyType$RootUser, Partial<ApplicationUser>>
      >({
        type: "root-user|update-user",
        payload: value,
      }),
    [dispatch]
  );
};

const useRootUserResetter: ActionHook$RootUser<undefined> = () => {
  const dispatch = useDispatch();
  return useCallback(
    () =>
      dispatch<DispatchObject<ActionKeyType$RootUser, undefined>>({
        type: "root-user|reset-user",
        payload: undefined,
      }),
    [dispatch]
  );
};
export { useRootUserResetter, useRootUserSetter,useRootUserUpdater };
