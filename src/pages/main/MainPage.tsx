import { type ReactElement } from 'react';
import { Box } from '@mui/material';
import Welcome from './Welcome';

function MainPage(): ReactElement {
  return (
    <Box sx={{ my: 2 }}>
      <Welcome></Welcome>
    </Box>
  );
}

export default MainPage;
