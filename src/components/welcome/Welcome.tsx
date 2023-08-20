import React from 'react';
import { type ReactElement } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Welcome(): ReactElement {
  const navigate = useNavigate();
  return (
    <Box textAlign={'center'}>
      <Typography variant="h1">Welcome Page</Typography>
      <Typography mt={3} variant="h4">
        <Link
          onClick={(): void => {
            navigate('/login');
          }}
        >
          Log In
        </Link>
      </Typography>
      <Typography mt={3} variant="h4">
        <Link
          onClick={(): void => {
            navigate('/register');
          }}
        >
          Sign In
        </Link>
      </Typography>
    </Box>
  );
}

export default Welcome;
