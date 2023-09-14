import type { ReactElement } from 'react';
import { useState } from 'react';
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { CustomDialog } from '../register/DialogModule';
import MailImg from './icons/mail.png';

const FooterContainer = styled('div')({
  backgroundColor: 'black',
  color: '#fff',
  padding: '20px',
  width: '100vw',
  marginBottom: '-24px',
  marginTop: '40px',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
});

const FeedbackForm = styled('form')({
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  float: 'right',
  marginRight: '15px',
  marginLeft: '15px',
  marginBottom: '20px',
});
const Contacts = styled('form')({
  width: '240px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  float: 'right',
  marginRight: '15px',
  marginLeft: '15px',
  marginBottom: '20px',
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
  const [emailNews, setEmailNews] = useState('');
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
  const handleEmailNewsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setEmailNews(event.target.value);
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
  const handleSubmitNews = (event: React.FormEvent): void => {
    event.preventDefault();
    openDialog('Successfully', 'You are subscribed to the newsletter');
    setEmailNews('');
  };

  return (
    <FooterContainer>
      <FeedbackForm onSubmit={handleSubmit}>
        <Typography variant="h6">FEEDBACK FORM</Typography>
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
      <Contacts>
        <Typography variant="h6">CONTACT INFORMATION</Typography>
        <a
          href="mailto:info@candles.com"
          style={{ textDecoration: 'none', color: 'white', marginTop: '10px' }}
        >
          info@candles.com
        </a>
        <a
          href="tel:+136745677554"
          style={{ textDecoration: 'none', color: 'white', marginTop: '10px' }}
        >
          +13 674 567 75 54
        </a>
      </Contacts>
      <FeedbackForm onSubmit={handleSubmitNews}>
        <Typography variant="h6">SUBSCRIBE TO OUR NEWSLETTER</Typography>
        <TextField
          type="email"
          label="Your Email"
          variant="outlined"
          fullWidth
          value={emailNews}
          onChange={handleEmailNewsChange}
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
