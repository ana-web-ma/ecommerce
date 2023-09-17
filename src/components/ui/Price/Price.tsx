import React, { type ReactElement } from 'react';
import {
  type DiscountedLineItemPriceForQuantity,
  type Price,
} from '@commercetools/platform-sdk';
import NoDiscountPrice from './NoDiscountPrice';
import DiscountPrice from './DiscountPrice';

export default function PriceComponent(props: {
  price: Price;
  quantity?: number;
  discountedPrice?: DiscountedLineItemPriceForQuantity[];
}): ReactElement {
  const quantity = props.quantity !== undefined ? props.quantity : 1;

  return props.price.discounted !== undefined ||
    (props.discountedPrice !== undefined &&
      props.discountedPrice.length > 0) ? (
    <DiscountPrice
      price={props.price}
      quantity={props.quantity}
      discountedPrice={props.discountedPrice}
    />
  ) : (
    <NoDiscountPrice
      centAmount={props.price.value.centAmount}
      quantity={quantity}
    />
  );
}
