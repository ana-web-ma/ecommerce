import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';
import type { ReactElement, ChangeEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material';
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

  const [billingStreet, setBillingStreet] = useState(
    ProfileDataObj.addresses[1].streetName,
  );
  const [billingCity, setBillingCity] = useState(
    ProfileDataObj.addresses[1].city,
  );
  const [billingCode, setBillingCode] = useState(
    ProfileDataObj.addresses[1].postalCode,
  );
  const [billingCountry, setBillingCountry] = useState(
    ProfileDataObj.addresses[1].country,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isDefaultShipping, setIsDefaultShipping] = useState(
    ProfileDataObj.shippingAddressIds[0] ===
      ProfileDataObj.defaultShippingAddressId,
  );

  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [isDefaultBilling, setIsDefaultBilling] = useState(
    ProfileDataObj.billingAddressIds[0] ===
      ProfileDataObj.defaultBillingAddressId,
  );

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
    event: SelectChangeEvent<HTMLInputElement>,
  ): void => {
    setShippingCountry(event.target.value);
  };

  const handleChangeBillingStreet = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setBillingStreet(event.target.value);
  };
  const handleChangeBillingCity = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setBillingCity(event.target.value);
  };
  const handleChangeBillingCode = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setBillingCode(event.target.value);
  };
  const handleChangeBillingCountry = (
    event: SelectChangeEvent<HTMLInputElement>,
  ): void => {
    setBillingCountry(event.target.value);
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

  const handleToggleEditSaveBilling = (): void => {
    if (isEditing) {
      // logic
    }
    setIsEditingBilling(!isEditingBilling);
  };

  const handleDeleteClickBilling = (): void => {
    // logic
  };

  return (
    <div>
      <Typography
        variant="h3"
        textAlign={'center'}
        style={{ marginTop: '30px' }}
      >
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
          onChange={handleChangeShippingCountry}
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
          disabled={!isEditing}
          defaultChecked={isDefaultShipping}
          onChange={(event) => {
            if (event.target.checked) setIsDefaultShipping(true);
            else setIsDefaultShipping(false);
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
      <Typography
        variant="h3"
        textAlign={'center'}
        style={{ marginTop: '30px' }}
      >
        Billing adress
      </Typography>
      <TextField
        value={billingStreet}
        onChange={handleChangeBillingStreet}
        fullWidth
        label="Street"
        disabled={!isEditingBilling}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        value={billingCity}
        onChange={handleChangeBillingCity}
        fullWidth
        label="City"
        disabled={!isEditingBilling}
        style={{ marginBottom: '16px' }}
      />
      <TextField
        value={billingCode}
        onChange={handleChangeBillingCode}
        fullWidth
        label="Code"
        disabled={!isEditingBilling}
        style={{ marginBottom: '16px' }}
      />
      <FormControl fullWidth variant="filled">
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          value={billingCountry}
          onChange={handleChangeBillingCountry}
          disabled={!isEditingBilling}
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
          disabled={!isEditingBilling}
          defaultChecked={isDefaultBilling}
          onChange={(event) => {
            if (event.target.checked) setIsDefaultBilling(true);
            else setIsDefaultBilling(false);
          }}
        />
        Set as default
      </Typography>
      <Button
        startIcon={isEditing ? <Save /> : <Edit />}
        onClick={handleToggleEditSaveBilling}
      >
        {isEditingBilling ? 'Save' : 'Edit'}
      </Button>
      <Button startIcon={<Delete />} onClick={handleDeleteClickBilling}>
        Delete
      </Button>
    </div>
  );
}
export default Addresses;
