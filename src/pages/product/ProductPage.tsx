import { Box, Typography } from '@mui/material';
import React, { type ReactElement } from 'react';
import { getProducts } from '../../api/calls/products/getProducts';
import Product from '../../components/product/Product';

const ProductPage = (): ReactElement => {
  return (
    <>
      <Product />
    </>
  );
};

export default ProductPage;
