import { type ReactElement } from 'react';
import { Box } from '@mui/material';
import RegisterForm from '../../components/forms/RegisterForm';

function RegisterPage(): ReactElement {
  return (
    <Box sx={{ my: 2 }}>
      <RegisterForm></RegisterForm>
    </Box>
  );
}

export default RegisterPage;
