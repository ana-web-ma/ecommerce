import React, { type ReactElement } from 'react';
import { Stack, Typography } from '@mui/material';
import {
  type DiscountedLineItemPriceForQuantity,
  type Price,
} from '@commercetools/platform-sdk';

export default function DiscountPrice(props: {
  price: Price;
  discountedPrice: DiscountedLineItemPriceForQuantity[] | undefined;
  quantity: number | undefined;
}): ReactElement {
  const quantity = props.quantity === undefined ? 1 : props.quantity;
  const oldPrice = (Number(props.price.value.centAmount) / 100) * quantity;
  let newPrice =
    props.price.discounted !== undefined
      ? (Number(props.price.discounted.value.centAmount) / 100) * quantity
      : 0;

  if (props.discountedPrice !== undefined && props.discountedPrice.length > 0) {
    newPrice =
      (Number(props.discountedPrice[0].discountedPrice.value.centAmount) /
        100) *
      quantity;
  }
  return (
    <Stack flexDirection={'row'} columnGap={1}>
      <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
        {`${newPrice.toFixed(2)} €`}
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
        {`${oldPrice.toFixed(2)} €`}
      </Typography>
    </Stack>
  );
}
