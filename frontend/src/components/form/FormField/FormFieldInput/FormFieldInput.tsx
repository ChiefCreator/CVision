import FormField from "../FormField";
import EditInput from "@/components/input/EditInput/EditInput";

import type { FormFieldProps } from "../FormField";
import type { EditInputProps } from "@/components/input/EditInput/EditInput";

interface FormFieldEditInputProps extends Omit<FormFieldProps, "children"> {
  inputProps: EditInputProps;
}

export default function FormFieldEditInput({ inputProps, ...formFieldProps }: FormFieldEditInputProps) {

  return (
    <FormField {...formFieldProps}>
      <EditInput {...inputProps} />
    </FormField>
  );
}