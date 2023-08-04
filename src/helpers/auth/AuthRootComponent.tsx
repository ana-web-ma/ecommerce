import type React from 'react';
import { type ReactElement, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ContainerFormComponent from '../../components/forms/common/ContainerForm';
import LoginPage from '../../pages/login/LoginPage';
import RegisterPage from '../../pages/register/RegisterPage';

const AuthRootComponent: React.FC = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  let page = null;
  if (location.pathname === '/login') {
    page = <LoginPage setEmail={setEmail} setPassword={setPassword} />;
  } else if (location.pathname === '/register') page = <RegisterPage />;

  return <ContainerFormComponent>{page}</ContainerFormComponent>;
};

export default AuthRootComponent;
