import { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  InputLabel,
  Autocomplete,
  Container,
} from '@mui/material';
import type { ReactElement } from 'react';

function RegisterForm(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [code, setCode] = useState('');
  const [country, setCountry] = useState('');
  const countries = ['U.S.', 'France', 'Canada'];

  // const {regirter, formState} =useForm();
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const nameRegex = /^[a-zA-Zа-яА-ЯàâäçéèêëîïôœùûüÿÀÂÄÇÉÈÊËÎÏÔŒÙÛÜŸ]+$/;

  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log(firstName);
    console.log(lastName);
    console.log(date);
    console.log(street);
    console.log(city);
    console.log(code);
    console.log(country);
  };

  const handleFirstNameBlur = (): void => {
    setFirstNameTouched(true);
  };

  const handleLastNameBlur = (): void => {
    setLastNameTouched(true);
  };

  const isFirstNameValid = firstNameTouched && nameRegex.test(firstName);
  const isLastNameValid = lastNameTouched && nameRegex.test(lastName);

  return (
    <Container maxWidth="sm">
      <div className="root">
        <Typography variant="h2" textAlign={'center'}>
          Welcome
        </Typography>
        <Typography variant="body1" textAlign={'center'}>
          Register your account
        </Typography>
        <TextField
          fullWidth={true}
          margin="dense"
          label="Email"
          variant="outlined"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          fullWidth={true}
          margin="dense"
          label="Password"
          variant="outlined"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          fullWidth={true}
          margin="dense"
          label="First name"
          variant="outlined"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          onBlur={handleFirstNameBlur}
          error={!isFirstNameValid && firstNameTouched}
          helperText={
            !isFirstNameValid && firstNameTouched
              ? 'Must contain at least one character and no special characters or numbers'
              : ''
          }
        />
        <TextField
          fullWidth={true}
          margin="dense"
          label="Last name"
          variant="outlined"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          onBlur={handleLastNameBlur}
          error={!isLastNameValid && lastNameTouched}
          helperText={
            !isLastNameValid && lastNameTouched
              ? 'Must contain at least one character and no special characters or numbers'
              : ''
          }
        />
        <InputLabel sx={{ marginTop: '20px' }}>Birthday</InputLabel>
        <input
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <InputLabel sx={{ marginTop: '20px' }}>Address</InputLabel>
        <TextField
          fullWidth={true}
          margin="dense"
          label="Street"
          variant="outlined"
          placeholder="Enter your street"
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />
        <TextField
          fullWidth={true}
          margin="dense"
          label="City"
          variant="outlined"
          placeholder="Enter your city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <TextField
          fullWidth={true}
          margin="dense"
          label="Postal code"
          variant="outlined"
          placeholder="Enter your postal code"
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
        <Autocomplete
          sx={{ width: '100%', marginTop: '17px' }}
          fullWidth={true}
          options={countries}
          onChange={(e, newValue) => {
            if (newValue !== null) {
              setCountry(newValue);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Country" />}
        />
        <Button
          sx={{ width: '100%', marginTop: '20px' }}
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Register
        </Button>
        <Typography variant="body1">
          Dont have any acount?
          <span
            style={{ color: '#1900D5', marginLeft: '10px', cursor: 'pointer' }}
          >
            Sign In
          </span>
        </Typography>
      </div>
    </Container>
  );
}

export default RegisterForm;
