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

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& input': {
      color: '#282828',
      opacity: '0.2',
      fontWeight: '600',
    },
    '& fieldset': {
      borderColor: '#00000040',
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

function OutlinedTextField(props: TextFieldProps): ReactElement {
  return <StyledTextField {...props} defaultValue={props.variant} />;
}

OutlinedTextField.propTypes = {};

export default OutlinedTextField;
