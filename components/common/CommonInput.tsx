import React, { ChangeEvent } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

interface CommonInputProps {
  type?: string;
  placeholder: string;
  name: string;
  label: string;
  validator?: Function;
  update?: Function;
  value: string;
  defaultValue?: string;
  hint?: string;
  disabled?: boolean;
  isValid?: boolean;
  error?: string;
}

const CommonInput: React.FC<CommonInputProps> = ({
  type,
  placeholder,
  value,
  disabled,
  update,
  name,
  label,
  hint,
  validator,
  isValid,
  error,
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // const isValid = validator(event.target.value);
    update(value);
  };
  const onFocus = () => {
    // updateValue({
    //   ...inputObject,
    //   touched: true,
    // });
  };

  return (
    <>
      <div className="form-control">
        <FormControl>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Input
            {...{
              error: !isValid,
              id: name,
              value,
              onChange,
              onFocus,
              type,
              disabled,
              placeholder,
              name,
            }}
          />
          {hint && (
            <FormHelperText error={!isValid}>
              {isValid ? hint : error}
            </FormHelperText>
          )}
        </FormControl>
        {/* {inputObject.touched &&
          inputObject.dirty &&
          !inputObject.isValid &&
          inputObject.error} */}
      </div>
    </>
  );
};

CommonInput.defaultProps = {
  validator: () => true,
  type: "text",
};

export default CommonInput;
