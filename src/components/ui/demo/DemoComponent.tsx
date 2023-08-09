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

function DemoComponent(props: SvgIconProps): ReactElement {
  return (
    <>
      <Typography variant="h2">Demo</Typography>
      <StandardTextField variant="outlined" color="warning"></StandardTextField>
      <FilledTextField variant="standard" color="warning"></FilledTextField>
      <OutlinedTextField variant="filled" color="warning"></OutlinedTextField>
    </>
  );
}

DemoComponent.propTypes = {};

export default DemoComponent;
