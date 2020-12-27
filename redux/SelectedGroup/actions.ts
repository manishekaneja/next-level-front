import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useSelectedGroupSetter: ActionHook$SelectedGroup<Group> = () => {
  const dispatch = useDispatch();
  return useCallback(
    (value: Group) =>
      dispatch<DispatchObject<ActionKeyType$SelectedGroup, Group>>({
        type: "actv-grp|set-group",
        payload: value,
      }),
    [dispatch]
  );
};

const useSelectedGroupResetter: ActionHook$SelectedGroup<
  Partial<ApplicationUser>
> = () => {
  const dispatch = useDispatch();
  return useCallback(
    () =>
      dispatch<
        DispatchObject<ActionKeyType$SelectedGroup, Partial<ApplicationUser>>
      >({
        type: "actv-grp|reset-group",
        payload: null,
      }),
    [dispatch]
  );
};

export { useSelectedGroupResetter, useSelectedGroupSetter };
