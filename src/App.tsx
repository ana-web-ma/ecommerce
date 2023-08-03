import { type ReactElement } from 'react';
import { Container } from '@mui/material';
import LoginPage from './pages/login/LoginPage';

function App(): ReactElement {
  return (
    <Container maxWidth="xl">
      <LoginPage></LoginPage>
    </Container>
  );
}

export default App;
