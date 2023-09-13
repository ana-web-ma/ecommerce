import React, { type ReactElement } from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

export default function CartTableHead(): ReactElement {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Total price</TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}
