import type React from 'react';
import { type ReactElement } from 'react';
import LoginForm from '../../components/forms/LoginForm';

function LoginPage(props: {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}): ReactElement {
  const { setEmail, setPassword } = props;
  return (
    <LoginForm
      onChangeEmail={(e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      }}
      onChangePassword={(e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      }}
    ></LoginForm>
  );
}

export default LoginPage;
