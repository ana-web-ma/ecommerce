import React, { type ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from '../header/Header';

const Layout = (): ReactElement => {
  return (
    <Container maxWidth="xl" sx={{ my: 2 }}>
      <Header></Header>
      <Outlet />
    </Container>
  );
};

export default Layout;
