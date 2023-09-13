import { Table, TableBody, TableContainer } from '@mui/material';
import React, {
  type Dispatch,
  type SetStateAction,
  type ReactElement,
} from 'react';
import { type LineItem, type Cart } from '@commercetools/platform-sdk';
import CartLineItem from './CartLineItem';
import CartTableHead from './CartTableHead';

export default function CartTable(props: {
  lineItems: LineItem[] | undefined;
  setCartData: Dispatch<SetStateAction<Cart | null>>;
}): ReactElement {
  return (
    <>
      <TableContainer>
        <Table>
          <CartTableHead />
          <TableBody>
            {props.lineItems?.map((item) => (
              <CartLineItem
                key={item.id}
                lineItem={item}
                setCartData={props.setCartData}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
