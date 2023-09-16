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

export default function PriceComponent(props: {
  price: Price;
  quantity?: number;
  discountedPrice?: DiscountedLineItemPriceForQuantity[];
}): ReactElement {
  const quantity = props.quantity !== undefined ? props.quantity : 1;

  const DiscountedPrice = (): ReactElement =>
    props.price.discounted !== undefined &&
    props.discountedPrice !== undefined &&
    props.discountedPrice.length > 0 ? (
      <CommonDiscountPrice
        discountedCentAmount={props.price.discounted.value.centAmount}
        noDiscountedCentAmount={props.price.value.centAmount}
        quantity={quantity}
      />
    ) : (
      <>No discount</>
    );

  return props.price.discounted !== undefined ? (
    <DiscountedPrice />
  ) : (
    <NoDiscountPrice
      centAmount={props.price.value.centAmount}
      quantity={quantity}
    />
  );
}
