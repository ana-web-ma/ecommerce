import { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  InputLabel,
  Grid,
  Box,
  Stack,
  Link,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { CustomDialog } from './DialogModule';
import { RegisterSchema } from '../../helpers/yup/Yup';
import { onPromise } from '../login/Login';
import theme from '../../theme';
import { login } from '../../store/reducers/CustomerSlice';
import { useAppDispatch } from '../../helpers/hooks/Hooks';
import { createCustomer } from '../../api/calls/customer/createCustomer';
import { firstUpdateAddress } from '../../api/calls/customer/update/firstUpdateAddress';
import { authPasswordCustomer } from '../../api/calls/customer/authPasswordCustomer';
import { tokenCache } from '../../api/tokenCache';

function getDateFromString(dataInput: string): string {
  const dateParse = new Date(dataInput);
  return `${dateParse.getFullYear()}-${
    dateParse.getMonth() + 1
  }-${dateParse.getDate()}`;
}

function RegisterForm(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  });

  const [isCheckedCopyCheckBox, setIsCheckedCopyCheckBox] = useState(false);
  const [isCheckedShipping, setIsCheckedShipping] = useState(false);
  const [isCheckedBilling, setIsCheckedBilling] = useState(false);

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
  };

  const openDialog = (title: string, content: React.ReactNode): void => {
    setDialogTitle(title);
    setDialogContent(content);
    setDialogOpen(true);
  };
  const handleSubmitForm: SubmitHandler<FieldValues> = (data): void => {
    const addressArray = isCheckedCopyCheckBox
      ? [
          {
            country: data.country1,
            city: data.city1,
            streetName: data.street1,
            postalCode: data.post1,
            key: 'firstBothAddress',
          },
        ]
      : [
          {
            country: data.country1,
            city: data.city1,
            streetName: data.street1,
            postalCode: data.post1,
            key: 'firstShippingAddress',
          },
          {
            country: data.country2,
            city: data.city2,
            streetName: data.street2,
            postalCode: data.post2,
            key: 'firstBillingAddress',
          },
        ];

    const customer = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: getDateFromString(data.date),
      addresses: addressArray,
      isCheckedCopyCheckBox,
    };

    createCustomer(customer)
      .then((resp) => {
        if (resp.statusCode === 201) {
          firstUpdateAddress({
            userId: resp.body.customer.id,
            isCheckedShipping,
            isCheckedBilling,
            isCheckedCopyCheckBox,
          })
            .then(async () => {
              await authPasswordCustomer({
                email: data.email,
                password: data.password,
              }).then((response) => {
                dispatch(
                  login({
                    customerId: JSON.stringify(response.body.customer.id),
                    token: tokenCache.get().token,
                  }),
                );
                setRegistrationSuccess(true);
                openDialog('Successfully', 'User registered');
              });
            })
            .catch(console.log);
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
  };

  const onChangeCheckedBoxCopy = (
    target: EventTarget & HTMLInputElement,
  ): void => {
    if (target.checked) {
      setValue('city2', getValues('city1'));
      setValue('street2', getValues('street1'));
      setValue('country2', getValues('country1'));
      setValue('post2', getValues('post1'));
    } else {
      setValue('city2', '');
      setValue('street2', '');
      setValue('country2', '');
      setValue('post2', '');
    }
  };

  return (
    <>
      <Stack mt={3} justifyContent="center" alignItems="center">
        <form
          autoComplete="off"
          onSubmit={onPromise(handleSubmit(handleSubmitForm))}
          style={{ width: '98%', maxWidth: '640px' }}
        >
          <Box sx={{ width: '100%' }}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12}>
                <Typography variant="h2" textAlign={'center'}>
                  Sign Up
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" textAlign={'center'}>
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  error={!(errors.password == null)}
                  helperText={
                    errors.password != null
                      ? errors.password.message?.toString()
                      : ''
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                  Shipping address:
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
                    onChange={(event) => {
                      if (event.target.checked) setIsCheckedShipping(true);
                      else setIsCheckedShipping(false);
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
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (isCheckedCopyCheckBox) {
                      setValue('street2', target.value);
                    }
                  }}
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
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (isCheckedCopyCheckBox) {
                      setValue('city2', target.value);
                    }
                  }}
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
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (isCheckedCopyCheckBox) {
                      setValue('post2', target.value);
                    }
                  }}
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
                    label="Country"
                    defaultValue=""
                    onClose={() => {
                      if (isCheckedCopyCheckBox) {
                        setValue('country2', getValues('country1'));
                      }
                    }}
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
                    onChange={(event) => {
                      onChangeCheckedBoxCopy(event.target);
                      setIsCheckedCopyCheckBox(event.target.checked);
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
                    onChange={(event) => {
                      if (event.target.checked) setIsCheckedBilling(true);
                      else setIsCheckedBilling(false);
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
                  style={{
                    display: isCheckedCopyCheckBox ? 'none' : 'block',
                  }}
                  variant="outlined"
                  placeholder="Enter your street"
                  error={!(errors.street2 == null) && !isCheckedCopyCheckBox}
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
                  style={{
                    display: isCheckedCopyCheckBox ? 'none' : 'block',
                  }}
                  variant="outlined"
                  placeholder="Enter your city"
                  error={!(errors.city2 == null) && !isCheckedCopyCheckBox}
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
                  style={{
                    display: isCheckedCopyCheckBox ? 'none' : 'block',
                  }}
                  variant="outlined"
                  placeholder="Enter your postal code"
                  error={!(errors.post2 == null) && !isCheckedCopyCheckBox}
                  helperText={
                    errors.post2 != null ? errors.post2.message?.toString() : ''
                  }
                  {...register('post2')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="filled">
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    label="Country"
                    defaultValue=""
                    error={!(errors.country2 == null) && !isCheckedCopyCheckBox}
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
