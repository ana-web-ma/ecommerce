import React from 'react';
import { type ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../helpers/hooks/Hooks';

function Welcome(): ReactElement {
  return (
    <Box textAlign={'center'}>
      <Typography variant="h1">Welcome Page</Typography>
      <Typography variant="h4">
        {
          <h4>
            {useAppSelector((state) => state.customerReducer.customer.id)}
          </h4>
        }
      </Typography>
    </Box>
  );
}

export default Welcome;
