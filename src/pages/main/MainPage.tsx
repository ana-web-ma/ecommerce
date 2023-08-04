import React from 'react';
import { type ReactElement } from 'react';
import { Box } from '@mui/material';
import Header from '../../components/header/Header';
import Welcome from './Welcome';

function MainPage(): ReactElement {
  return (
    <Box sx={{ my: 2 }}>
      <Header />
      <Welcome></Welcome>
    </Box>
  );
}

export default MainPage;
