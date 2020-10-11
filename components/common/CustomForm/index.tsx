import React, { ChangeEvent, ReactNode, useState, useCallback } from "react";
import CommonInput from "../CommonInput";
import { Button } from "@material-ui/core";

type FieldObject = {
  name: string;
  label?: string;
  placeholder?: string;
  type: string;
  defaultValue?: string;
};
type InputFieldObject = {
  value: string;
} & FieldObject;

interface CustomFormProps {
  fields: Array<FieldObject>;
  submit?: ReactNode;
  formIdentifier: string;
  onSubmit: Function;
  footer?: ReactNode;
}

const CustomForm: React.FC<CustomFormProps> = ({
  formIdentifier,
  submit,
  fields,
  onSubmit,
  footer,
}) => {
  const [inputArray, updateArray] = useState(
    fields.map(
      (fieldObject) =>
        ({
          ...fieldObject,
          value: fieldObject.defaultValue || "",
        } as InputFieldObject)
    )
  );

  const updateField = useCallback(
    (name, value) => {
      updateArray((pa) =>
        pa.map((previousObject) => ({
          ...previousObject,
          value: previousObject.name === name ? value : previousObject.value,
        }))
      );
    },
    [updateArray]
  );

  const _onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputArray);
  };

  const formIdef = formIdentifier.split(" ").join("_");

  return (
    <form {...{ onSubmit: _onSubmit }} noValidate>
      {inputArray.map((fieldObject, index) => (
        <CommonInput
          key={index}
          {...{
            label: fieldObject.label,
            name: formIdef + "/" + fieldObject.name,
            placeholder: fieldObject.placeholder,
            type: fieldObject.type,
            value: fieldObject.value,
            defaultValue: "",
            update: (value: string) => updateField(fieldObject.name, value),
          }}
        />
      ))}
      <br />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {submit ? submit : "Submit"}
      </Button>
      {footer}
    </form>
  );
};
CustomForm.defaultProps = {
  footer: null,
};

export default CustomForm;
