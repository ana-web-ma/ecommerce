import React from 'react';
import { type ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import DemoComponent from '../ui/demo/DemoComponent';

function Welcome(): ReactElement {
  return (
    <Box textAlign={'center'}>
      <Typography variant="h1">Welcome Page</Typography>
    </Box>
  );
}

export default Welcome;
