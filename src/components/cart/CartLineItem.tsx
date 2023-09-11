import React, { type ReactElement } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { type LineItem } from '@commercetools/platform-sdk';
import Image from '../ui/Image';
import PriceComponent from '../ui/Price';

export default function CartLineItem(props: {
  lineItem: LineItem;
}): ReactElement {
  const VariantImage = (): ReactElement => {
    return props.lineItem.variant.images != null ? (
      <Image
        name={props.lineItem.name['en-US']}
        url={props.lineItem.variant.images[0].url}
        maxWidth="50px"
      />
    ) : (
      <></>
    );
  };
  return (
    <>
      <TableRow>
        <TableCell>{props.lineItem.variant.key}</TableCell>
        <TableCell>
          <VariantImage />
        </TableCell>
        <TableCell>{props.lineItem.quantity}</TableCell>
        <TableCell>
          <PriceComponent price={props.lineItem.price} />
        </TableCell>
        <TableCell>
          <PriceComponent
            price={props.lineItem.price}
            quantity={props.lineItem.quantity}
          />
        </TableCell>
      </TableRow>
    </>
  );
}
