import type React from 'react';
import { useState, type ReactElement } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { RegisterSchema } from '../../helpers/yup/Yup';
import { updatePassword } from '../../api/calls/customers/update/updatePassword';
import { CustomDialog } from '../register/DialogModule';

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
    resolver: yupResolver(RegisterSchema),
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const ProfileData = localStorage.getItem('EPERFUME_CUSTOMER_DATA');
  let ProfileDataObj = null;
  if (ProfileData !== null) {
    ProfileDataObj = JSON.parse(ProfileData);
  }
  const { id } = ProfileDataObj;
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
    updatePassword({
      id,
      currentPassword,
      newPassword,
    })
      .then((resp) => {
        openDialog('Successfully', 'Password changed');
        console.log(resp);
      })
      .catch((err) => {
        if (err.statusCode === 400) {
          openDialog('Error', 'The given current password does not match');
        } else {
          openDialog('Error', err.message);
        }
      });
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
