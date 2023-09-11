import React from 'react';
import { type ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useIsToken } from '../../helpers/hooks/Hooks';
import { getActiveCart } from '../../api/calls/carts/getActiveCart';
import {
  addNumberOfPurchases,
  addToCart,
  resetNumberOfPurchases,
} from '../../store/reducers/ShoppingSlice';

function Welcome(): ReactElement {
  const dispatch = useAppDispatch();
  if (useIsToken()) {
    getActiveCart()
      .then(async (getActiveCartResp) => {
        console.log('getActiveCartResp', getActiveCartResp);
        dispatch(resetNumberOfPurchases());
        getActiveCartResp.body.lineItems.forEach((item) => {
          dispatch(addNumberOfPurchases(item.quantity));
          if (item.variant.key !== undefined)
            dispatch(addToCart(item.variant.key));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box textAlign={'center'}>
      <Typography variant="h1">Welcome Page</Typography>
    </Box>
  );
}

export default Welcome;
