import React, { type ReactElement } from 'react';
import { Stack, Typography } from '@mui/material';
import { type Price } from '@commercetools/platform-sdk';

export default function PriceComponent(props: { price: Price }): ReactElement {
  return props.price.discounted !== undefined ? (
    <Stack flexDirection={'row'} columnGap={1}>
      <Typography variant="subtitle2">
        {`${Number(props.price.discounted.value.centAmount) / 100} €`}
      </Typography>
      <Typography
        variant="subtitle2"
        style={{
          textDecorationLine: 'line-through',
          opacity: '0.6',
          fontWeight: 400,
        }}
      >
        {`${Number(props.price.value.centAmount) / 100} €`}
      </Typography>
    </Stack>
  ) : (
    <Stack>
      <Typography variant="subtitle2">
        {`${Number(props.price.value.centAmount) / 100} €`}
      </Typography>
    </Stack>
  );
}
