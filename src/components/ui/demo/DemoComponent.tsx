import React from 'react';
import {
  SvgIcon,
  TextField,
  Typography,
  type SvgIconProps,
} from '@mui/material';
import { type ReactElement } from 'react';

function DemoComponent(props: SvgIconProps): ReactElement {
  return <Typography variant="h2">Demo</Typography>;
}

DemoComponent.propTypes = {};

export default DemoComponent;
