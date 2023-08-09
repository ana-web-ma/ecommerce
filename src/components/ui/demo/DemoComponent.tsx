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
      <StyledTextField variant="standard"></StyledTextField>
      <StyledTextField variant="filled"></StyledTextField>
      <StyledTextField variant="outlined"></StyledTextField>
    </>
  );
}

DemoComponent.propTypes = {};

export default DemoComponent;
