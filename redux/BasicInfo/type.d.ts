type StateType$BasicInfoState = {
  isLoading: boolean;
  isLoggedIn: boolean;
  ajaxCallsInProgress: Array<string>;
  snackbarState: SnackbarObject;
};

type SnackbarObject = {
  open: boolean;
  message: string;
  type: "info";
};

type ActionKeyType$BasicInfo =
  | "basic@@update-loader"
  | "basic@@update-loggin-state"
  | "basic@@made-new-ajax-call"
  | "basic@@some-ajax-call-completed"
  | "basic@@set-snackbar"
  | "basic@@reset-snackbar";

type ReducerType$BasicInfo = (
  initialState: StateType$BasicInfoState,
  action: DispatchObject$BasicInfo
) => StateType$BasicInfoState;

type DispatchObject$BasicInfo = DispatchObject<
  ActionKeyType$BasicInfo,
  string | boolean | SnackbarObject
>;

type ActionHook$BasicType<T> = ActionHook<ActionKeyType$BasicInfo, T>;
