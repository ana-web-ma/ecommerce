import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import {
  SvgIcon,
  TextField,
  type TextFieldProps,
  type SvgIconProps,
  Input,
  InputBase,
} from '@mui/material';
import { type ReactElement } from 'react';

const StandardTextField = styled(Input)({
  // '& .MuiStandardInput-root': {
  //   color: '#red',
  //   borderColor: '#wheat',
  //   borderBottomColor: 'pink',
  // },
  // '& .MuiInput-root': {
  // color: 'pink !important',
  // backgroundColor: 'wheat !important',
  // borderBottom: '1px solid !important',
  // borderColor: 'pink !important',
  // borderBottom: '2px solid pink',
  // '&:before': {
  //   borderBottom: '2px solid pink',
  // },
  // '&:hover:not(.Mui-disabled, .Mui-error):before': {
  //   borderBottom: '2px solid green',
  // },
  // '& .Mui-focused:after': {
  //   borderBottom: '2px solid wheat',
  // },
  // padding: '10px 12px',
  //   '& .MuiInput-input': {
  //     color: 'red !important',
  //     borderWight: '1px !important',
  //     borderColor: 'green !important',
  //     borderBottom: '2px solid pink',
  //     '&:before': {
  //       borderBottom: '1px solid !important',
  //       color: '#red !important',
  //       borderWight: '1px !important',
  //       borderColor: 'green !important',
  //     },
  //   },
  //   '&:after': {
  //     borderBottom: '1px solid !important',
  //     color: '#red !important',
  //     borderWight: '1px !important',
  //     borderColor: 'green !important',
  //   },
  //   '&:hover': {
  //     color: '#red',
  //     borderWight: '1px !important',
  //     borderColor: 'green !important',
  //   },
  //   '&:focus': {
  //     color: '#red',
  //     borderColor: 'green !important',
  //   },
  // },
  // '& .MuiInput-underline:before': {
  //   borderBottomColor: 'pink !important',
  // },
  // '& .MuiInput-underline:after': {
  //   borderBottomColor: 'pink !important',
  // },
  // '& fieldset': {
  //   borderColor: 'green',
  //   borderBottom: '1px solid !important',
  // },
  // '& .MuiStandardInput-root': {
  //   '& fieldset': {
  //     borderColor: 'green',
  //   },
  //   '&:hover fieldset': {
  //     borderColor: 'purple',
  //   },
  //   '&.Mui-focused fieldset': {
  //     borderColor: 'yellow',
  //   },
  // },
  // '& .MuiInput-underline': {
  //   color: '#red',
  //   borderBottomColor: 'pink',
  //   '& fieldset': {
  //     borderColor: 'green',
  //   },
  //   '&:hover fieldset': {
  //     borderColor: 'purple',
  //   },
  //   '&.Mui-focused fieldset': {
  //     borderColor: 'yellow',
  //   },
  // },
  // '& .MuiInputBase-root': {
  //   color: '#red',
  //   borderBottomColor: 'pink',
  //   borderColor: 'green',
  //   '& fieldset': {
  //     borderColor: 'green',
  //   },
  //   '&:hover fieldset': {
  //     borderColor: 'purple',
  //   },
  //   '&.Mui-focused fieldset': {
  //     borderColor: 'yellow',
  //   },
  // },
  // '& .MuiOutlinedInput-root': {
  //   '& fieldset': {
  //     borderColor: 'wheat',
  //   },
  //   '&:hover fieldset': {
  //     borderColor: 'pink',
  //   },
  //   '&.Mui-focused fieldset': {
  //     borderColor: 'aqua',
  //   },
  // },
  // '& input:valid + fieldset': {
  //   borderColor: '#E0E3E7',
  //   borderWidth: 1,
  // },
  // '& input:invalid + fieldset': {
  //   borderColor: 'red',
  //   borderWidth: 1,
  // },
  // '& input:valid:focus + fieldset': {
  //   borderLeftWidth: 4,
  //   padding: '4px !important', // override inline-style
  // },
});

function StyledTextField(props: TextFieldProps): ReactElement {
  return (
    <>
      <StandardTextField
        // label={'}CSS validation {22}style'}
        required
        defaultValue={props.variant}
      />
    </>
  );
}

StyledTextField.propTypes = {};

export default StyledTextField;
