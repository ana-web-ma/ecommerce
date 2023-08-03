import { type ReactElement } from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import theme from './theme';
import Header from './components/header/Header';
import MainPage from './pages/main/MainPage';
import RegisterPage from './pages/register/RegisterPage';
import PrivateRoute from './helpers/router/PrivateRoute';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
