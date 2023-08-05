import React from 'react';
import { type ReactElement } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function HeaderLink(props: {
  href: string;
  text: string;
}): ReactElement {
  return (
    <Typography
      fontFamily={'bellota-text'}
      fontSize={13}
      textTransform={'uppercase'}
    >
      <Link href={props.href}>{props.text}</Link>{' '}
    </Typography>
  );
}
