import React from 'react';
import {
  SvgIcon,
  TextField,
  Typography,
  type SvgIconProps,
} from '@mui/material';
import { type ReactElement } from 'react';
import StandardTextField from '../input/StandardTextField';
import FilledTextField from '../input/FilledTextField';
import OutlinedTextField from '../input/OutlinedTextField';

function DemoComponent(): ReactElement {
  return (
    <>
      <Typography variant="h2">Demo</Typography>
      {/* <StandardTextField variant="standard" />
      <FilledTextField />
      <OutlinedTextField /> */}
      <TextField
        hiddenLabel
        variant="outlined"
        placeholder="filled"
      ></TextField>
      <TextField
        hiddenLabel
        variant="outlined"
        placeholder="filled"
        // color="warning"
        // disabled
        error
        helperText="Incorrect entry."
      ></TextField>
    </>
  );
}

DemoComponent.propTypes = {};

export default DemoComponent;
