import React, { type ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../header/Header';

const Layout = (): ReactElement => {
  return (
    <Box sx={{ my: 2 }}>
      <Header></Header>
      <Outlet />
    </Box>
  );
};

export default Layout;
