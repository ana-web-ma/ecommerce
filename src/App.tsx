import React from 'react';
import { type ReactElement } from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/MainPage';
import theme from './theme';
import Layout from './components/layout/Layout';

const useHash = (): [string, (newHash: string) => void] => {
  // Tracks the browser's location hash value, and allows changing it.
  // https://www.30secondsofcode.org/react/s/use-hash/
  const [hash, setHash] = React.useState(() => window.location.hash);

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

function App(): ReactElement {
  useHash();
  if (window.location.hash === '') {
    window.location.hash = '#/parfume';
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/parfume" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/parfume/login" element={<LoginPage />} />
            <Route path="/parfume/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
