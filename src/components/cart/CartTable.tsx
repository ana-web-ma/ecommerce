import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import React, { type ReactElement } from 'react';
import CartLineItem from './CartLineItem';
import CartTableHead from './CartTableHead';
import CartTableToolbar from './CartTableToolbar';

export default function CartTable(): ReactElement {
  return (
    <>
      <TableContainer>
        <Table>
          <CartTableHead />
          <TableBody>
            <CartLineItem />
            <CartLineItem />
            <CartLineItem />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
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
      />
    </>
  );
}
