import { type ReactElement } from 'react';
import {
  Button,
  TextField,
  Typography,
  InputLabel,
  Autocomplete,
} from '@mui/material';

function RegisterForm(): ReactElement {
  const contries = ['U.S.', 'France', 'Canada'];
  return (
    <div className="root">
      <Typography variant="h2" textAlign={'center'}>
        Welcome
      </Typography>
      <Typography variant="body1" textAlign={'center'}>
        Register your account
      </Typography>
      <TextField
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Enter your email"
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Enter your password"
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="First name"
        variant="outlined"
        placeholder="Enter your first name"
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Last name"
        variant="outlined"
        placeholder="Enter your last name"
      />
      <input type="date" />
      <InputLabel id="country-select-label">Select Country</InputLabel>
      <TextField
        fullWidth={true}
        margin="normal"
        label="Street"
        variant="outlined"
        placeholder="Enter your street"
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="City"
        variant="outlined"
        placeholder="Enter your city"
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Postal code"
        variant="outlined"
        placeholder="Enter your street"
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={contries}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Country" />}
      />
      <Button type="submit" variant="contained">
        Register
      </Button>
      <Typography variant="body1">
        Dont have any acount?
        <span
          style={{ color: '#1900D5', marginLeft: '10px', cursor: 'pointer' }}
        >
          Sign In
        </span>
      </Typography>
    </div>
  );
}

export default RegisterForm;
