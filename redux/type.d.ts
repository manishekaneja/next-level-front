type RootState = {
  rootUser: StateType$RootUser;
  basicInfo: StateType$BasicInfoState;
  modalState: StateType$ModalState;
  selectedGroup: StateType$SelectedGroup;
};

type DispatchObject<T, V> = {
  type: T;
  payload: V;
};

type ActionHook<K, T> = () => (
  value: T | Partial<T>,
  ...args: Array<any>
) => DispatchObject<K, T>;
