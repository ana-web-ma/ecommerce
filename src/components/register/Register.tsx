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
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { createCustomer } from '../../api/calls/createCustomer';
import { CustomDialog } from './DialogModule';
import { useAppDispatch } from '../../helpers/hooks/Hooks';
import { login } from '../../store/reducers/CustomerSlice';
import { RegisterSchema } from '../../helpers/yup/Yup';
import { onPromise } from '../login/Login';
import theme from '../../theme';

function RegisterForm(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  });
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

  const handleSubmitForm: SubmitHandler<FieldValues> = (data): void => {
    console.log(data);
  };

  return (
    <>
      <Stack mt={3} justifyContent="center" alignItems="center">
        <form
          onSubmit={onPromise(handleSubmit(handleSubmitForm))}
          style={{ width: '90%', maxWidth: '640px' }}
        >
          <Box sx={{ width: '100%' }}>
            <Grid
              container
              spacing={0}
              columnSpacing={2}
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
                  error={!(errors.email == null)}
                  helperText={
                    errors.email != null ? errors.email.message?.toString() : ''
                  }
                  {...register('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="Password"
                  variant="outlined"
                  placeholder="Enter your password"
                  error={!(errors.password == null)}
                  helperText={
                    errors.password != null
                      ? errors.password.message?.toString()
                      : ''
                  }
                  {...register('password')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="First name"
                  variant="outlined"
                  placeholder="Enter your first name"
                  error={!(errors.firstName == null)}
                  helperText={
                    errors.firstName != null
                      ? errors.firstName.message?.toString()
                      : ''
                  }
                  {...register('firstName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="Last name"
                  variant="outlined"
                  placeholder="Enter your last name"
                  error={!(errors.lastName == null)}
                  helperText={
                    errors.lastName != null
                      ? errors.lastName.message?.toString()
                      : ''
                  }
                  {...register('lastName')}
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
                  defaultValue="2023-01-01"
                  sx={{
                    cursor: 'pointer',
                  }}
                  placeholder="Enter your birthdate"
                  error={!(errors.date == null)}
                  helperText={
                    errors.date != null ? errors.date.message?.toString() : ''
                  }
                  {...register('date')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel sx={{ marginTop: '20px' }}>
                  Shipping address*:
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="inherit"
                  sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'end' } }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      top: '-1px',
                    }}
                    onChange={() => {
                      console.log('check');
                    }}
                  />
                  Set as default
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="Street"
                  variant="outlined"
                  placeholder="Enter your street"
                  error={!(errors.street1 == null)}
                  helperText={
                    errors.street1 != null
                      ? errors.street1.message?.toString()
                      : ''
                  }
                  {...register('street1')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="City"
                  variant="outlined"
                  placeholder="Enter your city"
                  error={!(errors.city1 == null)}
                  helperText={
                    errors.city1 != null ? errors.city1.message?.toString() : ''
                  }
                  {...register('city1')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="Postal code"
                  variant="outlined"
                  placeholder="Enter your postal code"
                  error={!(errors.post1 == null)}
                  helperText={
                    errors.post1 != null ? errors.post1.message?.toString() : ''
                  }
                  {...register('post1')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ marginTop: '8px' }}
                >
                  <InputLabel>Country</InputLabel>
                  <Select
                    defaultValue=""
                    label="Country"
                    error={!(errors.country1 == null)}
                    {...register('country1')}
                  >
                    <MenuItem value={'US'}>USA</MenuItem>
                    <MenuItem value={'FR'}>France</MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: theme.palette.error.main }}>
                    {errors.country1 != null
                      ? errors.country1.message?.toString()
                      : ''}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="inherit">
                  <Checkbox
                    size="small"
                    sx={{
                      top: '-1px',
                    }}
                    onChange={() => {
                      console.log('check');
                    }}
                  />
                  Make billing details same as shipping
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel sx={{ marginTop: '20px' }}>
                  Billing address:
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="inherit"
                  sx={{ marginTop: { sm: '13px' }, textAlign: { sm: 'end' } }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      top: '-1px',
                    }}
                    onChange={() => {
                      console.log('check');
                    }}
                  />
                  Set as default
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="Street"
                  variant="outlined"
                  placeholder="Enter your street"
                  error={!(errors.street2 == null)}
                  helperText={
                    errors.street2 != null
                      ? errors.street2.message?.toString()
                      : ''
                  }
                  {...register('street2')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="City"
                  variant="outlined"
                  placeholder="Enter your city"
                  error={!(errors.city2 == null)}
                  helperText={
                    errors.city2 != null ? errors.city2.message?.toString() : ''
                  }
                  {...register('city2')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth={true}
                  margin="dense"
                  label="Postal code"
                  variant="outlined"
                  placeholder="Enter your postal code"
                  error={!(errors.post2 == null)}
                  helperText={
                    errors.post2 != null ? errors.post2.message?.toString() : ''
                  }
                  {...register('post2')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ marginTop: '8px' }}
                >
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    defaultValue=""
                    label="Country"
                    error={!(errors.country2 == null)}
                    {...register('country2')}
                  >
                    <MenuItem value={'US'}>USA</MenuItem>
                    <MenuItem value={'FR'}>France</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.country2 != null
                      ? errors.country2.message?.toString()
                      : ''}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ width: '100%', marginTop: '20px' }}
                  type="submit"
                  variant="contained"
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
