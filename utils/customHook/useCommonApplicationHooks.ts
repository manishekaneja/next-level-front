import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { loaderAtom } from "../../recoil/atoms/loadingAtom";
import {
  snackbarAtom,
  SnackbarAtomType,
} from "../../recoil/atoms/snackbarAtom";
import { userAtom, UserAtomType } from "../../recoil/atoms/userAtom";

function useCommonApplicationHooks() {
  const router = useRouter();
  const [snackbar, setSnackbar] = useRecoilState<SnackbarAtomType>(
    snackbarAtom
  );
  const [loading, setLoader] = useRecoilState<boolean>(loaderAtom);
  const [user, setUser] = useRecoilState<UserAtomType>(userAtom);
  return {
    router,
    snackbar,
    setSnackbar,
    loading,
    setLoader,
    user,
    setUser,
  };
}

export default useCommonApplicationHooks;
