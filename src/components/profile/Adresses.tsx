import { useState } from 'react';
import {
  TextField,
  Button,
  InputAdornment,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';
import type { ReactElement, ChangeEvent } from 'react';
import { Edit, Save } from '@mui/icons-material';

function Adresses(): ReactElement {
  const ProfileData = localStorage.getItem('EPERFUME_CUSTOMER_DATA');
  let ProfileDataObj = null;
  if (ProfileData !== null) {
    ProfileDataObj = JSON.parse(ProfileData);
  }
  const [shippingStreet, setShippingStreet] = useState(
    ProfileDataObj.addresses[0].streetName,
  );
  const [shippingCity, setShippingCity] = useState(
    ProfileDataObj.addresses[0].city,
  );
  const [shippingCode, setShippingCode] = useState(
    ProfileDataObj.addresses[0].postalCode,
  );
  const [shippingCountry, setShippingCountry] = useState(
    ProfileDataObj.addresses[0].country,
  );

  const [isEditingShippingStreet, setIsEditingShippingStreet] = useState(false);
  const [isEditingShippingCity, setIsEditingShippingCity] = useState(false);
  const [isEditingShippingCode, setIsEditingShippingCode] = useState(false);
  const [isEditingShippingCountry, setIsEditingShippingCountry] =
    useState(false);

  const [isCheckedShipping, setIsCheckedShipping] = useState(false);

  const handleChangeShippingStreet = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setShippingStreet(event.target.value);
  };
  const handleChangeShippingCity = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setShippingCity(event.target.value);
  };
  const handleChangeShippingCode = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setShippingCode(event.target.value);
  };
  const handleChangeShippingCountry = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setShippingCountry(event.target.value);
  };

  const handleEditClickShippingStreet = (): void => {
    setIsEditingShippingStreet(true);
  };
  const handleSaveClickShippingStreet = (): void => {
    setIsEditingShippingStreet(false);
  };
  const handleEditClickShippingCity = (): void => {
    setIsEditingShippingCity(true);
  };
  const handleSaveClickShippingCity = (): void => {
    setIsEditingShippingCity(false);
  };
  const handleEditClickShippingCode = (): void => {
    setIsEditingShippingCode(true);
  };
  const handleSaveClickShippingCode = (): void => {
    setIsEditingShippingCode(false);
  };
  const handleEditClickShippingCountry = (): void => {
    setIsEditingShippingCountry(true);
  };
  const handleSaveClickShippingCountry = (): void => {
    setIsEditingShippingCountry(false);
  };

  return (
    <div>
      <Typography variant="body1" textAlign={'center'}>
        Shipping adress
      </Typography>
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
      <TextField
        value={shippingStreet}
        onChange={handleChangeShippingStreet}
        fullWidth
        label="Street"
        disabled={!isEditingShippingStreet}
        style={{ marginBottom: '16px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isEditingShippingStreet ? (
                <Button
                  onClick={handleSaveClickShippingStreet}
                  startIcon={<Save />}
                  variant="contained"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={handleEditClickShippingStreet}
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
        value={shippingCity}
        onChange={handleChangeShippingCity}
        fullWidth
        label="City"
        disabled={!isEditingShippingCity}
        style={{ marginBottom: '16px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isEditingShippingCity ? (
                <Button
                  onClick={handleSaveClickShippingCity}
                  startIcon={<Save />}
                  variant="contained"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={handleEditClickShippingCity}
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
        value={shippingCode}
        onChange={handleChangeShippingCode}
        fullWidth
        label="Code"
        disabled={!isEditingShippingCode}
        style={{ marginBottom: '16px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isEditingShippingCode ? (
                <Button
                  onClick={handleSaveClickShippingCode}
                  startIcon={<Save />}
                  variant="contained"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={handleEditClickShippingCode}
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
      <FormControl fullWidth variant="filled">
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          value={shippingCountry}
          // onChange={handleChangeShippingCountry}
          disabled={!isEditingShippingCountry}
        >
          <MenuItem value={'US'}>USA</MenuItem>
          <MenuItem value={'FR'}>France</MenuItem>
        </Select>
        {isEditingShippingCountry ? (
          <Button
            onClick={handleSaveClickShippingCountry}
            startIcon={<Save />}
            variant="contained"
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={handleEditClickShippingCountry}
            startIcon={<Edit />}
            variant="outlined"
          >
            Edit
          </Button>
        )}
      </FormControl>
    </div>
  );
}
export default Adresses;
