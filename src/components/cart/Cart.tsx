import React, { useEffect, type ReactElement } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CartTable from './CartTable';
import CartTableToolbar from './CartTableToolbar';
import { getActiveCart } from '../../api/calls/carts/getActiveCart';
import { useAppDispatch, useCart } from '../../helpers/hooks/Hooks';
import {
  setCart,
  setCartIdAndVersion,
} from '../../store/reducers/ShoppingSlice';
import { tokenCache } from '../../api/tokenCache';

export default function CartComponent(): ReactElement {
  const cartData = useCart();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const updateCart = (): void => {
    if (tokenCache.get().token !== '') {
      getActiveCart()
        .then((getActiveCartResp) => {
          dispatch(
            setCartIdAndVersion({
              id: getActiveCartResp.body.id,
              version: getActiveCartResp.body.version,
            }),
          );
          dispatch(setCart(getActiveCartResp.body));
        })
        .catch((err) => {
          console.log('log', err);
        });
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  return cartData !== null && cartData?.lineItems.length > 0 ? (
    <>
      <Box>
        <CartTableToolbar
          totalPrice={cartData?.totalPrice}
          lineItems={cartData?.lineItems}
        />
        <CartTable lineItems={cartData?.lineItems} />
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
