import React, { ChangeEvent } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
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
      <FormControl className={`mb_22`} fullWidth>
        <TextField
          variant="outlined"
          label={label}
          InputLabelProps={{ shrink: true }}
          helperText={isValid ? (hint ? hint : "") : error}
          error={!isValid}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          FormHelperTextProps={isValid ? {} : { error: !isValid }}
        />
      </FormControl>
      {/* {inputObject.touched &&
          inputObject.dirty &&
          !inputObject.isValid &&
          inputObject.error} */}
    </>
  );
};

CommonInput.defaultProps = {
  validator: () => true,
  type: "text",
};

export default CommonInput;
