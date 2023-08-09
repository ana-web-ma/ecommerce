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
  type OutlinedInputProps,
} from '@mui/material';
import { type ReactElement } from 'react';

const StyledTextField = styled(OutlinedInput)({
  '& .MuiOutlinedInput-input': {
    color: '#282828',
    opacity: '0.2',
    fontWeight: '600',
  },
  '& .MuiOutlinedInput-root': {
    // '& input': {
    //   color: '#282828',
    //   opacity: '0.2',
    //   fontWeight: '600',
    // },
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
    // '&:hover': {
    //   input: {
    //     // color: '#282828',
    //     opacity: '0.1',
    //     fontWeight: '600',
    //   },
    //   fieldset: {
    //     borderColor: 'red',
    //     transition: '0.2s',
    //   },
    // },
  },
});

function OutlinedTextField(props: OutlinedInputProps): ReactElement {
  return <StyledTextField {...props} defaultValue="outlined" />;
}

OutlinedTextField.propTypes = {};

export default OutlinedTextField;
