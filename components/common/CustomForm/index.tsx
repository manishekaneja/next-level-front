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
}

const CustomForm: React.FC<CustomFormProps> = ({
  formIdentifier,
  submit,
  fields,
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

  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("On Submit", inputArray);
  };

  const formIdef = formIdentifier.split(" ").join("_");

  return (
    <form {...{ onSubmit }} noValidate>
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
      {submit ? (
        <Button variant="text">{submit}</Button>
      ) : (
        <Button type="submit" variant="outlined">
          Submit Form
        </Button>
      )}
    </form>
  );
};

export default CustomForm;
