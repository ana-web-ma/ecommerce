import React, { type ReactElement } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

export default function CartTableHead(): ReactElement {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>
            Name
            <TableSortLabel></TableSortLabel>
          </TableCell>
          <TableCell>Image</TableCell>
          <TableCell>
            Quantity<TableSortLabel></TableSortLabel>
          </TableCell>
          <TableCell>
            Price<TableSortLabel></TableSortLabel>
          </TableCell>
          <TableCell>
            Total price<TableSortLabel></TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}
