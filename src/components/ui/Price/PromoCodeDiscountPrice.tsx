import React, { type ReactElement } from 'react';
import { Stack, Typography } from '@mui/material';
import {
  type DiscountedLineItemPriceForQuantity,
  type DiscountedLineItemPrice,
  type Price,
  type DiscountedPrice,
} from '@commercetools/platform-sdk';
import NoDiscountPrice from './NoDiscountPrice';
import CommonDiscountPrice from './CommonDiscountPrice';

export default function PromoCodeDiscountPrice(props: {
  discountedCentAmount: number;
  noDiscountedCentAmount: number;
  quantity: number;
}): ReactElement {
  return (
    <Stack flexDirection={'row'} columnGap={1}>
      <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
        {`${(Number(props.discountedCentAmount) / 100) * props.quantity} €`}
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
        {`${(Number(props.noDiscountedCentAmount) / 100) * props.quantity} €`}
      </Typography>
    </Stack>
  );
}
