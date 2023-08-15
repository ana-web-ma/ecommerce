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
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import { createCustomer } from '../../api/calls/createCustomer';
import { CustomDialog } from './DialogModule';
import { useAppDispatch } from '../../helpers/hooks/Hooks';
import { login } from '../../store/reducers/CustomerSlice';

function RegisterForm(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = ['US', 'FR'];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState(countries[0]);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [streetTouched, setStreetTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [dateTouched, setDateTouched] = useState(false);
  const [postCodeTouched, setPostCodeTouched] = useState(false);
  const [countryTouched, setCountryTouched] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}(?<!\s)$/;
  const nameRegex = /^[a-zA-Zа-яА-ЯàâäçéèêëîïôœùûüÿÀÂÄÇÉÈÊËÎÏÔŒÙÛÜŸ]+$/;
  const streetRegex = /.+/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const postCodeRegex = /^\d{5}$/;

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
      createCustomer({
        email: `${email}`,
        password: `${password}`,
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        dateOfBirth: date,
        addresses: [
          {
            country,
            city,
            streetName: street,
            postalCode: postCode,
          },
        ],
      })
        .then((resp) => {
          if (resp.statusCode === 201) {
            dispatch(login(JSON.stringify(resp.body.customer.id)));
            setRegistrationSuccess(true);
            openDialog('Successfully', 'User registered');
          } else {
            const errorMessage =
              resp.statusCode !== undefined
                ? `Error: ${String(resp.statusCode)}, try later`
                : 'Unknown Error, try later';
            openDialog('Error', errorMessage);
          }
        })
        .catch((err) => {
          if (err.statusCode === 400) {
            const content = (
              <div>
                User with this email already exists. Do you want to:
                <br />
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => {
                    navigate('/login');
                    setDialogOpen(false);
                  }}
                >
                  Log In
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                >
                  Use another email
                </Button>
              </div>
            );
            openDialog('Error', content);
          } else {
            const errorMessage =
              err.statusCode !== undefined
                ? `Error: ${String(err.statusCode)}, try later`
                : 'Unknown Error, try later';
            openDialog('Error', errorMessage);
          }
        });
    } else {
      openDialog('Error', 'There are blank fields or fields with errors');
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
              <Grid item xs={12}>
                <Typography variant="h2" textAlign={'left'}>
                  Sign Up
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" textAlign={'left'}>
                  Enter your details to create your account:
                </Typography>
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
                      ? 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number one special character'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12} md={5.8}>
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
              <Grid item xs={12} md={5.8}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <InputLabel sx={{ marginTop: '20px' }}>Address</InputLabel>
              </Grid>
              <Grid item xs={12} md={5.8}>
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
              <Grid item xs={12} md={5.8}>
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
              <Grid item xs={12} md={5.8}>
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
              <Grid item xs={12} md={5.8}>
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
              <Grid item xs={12}>
                <Button
                  sx={{ width: '100%', marginTop: '20px' }}
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" textAlign={'center'}>
                  Already have an account?
                  <Link
                    style={{
                      marginLeft: '10px',
                    }}
                    onClick={(): void => {
                      navigate('/login');
                    }}
                  >
                    Log IN
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </form>
        <CustomDialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            if (registrationSuccess) {
              navigate('/');
            }
          }}
          title={dialogTitle}
          content={dialogContent}
        />
      </Stack>
    </>
  );
}

export default RegisterForm;
