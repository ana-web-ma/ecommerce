import { Box } from '@mui/material';
import { type ReactElement } from 'react';
import Info from '../../components/infirmation/info';

const About = (): ReactElement => {
  return (
    <>
      <Box textAlign={'center'}>
        <Info />
      </Box>
    </>
  );
};

export default About;
