const InitState$BasicInfo: StateType$BasicInfoState = {
  ajaxCallsInProgress: [],
  isLoggedIn: false,
  isLoading: false,
  snackbarState: {
    message: "",
    open: false,
    type: "info",
  },
};

export { InitState$BasicInfo };
