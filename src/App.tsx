import React from 'react';
import { type ReactElement } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import theme from './theme';
import router, { useHash } from './router/Router';
import { authPasswordCustomer } from './api/calls/authPasswordCustomer';
import { tokenCache } from './api/tokenCache';
import { authExistingTokenCustomer } from './api/calls/authExistingTokenCustomer';

const user = {
  email: 'example-email.example.com',
  password: 'password',
};

const fn = (): void => {
  console.log('before tokenExistingToken', tokenCache.get());

  authExistingTokenCustomer()
    .then((dataExistingToken) => {
      console.log('dataExistingToken', dataExistingToken);
      console.log('tokenExistingToken', tokenCache.get());
    })
    .catch(console.error);
};

setTimeout(() => {
  fn();
}, 1000);

authPasswordCustomer(user)
  .then((data) => {
    console.log('data', data);
    console.log('token', tokenCache.get());
    //   authExistingTokenCustomer()
    //     .then((dataExistingToken) => {
    //       console.log('dataExistingToken', dataExistingToken);
    //       console.log('tokenExistingToken', tokenCache.get());
    //     })
    //     .catch(console.error);
  })
  .catch(console.error);

function App(): ReactElement {
  useHash();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
