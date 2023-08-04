import React from 'react';
import { type ReactElement } from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import theme from './theme';
import Header from './components/header/Header';
import MainPage from './pages/main/MainPage';
import PrivateRoute from './helpers/router/PrivateRoute';
import AuthRootComponent from './helpers/auth/AuthRootComponent';

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route path="/login" element={<AuthRootComponent />} />
          <Route path="/register" element={<AuthRootComponent />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
