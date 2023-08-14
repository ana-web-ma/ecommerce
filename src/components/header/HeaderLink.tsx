import React from 'react';
import { type ReactElement } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function HeaderLink(props: {
  text: string;
  path: string;
  icon: ReactElement;
}): ReactElement {
  const navigate = useNavigate();

  return (
    <Typography>
      <Link
        onClick={(): void => {
          navigate(props.path);
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        {props.icon}
        {props.text}
      </Link>
    </Typography>
  );
}
