import React, { type ReactElement } from 'react';
import { Stack, Typography } from '@mui/material';
import {
  type DiscountedLineItemPriceForQuantity,
  type DiscountedLineItemPrice,
  type Price,
  type DiscountedPrice,
} from '@commercetools/platform-sdk';
import NoDiscountPrice from './NoDiscountPrice';

export default function DiscountPrice(props: {
  price: Price;
  discountedPrice: DiscountedLineItemPriceForQuantity[] | undefined;
  quantity: number;
}): ReactElement {
  const oldPrice = (Number(0) / 100) * props.quantity;
  const newPrice = (Number(10000) / 100) * props.quantity;
  return (
    <Stack flexDirection={'row'} columnGap={1}>
      <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
        {`${newPrice} €`}
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
        {`${oldPrice} €`}
      </Typography>
    </Stack>
  );
}
