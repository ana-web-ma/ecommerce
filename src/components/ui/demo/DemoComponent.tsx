import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { type ReactElement } from 'react';

function DemoComponent(): ReactElement {
  return (
    <>
      <Typography variant="h2">HEADLINE 1 h1/h2</Typography>
      <Typography variant="h3">Form title h3</Typography>
      <Typography variant="subtitle1">Card title subtitle1</Typography>
      <Typography variant="subtitle2">Card tag subtitle2</Typography>
      <Typography variant="body1">Text Body1</Typography>
      <Typography variant="body2">Text Body2</Typography>
      <Stack>
        <TextField
          hiddenLabel
          variant="outlined"
          placeholder="Placeholder"
        ></TextField>
        <TextField
          hiddenLabel
          variant="outlined"
          placeholder="Placeholder"
          error
          helperText="Incorrect entry."
        ></TextField>
      </Stack>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  );
}

DemoComponent.propTypes = {};

export default DemoComponent;
