import type { ReactElement } from 'react';
import { useState } from 'react';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { CustomDialog } from '../register/DialogModule';

const FooterContainer = styled('div')({
  backgroundColor: 'black',
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
  width: 'calc(100% + 48px)',
  marginBottom: '-24px',
  marginTop: '40px',
});
const FeedbackForm = styled('form')({
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  float: 'right',
});
const whiteTextFieldStyles = {
  '& .MuiInputBase-input': {
    color: '#fff',
  },
  '& .MuiInputLabel-root': {
    color: '#fff',
    '&.Mui-focused': {
      color: '#fff',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
  },
};

const whiteButtonStyles = {
  color: '#fff',
  borderColor: '#fff',
};

const Footer = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const openDialog = (title: string, content: React.ReactNode): void => {
    setDialogTitle(title);
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    openDialog('Successfully', 'We will contact you');
    setEmail('');
    setMessage('');
  };

  return (
    <FooterContainer>
      <FeedbackForm onSubmit={handleSubmit}>
        <Typography variant="h6">CONTACT US</Typography>
        <TextField
          type="email"
          label="Your Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          margin="normal"
          required
          sx={whiteTextFieldStyles}
        />
        <TextField
          label="Your Message"
          variant="outlined"
          multiline
          rows={2}
          fullWidth
          value={message}
          onChange={handleMessageChange}
          margin="normal"
          required
          sx={whiteTextFieldStyles}
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          sx={whiteButtonStyles}
        >
          Send
        </Button>
      </FeedbackForm>
      <CustomDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        title={dialogTitle}
        content={dialogContent}
      />
    </FooterContainer>
  );
};

export default Footer;
