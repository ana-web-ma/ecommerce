import React, { useState } from 'react';
import { type ReactElement } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import MainImg from './images/main.png';

function Welcome(): ReactElement {
  const [promoCode1] = useState('SUM23');
  const [promoCode2] = useState('WED23');

  const copyToClipboard = async (code: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <Stack sx={{ marginTop: '10px', padding: 0, justifyContent: 'start' }}>
      <img
        src={MainImg}
        alt=""
        style={{ width: '100%', height: 'auto', justifyContent: 'start' }}
      />
      <Box textAlign="center" marginTop="20px">
        <Typography variant="h6">PROMO CODES</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            copyToClipboard(promoCode1)
              .then(() => {
                alert(`Promo code "${promoCode1}" copied to clipboard!`);
              })
              .catch((error) => {
                console.error('Error copying to clipboard:', error);
              });
          }}
          sx={{ margin: '10px', width: '300px' }}
        >
          summer collection: {promoCode1}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            copyToClipboard(promoCode2)
              .then(() => {
                alert(`Promo code "${promoCode2}" copied to clipboard!`);
              })
              .catch((error) => {
                console.error('Error copying to clipboard:', error);
              });
          }}
          sx={{ margin: '10px', width: '300px' }}
        >
          wedding collection: {promoCode2}
        </Button>
      </Box>
    </Stack>
  );
}

export default Welcome;
