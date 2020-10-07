import React, { ChangeEvent } from "react";
import { useRecoilState, RecoilState } from "recoil";
import { InputAtom } from "../../recoil/atoms/registerAtoms";

interface CommonInputProps {
  stateKey: RecoilState<InputAtom<any>>;
  type?: string;
  placeholder: string;
  name: string;
  label: string;
  validator?: Function;
}

const CommonInput: React.FC<CommonInputProps> = ({
  stateKey,
  type,
  placeholder,
  name,
  label,
  validator,
}) => {
  const [inputObject, updateValue] = useRecoilState<InputAtom<any>>(stateKey);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = validator(event.target.value);
    updateValue({
      ...inputObject,
      value,
      isValid,
      touched: true,
      dirty: true,
      error: isValid ? "" : "Please enter a correct value",
    });
  };
  const onFocus = () => {
    updateValue({
      ...inputObject,
      touched: true,
    });
  };

  return (
    <>
      <style jsx>{`
        .form-control {
          display: block;
        }
        .form-control > label {
          font-size: 1.2rem;
          display: block;
        }
        .form-control > input {
          display: block;
          border: none;
          box-shadow: 0.2px 0.24px 0.1px #222;
          height: 1.4rem;
          font-size: 1.2rem;
        }
      `}</style>
      <div className="form-control">
        <label htmlFor={name}>{label}</label>
        <input
          {...{
            value: inputObject.value,
            onChange,
            onFocus,
            type,
            placeholder,
            name,
          }}
        />
        {inputObject.touched &&
          inputObject.dirty &&
          !inputObject.isValid &&
          inputObject.error}
      </div>
    </>
  );
};

CommonInput.defaultProps = {
  validator: () => true,
  type: "text",
};

export default CommonInput;
