import { createBrowserRouter, redirect } from 'react-router-dom';
import React from 'react';
import NotFound from '../pages/not-found/NotFound';
import Layout from '../components/layout/Layout';
import LoginPage from '../pages/login/LoginPage';
import MainPage from '../pages/main/MainPage';
import RegisterPage from '../pages/register/RegisterPage';

const isLogged = (): Response | null => {
  const customerData = localStorage.getItem('EPERFUME_CUSTOMER_TOKEN');
  if (customerData !== null) {
    return redirect('/');
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
