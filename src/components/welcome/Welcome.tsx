import React from 'react';
import { type ReactElement } from 'react';
import { Box } from '@mui/material';
import DemoComponent from '../ui/demo/DemoComponent';

function Welcome(): ReactElement {
  return (
    <Box textAlign={'center'}>
      Welcome Page
      <DemoComponent />
    </Box>
  );
}

export default Welcome;
