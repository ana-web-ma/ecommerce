import React from 'react';
import { type ReactElement } from 'react';
import { Box } from '@mui/material';
import Header from '../../components/header/Header';
import RegisterForm from '../../components/register/Register';

function RegisterPage(): ReactElement {
  return (
    <Box sx={{ my: 2 }}>
      <Header />
      <RegisterForm></RegisterForm>
    </Box>
  );
}

export default RegisterPage;
