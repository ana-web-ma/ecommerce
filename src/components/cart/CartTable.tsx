import { Table, TableBody, TableContainer } from '@mui/material';
import React, { type ReactElement } from 'react';
import { type LineItem } from '@commercetools/platform-sdk';
import CartLineItem from './CartLineItem';
import CartTableHead from './CartTableHead';

export default function CartTable(props: {
  lineItems: LineItem[] | undefined;
}): ReactElement {
  return (
    <>
      <TableContainer>
        <Table>
          <CartTableHead />
          <TableBody>
            {props.lineItems?.map((item) => (
              <CartLineItem key={item.id} lineItem={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
