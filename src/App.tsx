import React from 'react';
import { type ReactElement } from 'react';
import { Container } from '@mui/material';
import RegisterPage from './pages/register/RegisterPage';

function App(): ReactElement {
  return (
    <Container maxWidth="xl">
      <RegisterPage></RegisterPage>
    </Container>
  );
}

export default App;
