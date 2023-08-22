import { Box, Typography } from '@mui/material';
import React, { type ReactElement } from 'react';

const Cart = (): ReactElement => {
  return (
    <>
      <Box textAlign={'center'}>
        <Typography variant="h2">Shopping bag</Typography>
      </Box>
    </>
  );
};

export default Cart;
