import React, { type ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from '../header/Header';
import {
  useAppDispatch,
  useIsToken,
  useNumberOfPurchases,
} from '../../helpers/hooks/Hooks';
import { getActiveCart } from '../../api/calls/carts/getActiveCart';
import {
  addNumberOfPurchases,
  addToCart,
  resetNumberOfPurchases,
  setCart,
  setCartIdAndVersion,
} from '../../store/reducers/ShoppingSlice';

const Layout = (): ReactElement => {
  const dispatch = useAppDispatch();

  if (useIsToken() && useNumberOfPurchases() === 0) {
    getActiveCart()
      .then(async (getActiveCartResp) => {
        dispatch(setCart(getActiveCartResp.body));
        dispatch(
          setCartIdAndVersion({
            id: getActiveCartResp.body.id,
            version: getActiveCartResp.body.version,
          }),
        );
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
    <Container
      maxWidth="xl"
      sx={{
        py: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Header />
      <Container
        sx={{
          padding: '0',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexGrow: '1',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Container>
    </Container>
  );
};

export default Layout;
