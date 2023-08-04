import React from 'react';
import { FormControl, Stack } from '@mui/material';
import { type ReactElement } from 'react';

export default function ContainerFormComponent(props: {
  children: ReactElement | null;
  onChange?: () => void;
}): ReactElement {
  return (
    <Stack mt={15} justifyContent="center" alignItems="center">
      <FormControl
        onChange={props.onChange}
        style={{ width: '90%', maxWidth: '640px' }}
      >
        {props.children}
      </FormControl>
    </Stack>
  );
}
