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
import { green } from '@mui/material/colors';

const StyledInput = styled(OutlinedInput)({
  '&.Mui-hover': {
    color: 'green',
    borderColor: 'green',
    '& .MuiOutlinedInput-input': { color: 'green' },
    '& fieldset': {
      // backgroundColor: 'red',
      color: 'green',
      borderColor: 'green',
      transition: '0.2s',
      borderWidth: '5px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      color: 'green',
      // color: 'yellow',
      // opacity: '0.1',
      // fontWeight: '900',
      borderColor: 'blue',
      // backgroundColor: 'yellow',
    },
  },
  '&.Mui-focused': {
    color: 'green',

    // borderColor: 'green',
    '& fieldset': {
      color: 'green',

      // backgroundColor: 'red',
      // borderColor: 'green',
      transition: '0.2s',
      // borderWidth: '2px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      color: 'green',

      borderWidth: '1px',
      borderColor: 'purple',
    },
  },
  '& fieldset': {
    color: 'green',

    // backgroundColor: 'red',
    // borderColor: 'red',
    // transition: '0.2s',
    // borderWidth: '1px',
  },
  // '& .MuiOutlinedInput-notchedOutline': {
  //   // color: 'yellow',
  //   // opacity: '0.1',
  //   // fontWeight: '900',
  //   borderColor: 'blue',
  //   // backgroundColor: 'yellow',
  // },
  '& .MuiOutlinedInput-input': {
    // color: 'green',
    opacity: '0.2',
    fontWeight: '600',
    borderColor: 'red',
    backgroundColor: 'red',
  },
  // '& .MuiOutlinedInput-root': {
  //   borderColor: 'red',
  //   backgroundColor: 'red',
  //   transition: '0.2s',

  //   // '& input': {
  //   //   color: '#282828',
  //   //   opacity: '0.2',
  //   //   fontWeight: '600',
  //   // },
  //   '& fieldset': {
  //     backgroundColor: 'red',

  //     borderColor: '#00000040',
  //     transition: '0.2s',
  //   },
  //   '&.Mui-focused': {
  //     borderColor: 'red',
  //     backgroundColor: 'red',

  //     input: {
  //       borderColor: 'red',
  //       backgroundColor: 'red',

  //       opacity: '1',
  //       transition: '0.2s',
  //     },
  //     fieldset: {
  //       borderColor: 'red',
  //       backgroundColor: 'red',

  //       // borderColor: '#00000040',
  //       transition: '0.2s',
  //       borderWidth: '1px',
  //     },
  //   },
  //   // '&:hover': {
  //   //   input: {
  //   //     // color: '#282828',
  //   //     opacity: '0.1',
  //   //     fontWeight: '600',
  //   //   },
  //   //   fieldset: {
  //   //     borderColor: 'red',
  //   //     transition: '0.2s',
  //   //   },
  //   // },
  // },
});
const StyledTextField = styled(TextField)({
  '& .MuiFilledInput-root': {
    hiddenLabel: true,
    backgroundColor: '#28282805',
    fieldset: {
      borderColor: 'red',
      transition: '0.2s',
      borderWidth: '1px',
    },
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

function OutlinedTextField(props: TextFieldProps): ReactElement {
  return (
    // <StyledTextField {...props}>
    //   <StyledInput />
    // </StyledTextField>
    <StyledInput defaultValue="input" />
  );
}

OutlinedTextField.propTypes = {};

export default OutlinedTextField;
