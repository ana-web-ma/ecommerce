import { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  InputLabel,
  Autocomplete,
  Grid,
  Box,
  Stack,
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';

function RegisterForm(): ReactElement {
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const countries = ['U.S.', 'France'];

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [streetTouched, setStreetTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [dateTouched, setDateTouched] = useState(false);
  const [postCodeTouched, setPostCodeTouched] = useState(false);
  const [countryTouched, setCountryTouched] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const nameRegex = /^[a-zA-Zа-яА-ЯàâäçéèêëîïôœùûüÿÀÂÄÇÉÈÊËÎÏÔŒÙÛÜŸ]+$/;
  const streetRegex = /.+/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const postCodeRegex = /^\d{5}$/;

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setEmail(event.target.value);
    setEmailTouched(true);
  };
  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPassword(event.target.value);
    setPasswordTouched(true);
  };
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setFirstName(event.target.value);
    setFirstNameTouched(true);
  };

  const handleLastNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setLastName(event.target.value);
    setLastNameTouched(true);
  };
  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setDate(event.target.value);
    setDateTouched(true);
  };
  const handleStreetChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setStreet(event.target.value);
    setStreetTouched(true);
  };
  const handleCityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setCity(event.target.value);
    setCityTouched(true);
  };
  const handlePostCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPostCode(event.target.value);
    setPostCodeTouched(true);
  };
  const handleCountryChange = (): void => {
    setCountryTouched(true);
  };

  const isUserOlderThan13Years = (dateString: string): boolean => {
    const today = new Date();
    const birthdate = new Date(dateString);
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdate.getDate())
    ) {
      age -= 1;
    }
    return age >= 13;
  };

  const isEmailValid = emailTouched && emailRegex.test(email);
  const isPasswordValid = passwordTouched && passwordRegex.test(password);
  const isFirstNameValid = firstNameTouched && nameRegex.test(firstName);
  const isLastNameValid = lastNameTouched && nameRegex.test(lastName);
  const isBirthdateValid =
    dateTouched && dateRegex.test(date) && isUserOlderThan13Years(date);
  const isStreetValid = streetTouched && streetRegex.test(street);
  const isCityValid = cityTouched && nameRegex.test(city);
  const isPostCodeValid = postCodeTouched && postCodeRegex.test(postCode);
  const isCountryValid = Boolean(country);

  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    if (
      isEmailValid &&
      isPasswordValid &&
      isFirstNameValid &&
      isLastNameValid &&
      isBirthdateValid &&
      isStreetValid &&
      isCityValid &&
      isPostCodeValid &&
      isCountryValid
    ) {
      console.log('Отправляем данные');
    } else {
      alert('There are blank fields or filleds with errors');
    }
  };

  return (
    <>
      <Stack mt={3} justifyContent="center" alignItems="center">
        <form style={{ width: '90%', maxWidth: '640px' }}>
          <Box sx={{ width: '100%' }}>
            <Grid
              container
              spacing={0}
              style={{ gridRowGap: 5 }}
              justifyContent={'space-between'}
              boxShadow={'5px 5px 10px #ccc'}
              padding={'10%'}
              borderRadius={5}
            >
              <Grid xs={12}>
                <Typography variant="h2" textAlign={'left'}>
                  Sign Up
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography variant="body1" textAlign={'left'}>
                  Enter your details to create your account:
                </Typography>
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="Email"
                  variant="outlined"
                  placeholder="Enter your email"
                  onChange={handleEmailChange}
                  error={!isEmailValid && emailTouched}
                  helperText={
                    !isEmailValid && emailTouched ? 'Not valid Email' : ''
                  }
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="Password"
                  variant="outlined"
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                  error={!isPasswordValid && passwordTouched}
                  helperText={
                    !isPasswordValid && passwordTouched
                      ? 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number'
                      : ''
                  }
                />
              </Grid>
              <Grid xs={12} md={5.8}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="First name"
                  variant="outlined"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  error={!isFirstNameValid && firstNameTouched}
                  helperText={
                    !isFirstNameValid && firstNameTouched
                      ? 'Must contain at least one character and no special characters or numbers'
                      : ''
                  }
                />
              </Grid>
              <Grid xs={12} md={5.8}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="Last name"
                  variant="outlined"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  error={!isLastNameValid && lastNameTouched}
                  helperText={
                    !isLastNameValid && lastNameTouched
                      ? 'Must contain at least one character and no special characters or numbers'
                      : ''
                  }
                />
              </Grid>
              <Grid xs={12}>
                <InputLabel sx={{ marginTop: '20px' }}>
                  Date of birth
                </InputLabel>
                <TextField
                  type="date"
                  fullWidth={true}
                  margin="dense"
                  variant="outlined"
                  placeholder="Enter your birthdate"
                  onChange={handleDateChange}
                  error={!isBirthdateValid && dateTouched}
                  helperText={
                    !isBirthdateValid && dateTouched
                      ? 'You must be at least 13 years old'
                      : ''
                  }
                />
              </Grid>
              <Grid xs={12}>
                <InputLabel sx={{ marginTop: '20px' }}>Address</InputLabel>
              </Grid>
              <Grid xs={12} md={5.8}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="Street"
                  variant="outlined"
                  placeholder="Enter your street"
                  onChange={handleStreetChange}
                  error={!isStreetValid && streetTouched}
                  helperText={
                    !isStreetValid && streetTouched
                      ? 'Must contain at least one character'
                      : ''
                  }
                />
              </Grid>
              <Grid xs={12} md={5.8}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="City"
                  variant="outlined"
                  placeholder="Enter your city"
                  onChange={handleCityChange}
                  error={!isCityValid && cityTouched}
                  helperText={
                    !isCityValid && cityTouched
                      ? 'Must contain at least one character and no special characters or numbers'
                      : ''
                  }
                />
              </Grid>
              <Grid xs={12} md={5.8}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="Postal code"
                  variant="outlined"
                  placeholder="Enter your postal code"
                  onChange={handlePostCodeChange}
                  error={!isPostCodeValid && postCodeTouched}
                  helperText={
                    !isPostCodeValid && postCodeTouched
                      ? 'Must be a five digit number'
                      : ''
                  }
                />
              </Grid>
              <Grid xs={12} md={5.8}>
                <Autocomplete
                  sx={{ width: '100%', marginTop: '8px' }}
                  fullWidth={true}
                  options={countries}
                  value={country}
                  onChange={(e, newValue) => {
                    if (newValue !== null) {
                      setCountry(newValue);
                    }
                  }}
                  onBlur={handleCountryChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      onChange={handleCountryChange}
                      error={!isCountryValid && countryTouched}
                      helperText={
                        !isCountryValid && countryTouched
                          ? 'Select a country from the list'
                          : ''
                      }
                    />
                  )}
                />
              </Grid>
              <Grid xs={12}>
                <Button
                  sx={{ width: '100%', marginTop: '20px' }}
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid xs={12}>
                <Typography variant="body1" textAlign={'center'}>
                  Already have an account?
                  <span
                    style={{
                      color: '#1900D5',
                      marginLeft: '10px',
                      cursor: 'pointer',
                    }}
                    // onClick={(): void => {
                    //   navigate('/login');
                    // }}
                  >
                    Log In
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Stack>
    </>
  );
}

export default RegisterForm;
