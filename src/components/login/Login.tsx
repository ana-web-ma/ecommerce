import type React from 'react';
import { useState, type ReactElement } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from '../../helpers/yup/Yup';
import theme from '../../theme';
import { useAppDispatch } from '../../helpers/hooks/Hooks';
import { login } from '../../store/reducers/CustomerSlice';
import { authPasswordCustomer } from '../../api/calls/authPasswordCustomer';

export function onPromise<T>(
  // used to wrap react-hook-forms's submit handler
  // https://github.com/react-hook-form/react-hook-form/discussions/8020#discussioncomment-3429261
  promise: (event: React.SyntheticEvent) => Promise<T>,
) {
  return (event: React.SyntheticEvent) => {
    promise(event).catch((error) => {
      console.error('Unexpected error', error);
    });
  };
}

function LoginForm(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });

  const handleSubmitForm: SubmitHandler<FieldValues> = async (
    data,
  ): Promise<void> => {
    const customerData = {
      email: data.email,
      password: data.password,
    };
    await authPasswordCustomer(customerData)
      .then(async (response): Promise<void> => {
        dispatch(login(JSON.stringify(response.body.customer.id)));
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  // Show/Hide Password Functionality 👁️‍🗨️
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
  };

  return (
    <>
      <Stack justifyContent="center" alignItems="center">
        <form
          onSubmit={onPromise(handleSubmit(handleSubmitForm))}
          style={{ width: '90%', maxWidth: '640px' }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}
            boxShadow={'5px 5px 10px #ccc'}
            padding={'15% 10%'}
            borderRadius={5}
          >
            <Typography variant="h2">Welcome</Typography>
            <Typography
              variant="body1"
              textAlign={'center'}
              height={'45px'}
              color={errorMessage !== '' ? theme.palette.error.main : 'inherit'}
            >
              {errorMessage !== ''
                ? `⚠️ ${errorMessage} Please check your email, password and try again`
                : 'Log In your account'}
            </Typography>
            <TextField
              error={!(errors.email == null) || errorMessage !== ''}
              fullWidth={true}
              margin="normal"
              label="Email"
              variant="outlined"
              placeholder="Enter your email"
              onInput={() => {
                setErrorMessage('');
              }}
              helperText={
                errors.email != null ? errors.email.message?.toString() : ''
              }
              {...register('email')}
            />
            <TextField
              error={!(errors.password == null) || errorMessage !== ''}
              fullWidth={true}
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              variant="outlined"
              placeholder="Enter your password"
              onInput={() => {
                setErrorMessage('');
              }}
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
            <Button type="submit" variant="contained">
              Login
            </Button>
            <Typography variant="body1">
              Dont have any acount?
              <Link
                style={{
                  marginLeft: '10px',
                }}
                onClick={(): void => {
                  navigate('/register');
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Stack>
        </form>
      </Stack>
    </>
  );
}

export default LoginForm;
