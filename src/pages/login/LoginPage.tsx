import React from 'react';
import { type ReactElement } from 'react';
import { Box } from '@mui/material';
import Header from '../../components/header/Header';
import LoginForm from '../../components/login/Login';

function LoginPage(): ReactElement {
  return (
    <Box sx={{ my: 2 }}>
      <Header />
      <LoginForm></LoginForm>
    </Box>
  );
}

export default LoginPage;
