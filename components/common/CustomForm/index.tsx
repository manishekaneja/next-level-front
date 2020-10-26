import { Button } from "@material-ui/core";
import React, { ChangeEvent, ReactNode, useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { snackbarAtom } from "../../../recoil/atoms/snackbarAtom";
import CommonInput from "../CommonInput";

type FieldObject = {
  name: string;
  label?: string;
  placeholder?: string;
  type: string;
  defaultValue?: string;
  validator: (
    value: string,
    otherValues?: Array<{ name: string; value: string }>
  ) => string;
  isValid?: boolean;
  isTouched?: boolean;
  error?: string;
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
  disableIfInvalid?: boolean;
}

const CustomForm: React.FC<CustomFormProps> = ({
  formIdentifier,
  submit,
  fields,
  onSubmit,
  footer,
  disableIfInvalid,
}) => {
  const [inputArray, updateArray] = useState(
    fields.map(
      (fieldObject) =>
        ({
          ...fieldObject,
          value: fieldObject.defaultValue || "",
          isValid: true,
          isTouched: false,
          error: "",
        } as InputFieldObject)
    )
  );

  const updateField = useCallback(
    (name: string, value: string) => {
      updateArray((pa) =>
        pa.map((previousObject) => ({
          ...previousObject,
          ...(previousObject.name === name
            ? {
                value,
              }
            : {}),
        }))
      );
    },
    [updateArray]
  );

  const fieldTouched = useCallback(
    (name: string) => {
      updateArray((pa) =>
        pa.map((previousObject) => ({
          ...previousObject,
          ...(previousObject.name === name
            ? {
                isTouched: true,
              }
            : {}),
        }))
      );
    },
    [updateArray]
  );

  const validateField = useCallback(
    (name: string) => {
      updateArray((pa) =>
        pa.map((previousObject) => ({
          ...previousObject,
          ...(previousObject.name === name
            ? {
                isValid: !previousObject.validator(
                  previousObject.value.trim(),
                  pa.map((input) => ({
                    name: input.name,
                    value: input.value,
                  }))
                ),
                error: previousObject.validator(
                  previousObject.value.trim(),
                  pa.map((input) => ({
                    name: input.name,
                    value: input.value,
                  }))
                ),
              }
            : {}),
        }))
      );
    },
    [updateArray]
  );
  const setSnackbarObject = useSetRecoilState(snackbarAtom);
  const _onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputArray.every((input) => input.isTouched && input.isValid)) {
      onSubmit(
        inputArray.map((input) => ({ name: input.name, value: input.value }))
      );
    } else {
      inputArray.forEach((input) => {
        if (!input.isTouched) {
          validateField(input.name);
        }
      });
      setSnackbarObject({
        open: true,
        message: "Please fill all values properly before Submitting.",
      });
    }
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
            validate: () => validateField(fieldObject.name),
            fieldTouched: () => fieldTouched(fieldObject.name),
            isValid: fieldObject.isValid,
            error: fieldObject.error,
          }}
        />
      ))}
      <br />
      <Button
        type="submit"
        disabled={
          disableIfInvalid &&
          !inputArray.every((input) => input.isTouched && input.isValid)
        }
        variant="contained"
        color="primary"
        fullWidth
      >
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
