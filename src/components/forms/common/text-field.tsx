import TextField, {
  type TextFieldProps,
} from "@mui/material/TextField/TextField";
import { type Variant } from "@mui/material/styles/createTypography";
import { type ReactElement } from "react";

export default function TextFieldComponent(
  props: {
    variant?: Variant;
  } & Omit<TextFieldProps, "variant">,
): ReactElement {
  return (
    <TextField
      fullWidth={true}
      margin="normal"
      label={props.label}
      variant="outlined"
      placeholder={props.placeholder}
    />
  );
}
