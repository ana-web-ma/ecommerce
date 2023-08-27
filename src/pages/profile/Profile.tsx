import { Box } from '@mui/material';
import React, { type ReactElement } from 'react';
import ProfileForm from '../../components/profile/Profile';

const Profile = (): ReactElement => {
  return (
    <>
      <Box textAlign={'center'}>
        <ProfileForm />
      </Box>
    </>
  );
};

export default Profile;
