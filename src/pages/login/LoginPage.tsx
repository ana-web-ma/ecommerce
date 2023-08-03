import { type ReactElement } from 'react';
import { Box } from '@mui/material';
import LoginForm from '../../components/forms/LoginForm';

function LoginPage(): ReactElement {
  return (
    <Box sx={{ my: 2 }}>
      <LoginForm></LoginForm>
    </Box>
  );
}

export default LoginPage;
