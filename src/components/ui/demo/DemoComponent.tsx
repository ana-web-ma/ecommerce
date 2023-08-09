import React from 'react';
import {
  SvgIcon,
  TextField,
  Typography,
  type SvgIconProps,
} from '@mui/material';
import { type ReactElement } from 'react';
import StyledTextField from '../StyledTextField';

function DemoComponent(props: SvgIconProps): ReactElement {
  return (
    <>
      <Typography variant="h2">Demo</Typography>
      <StyledTextField variant="standard" color="warning"></StyledTextField>
      <StyledTextField variant="filled" color="warning"></StyledTextField>
      <StyledTextField variant="outlined" color="warning"></StyledTextField>
    </>
  );
}

DemoComponent.propTypes = {};

export default DemoComponent;
