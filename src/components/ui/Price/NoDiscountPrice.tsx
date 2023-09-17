import React, { type ReactElement } from 'react';
import { Stack, Typography } from '@mui/material';

export default function NoDiscountPrice(props: {
  centAmount: number;
  quantity: number;
}): ReactElement {
  return (
    <Stack>
      <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
        {`${(Number(props.centAmount) / 100) * props.quantity} €`}
      </Typography>
    </Stack>
  );
}
