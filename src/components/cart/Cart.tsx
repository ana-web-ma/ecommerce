import React, { useEffect, type ReactElement } from 'react';
import { Box, Button } from '@mui/material';
import { type Cart } from '@commercetools/platform-sdk';
import CartTable from './CartTable';
import CartFooter from './CartFooter';
import CartTableToolbar from './CartTableToolbar';
import { getActiveCart } from '../../api/calls/carts/getActiveCart';
import { cartCache } from '../../api/cartCache';

export default function CartComponent(): ReactElement {
  const [cartData, setCartData] = React.useState<Cart | null>(null);

  const updateCart = (): void => {
    getActiveCart()
      .then((getActiveCartResp) => {
        console.log('getActiveCartResp', getActiveCartResp.body.lineItems);
        cartCache.id = getActiveCartResp.body.id;
        cartCache.version = getActiveCartResp.body.version;
        setCartData(getActiveCartResp.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box>
        <Button
          onClick={() => {
            updateCart();
          }}
        >
          Update Cart
        </Button>
        <CartTableToolbar />
        <CartTable lineItems={cartData?.lineItems} />
        <CartFooter />
      </Box>
    </>
  );
}
