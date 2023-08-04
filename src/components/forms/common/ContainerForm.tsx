import type React from 'react';
import { Stack } from '@mui/material';
import { type ReactElement } from 'react';

export default function ContainerFormComponent(props: {
  children: ReactElement | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}): ReactElement {
  return (
    <Stack mt={15} justifyContent="center" alignItems="center">
      <form
        onSubmit={props.onSubmit}
        style={{ width: '90%', maxWidth: '640px' }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          boxShadow={'5px 5px 10px #ccc'}
          padding={'15% 10%'}
          borderRadius={5}
        >
          {props.children}
        </Stack>
      </form>
    </Stack>
  );
}
