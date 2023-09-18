import { useState } from 'react';
import { type ReactElement } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { CustomDialog } from '../register/DialogModule';
import MainImg from './images/main.png';

function Welcome(): ReactElement {
  const [promoCode1] = useState('SUM23');
  const [promoCode2] = useState('WED23');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const openDialog = (title: string, content: React.ReactNode): void => {
    setDialogTitle(title);
    setDialogContent(content);
    setDialogOpen(true);
  };

  const copyToClipboard = async (code: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <Stack
      sx={{
        marginTop: '10px',
        padding: 0,
        justifyContent: 'start',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <img src={MainImg} alt="" style={{ width: '100vw', height: 'auto' }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '7vw',
            width: '60vw',
            fontFamily: 'Bellota Text',
          }}
        >
          {' '}
          34 BOULEVARD SAINT GERMAIN
        </div>
      </div>
      <Box textAlign="center" marginTop="20px">
        <Typography variant="h6" sx={{ color: 'black' }}>
          PROMO CODES
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            copyToClipboard(promoCode1)
              .then(() => {
                openDialog(
                  'Successfully',
                  `Promo code "${promoCode1}" copied to clipboard!`,
                );
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
                openDialog(
                  'Successfully',
                  `Promo code "${promoCode2}" copied to clipboard!`,
                );
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
      <CustomDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        title={dialogTitle}
        content={dialogContent}
      />
    </Stack>
  );
}

export default Welcome;
