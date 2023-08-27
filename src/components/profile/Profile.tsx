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
import Addresses from './Addresses';
import Password from './Password';
import { CustomDialog } from '../register/DialogModule';
import { updateMe } from '../../api/calls/customers/update/updateMe';

function ProfileForm(): ReactElement {
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
      .then(() => {
        openDialog('Successfully', 'First name changed');
      })
      .catch(() => {
        openDialog('Error', 'Try later');
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
  const handleSaveClickLName = (): void => {
    setIsEditingLName(false);
    updateMe({
      id,
      setLastName: {
        newLastName: lastName,
      },
    })
      .then(() => {
        openDialog('Successfully', 'First name changed');
      })
      .catch(() => {
        openDialog('Error', 'Try later');
      });
  };
  const handleEditClickBirthdate = (): void => {
    setIsEditingBirthdate(true);
  };
  const handleSaveClickBirthdate = (): void => {
    setIsEditingBirthdate(false);
  };
  const handleEditClickEmail = (): void => {
    setIsEditingEmail(true);
  };
  const handleSaveClickEmail = (): void => {
    setIsEditingEmail(false);
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
    console.log('Saving all changes');
    setIsEditingFName(false);
    setIsEditingLName(false);
    setIsEditingBirthdate(false);
    setIsEditingEmail(false);
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
              onChange={handleChangeFName}
              fullWidth
              label="First name"
              disabled={!isEditingFName}
              style={{ marginTop: '16px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isEditingFName ? (
                      <Button
                        onClick={handleSaveFNameClick}
                        startIcon={<Save />}
                        variant="contained"
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
              onChange={handleChangeLName}
              fullWidth
              label="Last name"
              disabled={!isEditingLName}
              style={{ marginTop: '16px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isEditingLName ? (
                      <Button
                        onClick={handleSaveClickLName}
                        startIcon={<Save />}
                        variant="contained"
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
              onChange={handleChangeBirthdate}
              fullWidth
              label="Birthdate"
              type="date"
              style={{ marginTop: '16px' }}
              disabled={!isEditingBirthdate}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isEditingBirthdate ? (
                      <Button
                        onClick={handleSaveClickBirthdate}
                        startIcon={<Save />}
                        variant="contained"
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
              onChange={handleChangeEmail}
              fullWidth
              label="Email"
              disabled={!isEditingEmail}
              style={{ marginTop: '16px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isEditingEmail ? (
                      <Button
                        onClick={handleSaveClickEmail}
                        startIcon={<Save />}
                        variant="contained"
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
