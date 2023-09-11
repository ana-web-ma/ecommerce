import React, { type ReactElement } from 'react';
import { Box } from '@mui/material';
import CartTable from './CartTable';
import CartFooter from './CartFooter';
import CartTableToolbar from './CartTableToolbar';

export default function Cart(): ReactElement {
  return (
    <>
      <Box>
        <CartTableToolbar />
        <CartTable />
        <CartFooter />
      </Box>
    </>
  );
}
