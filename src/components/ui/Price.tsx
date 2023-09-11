import React, { type ReactElement } from 'react';
import { Stack, Typography } from '@mui/material';
import { type Price } from '@commercetools/platform-sdk';

export default function PriceComponent(props: {
  price: Price;
  quantity?: number;
}): ReactElement {
  const quantity = props.quantity !== undefined ? props.quantity : 1;
  return props.price.discounted !== undefined ? (
    <Stack flexDirection={'row'} columnGap={1}>
      <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
        {`${
          (Number(props.price.discounted.value.centAmount) / 100) * quantity
        } €`}
      </Typography>
      <Typography
        variant="subtitle2"
        style={{
          textDecorationLine: 'line-through',
          opacity: '0.6',
          fontWeight: 400,
          whiteSpace: 'nowrap',
        }}
      >
        {`${(Number(props.price.value.centAmount) / 100) * quantity} €`}
      </Typography>
    </Stack>
  ) : (
    <Stack>
      <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
        {`${(Number(props.price.value.centAmount) / 100) * quantity} €`}
      </Typography>
    </Stack>
  );
}
