import { useState } from 'react';
import {
  TextField,
  Button,
  InputAdornment,
  Stack,
  Tabs,
  Tab,
  Typography,
} from '@mui/material';
import type { ReactElement, ChangeEvent } from 'react';
import { Edit, Save } from '@mui/icons-material';

function ProfileForm(): ReactElement {
  const [firstName, setFirstName] = useState('Initial First Name');
  const [lastName, setLastName] = useState('Initial Last Name');
  const [birthdate, setBirthdate] = useState('2023-01-01');
  // const [shippingStreet, setShippingStreet] = useState('Shipping Street');
  // const [shippingCity, setShippingCity] = useState('Shipping City');
  // const [shippingCode, setShippingCode] = useState('Shipping Code');
  // const [shippingCountry, setShippingCountry] = useState('Shipping Country');
  const [isEditingFName, setIsEditingFName] = useState(false);
  const [isEditingLName, setIsEditingLName] = useState(false);
  const [isEditingBirthdate, setIsEditingBirthdate] = useState(false);
  // const [isEditingShippingCity, setIsEditingShippingCity] = useState(false);
  // const [isEditingShippingStreet, setIsEditingShippingStreet] = useState(false);
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
    setIsEditingLName(true);
  };
  const handleSaveClickBirthdate = (): void => {
    setIsEditingBirthdate(false);
  };
  // const handleEditClickShippingStreet = (): void => {
  //   setIsEditingShippingStreet(true);
  // };
  // const handleSaveClickShippingStreet = (): void => {
  //   setIsEditingShippingStreet(false);
  // };
  // const handleEditClickShippingCity = (): void => {
  //   setIsEditingShippingCity(true);
  // };
  // const handleSaveClickShippingCity = (): void => {
  //   setIsEditingShippingCity(false);
  // };

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
  const handleSaveAllChanges = (): void => {
    console.log('Saving all changes');
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
              style={{ marginBottom: '16px' }}
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
              style={{ marginBottom: '16px' }}
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
        {tabValue === 1 && (
          <div>
            <Typography variant="body1" textAlign={'center'}>
              Billing adress
            </Typography>
            <TextField
              value={lastName}
              onChange={handleChangeLName}
              fullWidth
              label="Last name"
              disabled={!isEditingLName}
              style={{ marginBottom: '16px' }}
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
          </div>
        )}
      </form>
    </Stack>
  );
}
export default ProfileForm;
