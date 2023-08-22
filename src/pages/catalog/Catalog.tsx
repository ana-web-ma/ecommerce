import { Box, Typography } from '@mui/material';
import React, { type ReactElement } from 'react';

const Catalog = (): ReactElement => {
  return (
    <>
      <Box textAlign={'center'}>
        <Typography variant="h2">All products</Typography>
      </Box>
    </>
  );
};

export default Catalog;
