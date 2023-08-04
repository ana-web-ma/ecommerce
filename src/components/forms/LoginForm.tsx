import React from 'react';
import { type ReactElement } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import TextFieldComponent from './common/TextField';

function LoginForm(): ReactElement {
  function setEmail(value: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={2}
      boxShadow={'5px 5px 10px #ccc'}
      padding={10}
      borderRadius={5}
    >
      <Typography variant="h2">Welcome</Typography>
      <Typography variant="body1">Log In your account</Typography>
      <TextFieldComponent label="Email" placeholder="Enter your email" />
      <TextFieldComponent label="Password" placeholder="Enter your password" />
      <Button type="submit" className="button-test" variant="contained">
        Login
      </Button>
      <Typography variant="body1">
        Dont have any acount?
        <span
          style={{ color: '#1900D5', marginLeft: '10px', cursor: 'pointer' }}
        >
          Sign Up
        </span>
      </Typography>
    </Stack>
  );
}

export default LoginForm;
