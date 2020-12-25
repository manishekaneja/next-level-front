import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  useLoaderStateSetter,
  useSnackbarResetter,
  useSnackbarSetter,
} from "../../redux/BasicInfo/actions";

function useCommonApplicationHooks() {
  const router = useRouter();
  const {
    basicInfo: { snackbarState, isLoading, isLoggedIn },
    rootUser,
  } = useSelector((state: RootState) => state);
  const resetSnackbar = useSnackbarResetter();
  const setSnackbar = useSnackbarSetter();
  const setLoaderState = useLoaderStateSetter();
  return {
    router,
    rootUser,
    snackbar: snackbarState,
    isLoading,
    isLoggedIn,
    resetSnackbar,
    setSnackbar,
    setLoaderState,
  };
}

export default useCommonApplicationHooks;
