import type React from 'react';
import { useState, type ReactElement } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { RegisterSchema } from '../../helpers/yup/Yup';
import { useAppDispatch } from '../../helpers/hooks/Hooks';
import { login } from '../../store/reducers/CustomerSlice';
import { authPasswordCustomer } from '../../api/calls/customers/authPasswordCustomer';
import { tokenCache } from '../../api/tokenCache';

export function onPromise<T>(
  promise: (event: React.SyntheticEvent) => Promise<T>,
) {
  return (event: React.SyntheticEvent) => {
    promise(event).catch((error) => {
      console.error('Unexpected error', error);
    });
  };
}

function Password(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
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
        dispatch(
          login({
            customer: response.body.customer,
            token: tokenCache.get().token,
          }),
        );
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
    <div style={{ minHeight: '800px' }}>
      <TextField
        error={!(errors.oldPassword == null) || errorMessage !== ''}
        fullWidth={true}
        margin="normal"
        type={showPassword ? 'text' : 'password'}
        label="old password"
        variant="outlined"
        placeholder="Enter your old password"
        onInput={() => {
          setErrorMessage('');
        }}
        helperText={
          errors.oldPassword != null
            ? errors.oldPassword.message?.toString()
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
        {...register('oldPassword')}
      />
      <TextField
        error={!(errors.newPassword == null) || errorMessage !== ''}
        fullWidth={true}
        margin="normal"
        type={showPassword ? 'text' : 'password'}
        label="new password"
        variant="outlined"
        placeholder="Enter your new password"
        onInput={() => {
          setErrorMessage('');
        }}
        helperText={
          errors.newPassword != null
            ? errors.newPassword.message?.toString()
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
        {...register('newPassword')}
      />
      <TextField
        error={!(errors.repeatPassword == null) || errorMessage !== ''}
        fullWidth={true}
        margin="normal"
        type={showPassword ? 'text' : 'password'}
        label="repeat new password"
        variant="outlined"
        placeholder="Repeat your new password"
        onInput={() => {
          setErrorMessage('');
        }}
        helperText={
          errors.repeatPassword != null
            ? errors.repeatPassword.message?.toString()
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
        {...register('repeatPassword')}
      />
      <Button
        disabled={
          errors.oldPassword != null ||
          errors.newPassword != null ||
          errors.repeatPassword != null
        }
        type="submit"
        variant="contained"
      >
        Save new password
      </Button>
    </div>
  );
}

export default Password;
