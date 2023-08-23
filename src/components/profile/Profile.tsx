import React, { useState } from 'react';
import { TextField, Button, InputAdornment } from '@mui/material';
import type { ReactElement, ChangeEvent } from 'react';
import { Edit, Save } from '@mui/icons-material';

function ProfileForm(): ReactElement {
  const [value, setValue] = useState('Initial Value');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (): void => {
    setIsEditing(true);
  };

  const handleSaveClick = (): void => {
    setIsEditing(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return (
    <div>
      <TextField
        value={value}
        onChange={handleChange}
        fullWidth
        label="First name"
        disabled={!isEditing}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isEditing ? (
                <Button
                  onClick={handleSaveClick}
                  startIcon={<Save />}
                  variant="contained"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={handleEditClick}
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
export default ProfileForm;
