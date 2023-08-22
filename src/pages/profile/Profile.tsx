import { Box, Typography } from '@mui/material';
import React, { type ReactElement } from 'react';

const Profile = (): ReactElement => {
  return (
    <>
      <Box textAlign={'center'}>
        <Typography variant="h2">My account</Typography>
      </Box>
    </>
  );
};

export default Profile;
