import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import {
  SvgIcon,
  TextField,
  type TextFieldProps,
  type SvgIconProps,
  Input,
  InputBase,
  OutlinedInput,
} from '@mui/material';
import { type ReactElement } from 'react';

const StyledTextField = styled(TextField)({});

function StandardTextField(props: TextFieldProps): ReactElement {
  return <StyledTextField {...props} defaultValue={props.variant} />;
}

StandardTextField.propTypes = {};

export default StandardTextField;
