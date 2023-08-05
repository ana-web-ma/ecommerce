import React from 'react';
import { type ReactElement } from 'react';
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/register/RegisterPage';
import Header from './components/header/Header';
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/MainPage';

function App(): ReactElement {
  return (
    <Container maxWidth="xl">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Container>
  );
}

export default App;
