import React from 'react';
import { type ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { useCustomer, useDataCustomer } from '../../helpers/hooks/Hooks';

function Welcome(): ReactElement {
  console.log(useDataCustomer());
  console.log(useCustomer());
  return (
    <Box textAlign={'center'}>
      <Typography variant="h1">Welcome Page</Typography>
    </Box>
  );
}

export default Welcome;
