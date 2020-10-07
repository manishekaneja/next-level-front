import React, { ChangeEvent, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { registerFormValues } from "../../recoil/selectors/registerSelectors";
import CommonInput from "../common/CommonInput";
import { usernameState, passwordState } from "../../recoil/atoms/registerAtoms";
import { useLoginMutation } from "../../graphql-tsx-gen/graphql";

interface RegisterFormProps {}
const RegsiterForm: React.FC<RegisterFormProps> = () => {
  const [, register] = useLoginMutation();
  const registerValue = useRecoilValue(registerFormValues);
  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const {
        data: { login },
        error,
      } = await register(registerValue);
      console.log(login);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form {...{ onSubmit }}>
      <CommonInput
        {...{
          label: "Username",
          name: "username",
          placeholder: "Enter Username",
          type: "text",
          stateKey: usernameState,
        }}
      />
      <CommonInput
        {...{
          label: "Password",
          name: "password",
          placeholder: "Enter Password",
          type: "password",
          stateKey: passwordState,
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegsiterForm;
