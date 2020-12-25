import _ from "lodash";
import { InitState$BasicInfo } from "./initialState";

const Reducer$BasicInfo: ReducerType$BasicInfo = (
  previousState: StateType$BasicInfoState = InitState$BasicInfo,
  { type, payload }: DispatchObject$BasicInfo
) => {
  switch (type) {
    case "basic@@made-new-ajax-call":
      return {
        ...previousState,
        ajaxCallsInProgress: _.concat(
          previousState.ajaxCallsInProgress,
          payload as string
        ),
      };
    case "basic@@some-ajax-call-completed":
      return {
        ...previousState,
        ajaxCallsInProgress: _.filter(
          previousState.ajaxCallsInProgress,
          (value: string) => value !== (payload as string)
        ),
      };
    case "basic@@update-loader":
      return {
        ...previousState,
        isLoading: payload as boolean,
      };
    case "basic@@update-loggin-state":
      return {
        ...previousState,
        isLoggedIn: payload as boolean,
      };

    case "basic@@set-snackbar":
      return {
        ...previousState,
        snackbarState: payload as SnackbarObject,
      };

    case "basic@@reset-snackbar":
      return {
        ...previousState,
        snackbarState: {
          message: "",
          open: false,
          type: "info",
        },
      };
    default:
      return previousState;
  }
};

export { Reducer$BasicInfo };
