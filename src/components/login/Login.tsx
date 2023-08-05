import type React from 'react';
import { useState, type ReactElement } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';

function LoginForm(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <>
      <Stack mt={15} justifyContent="center" alignItems="center">
        <form
          onSubmit={handleSubmit}
          style={{ width: '90%', maxWidth: '640px' }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}
            boxShadow={'5px 5px 10px #ccc'}
            padding={'15% 10%'}
            borderRadius={5}
          >
            <Typography variant="h2">Welcome</Typography>
            <Typography variant="body1">Log In your account</Typography>
            <TextField
              fullWidth={true}
              margin="normal"
              label="Email"
              variant="outlined"
              placeholder="Enter your email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              fullWidth={true}
              margin="normal"
              label="Password"
              variant="outlined"
              placeholder="Enter your password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
            <Typography variant="body1">
              Dont have any acount?
              <span
                style={{
                  color: '#1900D5',
                  marginLeft: '10px',
                  cursor: 'pointer',
                }}
              >
                Sign Up
              </span>
            </Typography>
          </Stack>
        </form>
      </Stack>
    </>
  );
}

export default LoginForm;
