import { type ReactElement } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import TextFieldComponent from './common/TextField';

function BoxForm(): ReactElement {
  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        boxShadow={'5px 5px 10px #ccc'}
        padding={10}
        borderRadius={5}
      >
        <Typography variant="h2" fontFamily={'bellota-text'}>
          Welcome
        </Typography>
        <Typography variant="body1" fontFamily={'bellota-text'}>
          Log In your account
        </Typography>
        <TextFieldComponent label="Email" placeholder="Enter your email" />
        <TextFieldComponent
          label="Password"
          placeholder="Enter your password"
        />
        <Button type="submit" className="button-test" variant="contained">
          Login
        </Button>
        <Typography variant="body1">
          Dont have any acount?<span>Sign Up</span>
        </Typography>
      </Stack>
    </>
  );
}

function LoginForm(): ReactElement {
  function setEmail(value: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form>
        <BoxForm />
      </form>
    </div>
  );
}

export default LoginForm;
