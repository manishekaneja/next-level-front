import { atom, RecoilState } from "recoil";

interface InputAtom<T> {
  value: T;
  touched: boolean;
  dirty: boolean;
  isValid: boolean;
  error: string;
}

const usernameState: RecoilState<InputAtom<string>> = atom({
  key: "register/username",
  default: {
    value: "",
    touched: false,
    dirty: false,
    isValid: false,
    error: "",
  },
});
const passwordState: RecoilState<InputAtom<string>> = atom({
  key: "register/password",
  default: {
    value: "",
    touched: false,
    dirty: false,
    isValid: false,
    error: "",
  },
});

export { usernameState, passwordState };
export type { InputAtom };
