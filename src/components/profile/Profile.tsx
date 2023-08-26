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

function ProfileForm(): ReactElement {
  const ProfileData = localStorage.getItem('EPERFUME_CUSTOMER_DATA');
  let ProfileDataObj = null;
  if (ProfileData !== null) {
    ProfileDataObj = JSON.parse(ProfileData);
  }
  const [firstName, setFirstName] = useState(ProfileDataObj.firstName);
  const [lastName, setLastName] = useState(ProfileDataObj.lastName);
  const [birthdate, setBirthdate] = useState(ProfileDataObj.dateOfBirth);
  const [email, setEmail] = useState(ProfileDataObj.email);

  const [isEditingFName, setIsEditingFName] = useState(false);
  const [isEditingLName, setIsEditingLName] = useState(false);
  const [isEditingBirthdate, setIsEditingBirthdate] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [tabValue, setTabValue] = useState(0);

  const handleEditClickFName = (): void => {
    setIsEditingFName(true);
  };
  const handleSaveClickFName = (): void => {
    setIsEditingFName(false);
  };
  const handleEditClickLName = (): void => {
    setIsEditingLName(true);
  };
  const handleSaveClickLName = (): void => {
    setIsEditingLName(false);
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
          <div>
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
                        onClick={handleSaveClickFName}
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
    </Stack>
  );
}
export default ProfileForm;
