import React, { type ReactElement } from 'react';
import { Stack, Typography } from '@mui/material';
import {
  type DiscountedLineItemPriceForQuantity,
  type DiscountedLineItemPrice,
  type Price,
  type DiscountedPrice,
} from '@commercetools/platform-sdk';
import NoDiscountPrice from './NoDiscountPrice';
import DiscountPrice from './DiscountPrice';

export default function PriceComponent(props: {
  price: Price;
  quantity?: number;
  discountedPrice?: DiscountedLineItemPriceForQuantity[];
}): ReactElement {
  const quantity = props.quantity !== undefined ? props.quantity : 1;

  return props.price.discounted === undefined &&
    props.discountedPrice !== undefined &&
    props.discountedPrice.length === 0 ? (
    <NoDiscountPrice
      centAmount={props.price.value.centAmount}
      quantity={quantity}
    />
  ) : (
    <DiscountPrice
      price={props.price}
      discountedPrice={props.discountedPrice}
      quantity={props.quantity !== undefined ? props.quantity : 1}
    />
  );
}
