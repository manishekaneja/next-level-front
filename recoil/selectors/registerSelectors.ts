import { selector } from "recoil";
import { usernameState, passwordState } from "../atoms/registerAtoms";

const registerFormValues = selector({
  key: "registerForm",
  get: ({ get }) => {
    return {
      username: get(usernameState).value,
      password: get(passwordState).value,
    };
  },
});

export { registerFormValues };
