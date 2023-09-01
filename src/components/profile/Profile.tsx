import { useState } from 'react';
import {
  TextField,
  Button,
  InputAdornment,
  Stack,
  Tabs,
  Tab,
} from '@mui/material';
import type { ReactElement, ChangeEvent } from 'react';
import { Edit, Save } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Addresses from './Addresses';
import Password from './Password';
import { CustomDialog } from '../register/DialogModule';
import { updateMe } from '../../api/calls/customers/update/updateMe';
import { RegisterSchema } from '../../helpers/yup/Yup';

function ProfileForm(): ReactElement {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  });
  const ProfileData = localStorage.getItem('EPERFUME_CUSTOMER_DATA');
  let ProfileDataObj = null;
  if (ProfileData !== null) {
    ProfileDataObj = JSON.parse(ProfileData);
  }
  const { id } = ProfileDataObj;
  const [firstName, setFirstName] = useState(ProfileDataObj.firstName);
  const [lastName, setLastName] = useState(ProfileDataObj.lastName);
  const [birthdate, setBirthdate] = useState(ProfileDataObj.dateOfBirth);
  const [email, setEmail] = useState(ProfileDataObj.email);

  const [isEditingFName, setIsEditingFName] = useState(false);
  const [isEditingLName, setIsEditingLName] = useState(false);
  const [isEditingBirthdate, setIsEditingBirthdate] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [tabValue, setTabValue] = useState(0);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const openDialog = (title: string, content: React.ReactNode): void => {
    setDialogTitle(title);
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleEditClickFName = (): void => {
    setIsEditingFName(true);
  };
  const handleSaveClickFName = async (): Promise<void> => {
    setIsEditingFName(false);
    updateMe({
      id,
      setFirstName: {
        newFirstName: firstName,
      },
    })
      .then((res) => {
        localStorage.setItem(
          'EPERFUME_CUSTOMER_DATA',
          JSON.stringify(res.body),
        );
        openDialog('Successfully', 'First name changed');
      })
      .catch((err) => {
        openDialog('Error', err.toString());
      });
  };

  const handleSaveFNameClick = (): void => {
    handleSaveClickFName().catch((error) => {
      console.error('Error handling save click:', error);
    });
  };

  const handleEditClickLName = (): void => {
    setIsEditingLName(true);
  };
  const handleSaveClickLName = async (): Promise<void> => {
    setIsEditingLName(false);
    updateMe({
      id,
      setLastName: {
        newLastName: lastName,
      },
    })
      .then((res) => {
        localStorage.setItem(
          'EPERFUME_CUSTOMER_DATA',
          JSON.stringify(res.body),
        );
        openDialog('Successfully', 'Last name changed');
      })
      .catch((err) => {
        openDialog('Error', err.toString());
      });
  };

  const handleSaveLNameClick = (): void => {
    handleSaveClickLName().catch((error) => {
      console.error('Error handling save click:', error);
    });
  };
  const handleEditClickBirthdate = (): void => {
    setIsEditingBirthdate(true);
  };
  const handleSaveClickBirthdate = async (): Promise<void> => {
    setIsEditingBirthdate(false);
    updateMe({
      id,
      setDateOfBirth: {
        dateOfBirth: birthdate,
      },
    })
      .then((res) => {
        localStorage.setItem(
          'EPERFUME_CUSTOMER_DATA',
          JSON.stringify(res.body),
        );
        openDialog('Successfully', 'Birthdate changed');
      })
      .catch((err) => {
        openDialog('Error', err.toString());
      });
  };
  const handleSaveBirthdateClick = (): void => {
    handleSaveClickBirthdate().catch((error) => {
      console.error('Error handling save click:', error);
    });
  };
  const handleEditClickEmail = (): void => {
    setIsEditingEmail(true);
  };
  const handleSaveClickEmail = async (): Promise<void> => {
    setIsEditingEmail(false);
    updateMe({
      id,
      changeEmail: {
        newEmail: email,
      },
    })
      .then((res) => {
        localStorage.setItem(
          'EPERFUME_CUSTOMER_DATA',
          JSON.stringify(res.body),
        );
        openDialog('Successfully', 'Email changed');
      })
      .catch((err) => {
        openDialog('Error', err.toString());
      });
  };
  const handleSaveEmailClick = (): void => {
    handleSaveClickEmail().catch((error) => {
      console.error('Error handling save click:', error);
    });
  };

  const handleChangeFName = (event: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(event.target.value);
  };
  const handleChangeLName = (event: ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value);
  };
  const handleChangeBirthdate = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setBirthdate(event.target.value);
  };
  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };
  const handleSaveAllChanges = (): void => {
    setIsEditingFName(false);
    setIsEditingLName(false);
    setIsEditingBirthdate(false);
    setIsEditingEmail(false);
    updateMe({
      id,
      setFirstName: {
        newFirstName: firstName,
      },
      setLastName: {
        newLastName: lastName,
      },
      setDateOfBirth: {
        dateOfBirth: birthdate,
      },
      changeEmail: {
        newEmail: email,
      },
    })
      .then((res) => {
        localStorage.setItem(
          'EPERFUME_CUSTOMER_DATA',
          JSON.stringify(res.body),
        );
        openDialog('Successfully', 'Data changed');
      })
      .catch((err) => {
        openDialog('Error', err.toString());
      });
  };
  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number,
  ): void => {
    setTabValue(newValue);
  };

  return (
    <Stack mt={3} justifyContent="center" alignItems="center">
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Personal Info" />
        <Tab label="Addresses" />
        <Tab label="Change password" />
      </Tabs>
      <form autoComplete="off" style={{ width: '98%', maxWidth: '640px' }}>
        {tabValue === 0 && (
          <div style={{ minHeight: '800px' }}>
            <TextField
              value={firstName}
              onInput={handleChangeFName}
              fullWidth
              label="First name"
              disabled={!isEditingFName}
              style={{ marginTop: '16px' }}
              error={!(errors.firstName == null)}
              helperText={
                errors.firstName != null
                  ? errors.firstName.message?.toString()
                  : ''
              }
              {...register('firstName')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isEditingFName ? (
                      <Button
                        onClick={handleSaveFNameClick}
                        startIcon={<Save />}
                        variant="contained"
                        disabled={errors.firstName != null}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={handleEditClickFName}
                        startIcon={<Edit />}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              value={lastName}
              onInput={handleChangeLName}
              fullWidth
              label="Last name"
              disabled={!isEditingLName}
              style={{ marginTop: '16px' }}
              error={!(errors.lastName == null)}
              helperText={
                errors.lastName != null
                  ? errors.lastName.message?.toString()
                  : ''
              }
              {...register('lastName')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isEditingLName ? (
                      <Button
                        onClick={handleSaveLNameClick}
                        startIcon={<Save />}
                        variant="contained"
                        disabled={errors.lastName != null}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={handleEditClickLName}
                        startIcon={<Edit />}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              value={birthdate}
              onInput={handleChangeBirthdate}
              fullWidth
              label="Birthdate"
              type="date"
              style={{ marginTop: '16px' }}
              disabled={!isEditingBirthdate}
              error={!(errors.date == null)}
              helperText={
                errors.date != null ? errors.date.message?.toString() : ''
              }
              {...register('date')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isEditingBirthdate ? (
                      <Button
                        onClick={handleSaveBirthdateClick}
                        startIcon={<Save />}
                        variant="contained"
                        disabled={errors.date != null}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={handleEditClickBirthdate}
                        startIcon={<Edit />}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              value={email}
              onInput={handleChangeEmail}
              fullWidth
              label="Email"
              disabled={!isEditingEmail}
              style={{ marginTop: '16px' }}
              error={!(errors.email == null)}
              helperText={
                errors.email != null ? errors.email.message?.toString() : ''
              }
              {...register('email')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isEditingEmail ? (
                      <Button
                        onClick={handleSaveEmailClick}
                        startIcon={<Save />}
                        variant="contained"
                        disabled={errors.email != null}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={handleEditClickEmail}
                        startIcon={<Edit />}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <Button
              onClick={handleSaveAllChanges}
              variant="contained"
              color="primary"
              style={{ marginTop: '16px' }}
              disabled={
                errors.email != null ||
                errors.firstName != null ||
                errors.lastName != null ||
                errors.date != null
              }
            >
              Save All Changes
            </Button>
          </div>
        )}
        {tabValue === 1 && <Addresses></Addresses>}
        {tabValue === 2 && <Password></Password>}
      </form>
      <CustomDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        title={dialogTitle}
        content={dialogContent}
      />
    </Stack>
  );
}
export default ProfileForm;
