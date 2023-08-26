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
import { Edit, Save, Delete } from '@mui/icons-material';

function Addresses(): ReactElement {
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

  const [isEditing, setIsEditing] = useState(false);

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

  const handleToggleEditSave = (): void => {
    if (isEditing) {
      // logic
    }
    setIsEditing(!isEditing);
  };

  const handleDeleteClick = (): void => {
    // logic
  };

  return (
    <div>
      <Typography variant="h3" textAlign={'center'}>
        Shipping adress
      </Typography>
      <TextField
        value={shippingStreet}
        onChange={handleChangeShippingStreet}
        fullWidth
        label="Street"
        disabled={!isEditing}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        value={shippingCity}
        onChange={handleChangeShippingCity}
        fullWidth
        label="City"
        disabled={!isEditing}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        value={shippingCode}
        onChange={handleChangeShippingCode}
        fullWidth
        label="Code"
        disabled={!isEditing}
        style={{ marginBottom: '16px' }}
      />
      <FormControl fullWidth variant="filled">
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          value={shippingCountry}
          // onClose={handleChangeShippingCountry}
          disabled={!isEditing}
        >
          <MenuItem value={'US'}>USA</MenuItem>
          <MenuItem value={'FR'}>France</MenuItem>
        </Select>
      </FormControl>
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
      <Button
        startIcon={isEditing ? <Save /> : <Edit />}
        onClick={handleToggleEditSave}
      >
        {isEditing ? 'Save' : 'Edit'}
      </Button>
      <Button startIcon={<Delete />} onClick={handleDeleteClick}>
        Delete
      </Button>
    </div>
  );
}
export default Addresses;
