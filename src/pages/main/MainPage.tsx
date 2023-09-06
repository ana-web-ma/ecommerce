import { Typography } from '@mui/material';
import React from 'react';
import { type ReactElement } from 'react';
import Welcome from '../../components/welcome/Welcome';

function MainPage(): ReactElement {
  return (
    <>
      <Welcome />
      <Typography align="center" pt={3} variant="h3">
        Пожалуйста, проверьте работу завтра
      </Typography>
      <Typography align="center" variant="h3">
        👉👈
      </Typography>
    </>
  );
}

export default MainPage;
