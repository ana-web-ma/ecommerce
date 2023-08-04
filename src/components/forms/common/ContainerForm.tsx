import { FormControl, Stack } from '@mui/material';
import { type ReactElement } from 'react';

export default function ContainerFormComponent(props: {
  children: React.ReactNode;
  onChange?: () => void;
}): ReactElement {
  return (
    <Stack mt={15} justifyContent="center" alignItems="center">
      <FormControl
        onChange={props.onChange}
        style={{ width: '90%', maxWidth: '640px' }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          boxShadow={'5px 5px 10px #ccc'}
          padding={10}
          borderRadius={5}
        >
          {props.children}
        </Stack>
      </FormControl>
    </Stack>
  );
}
