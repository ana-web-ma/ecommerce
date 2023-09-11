import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import React, {
  type Dispatch,
  type SetStateAction,
  type ReactElement,
} from 'react';
import { type LineItem, type Cart } from '@commercetools/platform-sdk';
import CartLineItem from './CartLineItem';
import CartTableHead from './CartTableHead';
import CartTableToolbar from './CartTableToolbar';

export default function CartTable(props: {
  lineItems: LineItem[] | undefined;
  setCartData: Dispatch<SetStateAction<Cart | null>>;
}): ReactElement {
  // console.log(props.lineItems);
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
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={3}
        rowsPerPage={20}
        page={1}
        onPageChange={() => {
          console.log('onPageChange');
        }}
        onRowsPerPageChange={() => {
          console.log('onRowsPerPageChange');
        }}
      /> */}
    </>
  );
}
