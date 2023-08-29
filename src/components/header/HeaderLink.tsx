import React, { type ReactElement } from 'react';
import { Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HeaderLink(props: {
  text: string;
  path?: string;
  size?: string;
}): ReactElement {
  const navigate = useNavigate();
  return (
    <Typography
      variant="h3"
      sx={{
        cursor: 'pointer',
        fontSize:
          props.size !== undefined ? props.size : { md: '15px', lg: '20px' },
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          opacity: 0.3,
        },
      }}
    >
      <Link
        onClick={(): void => {
          if (props.path !== undefined) navigate(props.path);
        }}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {props.text}
      </Link>
    </Typography>
  );
}
