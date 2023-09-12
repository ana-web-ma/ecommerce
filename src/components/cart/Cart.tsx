import React, { useEffect, type ReactElement } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { type Cart } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import CartTable from './CartTable';
import CartTableToolbar from './CartTableToolbar';
import { getActiveCart } from '../../api/calls/carts/getActiveCart';
import { cartCache } from '../../api/cartCache';

export default function CartComponent(): ReactElement {
  const [cartData, setCartData] = React.useState<Cart | null>(null);

  const navigate = useNavigate();

  const updateCart = (): void => {
    getActiveCart()
      .then((getActiveCartResp) => {
        cartCache.id = getActiveCartResp.body.id;
        cartCache.version = getActiveCartResp.body.version;
        setCartData(getActiveCartResp.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateCart();
  }, []);

  return cartData !== null && cartData?.lineItems.length > 0 ? (
    <>
      <Box>
        <CartTableToolbar
          totalPrice={cartData?.totalPrice}
          setCartData={setCartData}
          lineItems={cartData?.lineItems}
        />
        <CartTable lineItems={cartData?.lineItems} setCartData={setCartData} />
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
