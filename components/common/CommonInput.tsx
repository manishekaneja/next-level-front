import { FormControl, TextField } from "@material-ui/core";
import React, { ChangeEvent } from "react";
interface CommonInputProps {
  type?: string;
  placeholder: string;
  name: string;
  label: string;
  validate?: Function;
  update?: Function;
  value: string;
  defaultValue?: string;
  hint?: string;
  disabled?: boolean;
  isValid?: boolean;
  fieldTouched?: Function;
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
  validate,
  isValid,
  error,
  fieldTouched,
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    update(value);
  };
  const onBlur = () => {
    validate();
  };
  const onFocus = () => {
    fieldTouched();
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
          onBlur={onBlur}
          onFocus={onFocus}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          FormHelperTextProps={isValid ? {} : { error: !isValid }}
        />
      </FormControl>
    </>
  );
};

CommonInput.defaultProps = {
  validate: () => "",
  type: "text",
};

export default CommonInput;
