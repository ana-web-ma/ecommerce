import React, { useEffect } from 'react';
import { type ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { getCategories } from '../../api/calls/categories/getCategories';
import { getCategoryById } from '../../api/calls/categories/getCategoryById';

function Welcome(): ReactElement {
  useEffect(() => {
    getCategoryById({ id: '26920e5c-0643-440d-aa79-2a82a76c97a4' })
      .then((resp) => {
        console.log('ancestors', resp.body.ancestors);
      })
      .catch(console.log);
    getCategories()
      .then((resp) => {
        console.log('resp', resp.body.results);
      })
      .catch(console.log);
  });

  return (
    <Box textAlign={'center'}>
      <Typography variant="h1">Welcome Page</Typography>
    </Box>
  );
}

export default Welcome;
