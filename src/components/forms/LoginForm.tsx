import type React from 'react';
import { type ReactElement } from 'react';
import { Button, Typography } from '@mui/material';
import TextFieldComponent from './common/TextField';

function LoginForm(props: {
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}): ReactElement {
  return (
    <>
      <Typography variant="h2">Welcome</Typography>
      <Typography variant="body1">Log In your account</Typography>
      <TextFieldComponent
        label="Email"
        placeholder="Enter your email"
        onChange={props.onChangeEmail}
      />
      <TextFieldComponent
        label="Password"
        placeholder="Enter your password"
        onChange={props.onChangePassword}
      />
      <Button type="submit" variant="contained">
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
    </>
  );
}

export default LoginForm;
