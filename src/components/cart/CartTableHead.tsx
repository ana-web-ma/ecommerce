import React, { type ReactElement } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

export default function CartTableHead(): ReactElement {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell>
            CartTableHead
            <TableSortLabel></TableSortLabel>
          </TableCell>
          <TableCell>CartTableHead</TableCell>
          <TableCell>CartTableHead</TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}
