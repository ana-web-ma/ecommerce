import React, { type ReactElement } from 'react';
import { Stack } from '@mui/material';
import Products from '../../components/products/Products';

const Catalog = (): ReactElement => {
  return (
    <>
      <Stack alignItems="center" gap={3}>
        <Products />
      </Stack>
    </>
  );
};

export default Catalog;
