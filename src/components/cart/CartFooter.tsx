import { type CentPrecisionMoney } from '@commercetools/platform-sdk';
import { Stack, Typography } from '@mui/material';
import React, { type ReactElement } from 'react';

export default function CartFooter(props: {
  totalPrice: CentPrecisionMoney | undefined;
}): ReactElement {
  return props.totalPrice !== undefined ? (
    <>
      <Stack direction="row" columnGap={2} justifyContent="flex-end" mr={3}>
        <Typography variant="subtitle2">Total:</Typography>
        <Typography variant="subtitle2">
          {props.totalPrice.centAmount / 100}€
        </Typography>
      </Stack>
    </>
  ) : (
    <></>
  );
}
