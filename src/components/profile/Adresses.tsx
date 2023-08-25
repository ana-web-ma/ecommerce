import { useState } from 'react';
import { TextField, Button, InputAdornment, Typography } from '@mui/material';
import type { ReactElement, ChangeEvent } from 'react';
import { Edit, Save } from '@mui/icons-material';

function Adresses(): ReactElement {
  const [shippingStreet, setShippingStreet] = useState('Shipping Street');
  // const [shippingCity, setShippingCity] = useState('Shipping City');
  // const [shippingCode, setShippingCode] = useState('Shipping Code');
  // const [shippingCountry, setShippingCountry] = useState('Shipping Country');

  const [isEditingShippingStreet, setIsEditingShippingStreet] = useState(false);
  // const [isEditingShippingStreet, setIsEditingShippingStreet] = useState(false);

  const handleChangeShippingStreet = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setShippingStreet(event.target.value);
  };
  const handleEditClickShippingStreet = (): void => {
    setIsEditingShippingStreet(true);
  };
  const handleSaveClickShippingStreet = (): void => {
    setIsEditingShippingStreet(false);
  };
  // const handleSaveClickShippingStreet = (): void => {
  //   setIsEditingShippingStreet(false);
  // };
  // const handleEditClickShippingCity = (): void => {
  //   setIsEditingShippingCity(true);
  // };
  // const handleSaveClickShippingCity = (): void => {
  //   setIsEditingShippingCity(false);
  // };

  return (
    <div>
      <Typography variant="body1" textAlign={'center'}>
        Billing adress
      </Typography>
      <TextField
        value={shippingStreet}
        onChange={handleChangeShippingStreet}
        fullWidth
        label="Last name"
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
    </div>
  );
}
export default Adresses;
