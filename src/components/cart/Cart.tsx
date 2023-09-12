import React, { type ReactElement } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { type Cart } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import CartTable from './CartTable';
import CartFooter from './CartFooter';
import CartTableToolbar from './CartTableToolbar';
import { getActiveCart } from '../../api/calls/carts/getActiveCart';
import { cartCache } from '../../api/cartCache';

export default function CartComponent(): ReactElement {
  const [cartData, setCartData] = React.useState<Cart | null>(null);

  const navigate = useNavigate();

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

  return cartData !== null ? (
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
        <CartTable lineItems={cartData?.lineItems} setCartData={setCartData} />
        <CartFooter totalPrice={cartData?.totalPrice} />
      </Box>
    </>
  ) : (
    <Box textAlign="center">
      <Typography>Your cart is empty</Typography>
      <Link
        onClick={(): void => {
          navigate('/catalog');
        }}
      >
        Back to shopping
      </Link>
    </Box>
  );
}
