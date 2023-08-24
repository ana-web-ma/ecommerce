import { Box } from '@mui/material';
import React, { type ReactElement } from 'react';

export default function Image(props: {
  name: string;
  url: string;
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
}): ReactElement {
  return (
    <Box
      component="img"
      sx={{
        height: props.height,
        width: props.width,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth,
      }}
      alt={props.name}
      src={props.url}
    ></Box>
  );
}
