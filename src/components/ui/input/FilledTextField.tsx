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
  type FilledTextFieldProps,
  type FilledInputProps,
  type InputBaseProps,
  FilledInput,
} from '@mui/material';
import { type ReactElement } from 'react';

const StyledTextField = styled(TextField)({
  '& .MuiFilledInput-root': {
    hiddenLabel: true,
    backgroundColor: '#28282805',
    '& input': {
      disableUnderline: true,
      color: '#28282820',
      opacity: '1',
      fontWeight: '600',
    },
    '& fieldset': {
      borderColor: '#99000040',
      transition: '0.2s',
    },
    '&.Mui-focused': {
      input: {
        opacity: '1',
        transition: '0.2s',
      },
      fieldset: {
        borderColor: '#00000040',
        transition: '0.2s',
        borderWidth: '1px',
      },
    },
    '&:hover': {
      fieldset: {
        borderColor: '#282828',
        transition: '0.2s',
      },
    },
  },
});

function FilledTextField(props: TextFieldProps): ReactElement {
  return (
    <StyledTextField
      {...props}
      variant="filled"
      defaultValue="filled"
      // color="error"
      hiddenLabel
    />
  );
}

FilledTextField.propTypes = {};

export default FilledTextField;
