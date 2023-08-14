import { createHashRouter, redirect } from 'react-router-dom';
import React from 'react';
import NotFound from '../pages/not-found/NotFound';
import Layout from '../components/layout/Layout';
import LoginPage from '../pages/login/LoginPage';
import MainPage from '../pages/main/MainPage';
import RegisterPage from '../pages/register/RegisterPage';

const isLogged = (): Response | null => {
  const customerData = localStorage.getItem('isLogged');
  if (customerData !== null) {
    return redirect('/');
  }
  return null;
};

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
        loader: isLogged,
      },
      {
        path: '/register',
        element: <RegisterPage />,
        loader: isLogged,
      },
    ],
  },
]);

export const useHash = (): [string, (newHash: string) => void] => {
  // Tracks the browser's location hash value, and allows changing it.
  // https://www.30secondsofcode.org/react/s/use-hash/
  const [hash, setHash] = React.useState(() => window.location.hash);
  if (window.location.hash === '') {
    window.location.hash = '#/';
  }
  const hashChangeHandler = React.useCallback(() => {
    setHash(window.location.hash);
  }, []);

  React.useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, []);

  const updateHash = React.useCallback(
    (newHash: string) => {
      if (newHash !== hash) window.location.hash = newHash;
    },
    [hash],
  );

  return [hash, updateHash];
};

export default router;
