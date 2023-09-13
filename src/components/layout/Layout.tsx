import React, { type ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from '../header/Header';
import getCartForStore from '../products/getCart';

const Layout = (): ReactElement => {
  getCartForStore();
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
