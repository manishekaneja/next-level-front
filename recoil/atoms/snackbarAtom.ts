import { atom, RecoilState } from "recoil";

interface SnackbarAtomType {
  open: boolean;
  message: string;
}

const snackbarAtom: RecoilState<SnackbarAtomType> = atom({
  key: "snackbar",
  default: {
    open: false,
    message: "",
  },
});

export { snackbarAtom };
export type { SnackbarAtomType };
