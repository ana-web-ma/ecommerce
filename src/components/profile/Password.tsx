import type React from 'react';
import { useState, type ReactElement } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ChangeSchema } from '../../helpers/yup/Yup';
import { updatePassword } from '../../api/calls/customers/update/updatePassword';
import { CustomDialog } from '../register/DialogModule';
import { authPasswordCustomer } from '../../api/calls/customers/authPasswordCustomer';
import { useAppDispatch, useCustomer } from '../../helpers/hooks/Hooks';
import { login } from '../../store/reducers/CustomerSlice';
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
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ChangeSchema),
  });
  const dispatch = useAppDispatch();

  const ProfileDataId = localStorage.getItem('EPERFUME_CUSTOMER_ID');

  const ProfileDataObj = useCustomer();

  const id = ProfileDataObj?.id ?? ProfileDataId;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleChangeCurrentPassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setErrorMessage('');
    setCurrentPassword(event.target.value);
  };
  const handleChangeNewPassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setErrorMessage('');
    setNewPassword(event.target.value);
  };
  const handleChangeRepeatPassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setErrorMessage('');
    setRepeatPassword(event.target.value);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const openDialog = (title: string, content: React.ReactNode): void => {
    setDialogTitle(title);
    setDialogContent(content);
    setDialogOpen(true);
  };

  const changePassword = async (): Promise<void> => {
    if (id !== undefined && id !== null) {
      updatePassword({
        id,
        currentPassword,
        newPassword,
      })
        .then((resp) => {
          openDialog('Successfully', 'Password changed');
          tokenCache.set({ expirationTime: 0, token: '' });
          const customerData = {
            email: resp.body.email,
            password: newPassword,
          };
          authPasswordCustomer(customerData)
            .then(async (response): Promise<void> => {
              dispatch(
                login({
                  customer: response.body.customer,
                  token: tokenCache.get().token,
                }),
              );
              setCurrentPassword('');
              setNewPassword('');
              setRepeatPassword('');
            })
            .catch((err) => {
              setErrorMessage(err.message);
            });
        })
        .catch((err) => {
          openDialog('Error', err.toString());
        });
    }
  };
  const changePasswordChecked = (): void => {
    changePassword().catch((error) => {
      console.error('Error handling save click:', error);
    });
  };

  // Show/Hide Password Functionality 👁️‍🗨️
  const [showOldPassword, setShowOldPassword] = useState(false);

  const handleClickShowOldPassword = (): void => {
    setShowOldPassword((show) => !show);
  };
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClickShowNewPassword = (): void => {
    setShowNewPassword((show) => !show);
  };
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowRepeatPassword = (): void => {
    setShowRepeatPassword((show) => !show);
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
        type={showOldPassword ? 'text' : 'password'}
        label="current password"
        variant="outlined"
        value={currentPassword}
        required
        placeholder="Enter your current password"
        onInput={handleChangeCurrentPassword}
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
                onClick={handleClickShowOldPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showOldPassword ? <Visibility /> : <VisibilityOff />}
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
        type={showNewPassword ? 'text' : 'password'}
        label="new password"
        variant="outlined"
        required
        value={newPassword}
        placeholder="Enter your new password"
        onInput={handleChangeNewPassword}
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
                onClick={handleClickShowNewPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showNewPassword ? <Visibility /> : <VisibilityOff />}
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
        required
        type={showRepeatPassword ? 'text' : 'password'}
        label="repeat new password"
        variant="outlined"
        value={repeatPassword}
        placeholder="Repeat your new password"
        onInput={handleChangeRepeatPassword}
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
                onClick={handleClickShowRepeatPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register('repeatPassword')}
      />
      <Button
        onClick={changePasswordChecked}
        disabled={
          errors.oldPassword != null ||
          errors.newPassword != null ||
          errors.repeatPassword != null ||
          currentPassword === '' ||
          newPassword === '' ||
          repeatPassword === ''
        }
        variant="contained"
      >
        Save new password
      </Button>
      <CustomDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        title={dialogTitle}
        content={dialogContent}
      />
    </div>
  );
}

export default Password;
