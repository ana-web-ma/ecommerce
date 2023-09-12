import React, { type ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from '../header/Header';

const Layout = (): ReactElement => {
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
          padding: 0,
          height: '100%',
          width: '100%',
          display: 'flex',
          flexGrow: '1',
          flexDirection: 'column',
          justifyContent: 'start',
        }}
      >
        <Outlet />
      </Container>
    </Container>
  );
};

export default Layout;
