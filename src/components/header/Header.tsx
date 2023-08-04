import { type ReactElement } from 'react';
import Link from '@mui/material/Link';
import { IconButton, Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import SearchIcon from '../icons/SearchIcon';
import HeaderLink from './HeaderLink';
import logo from './img/logo.png';

export default function Header(): ReactElement {
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Link href="/">
          <img src={logo} />
        </Link>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <HeaderLink href="login" text="Log In"></HeaderLink>
          <HeaderLink href="register" text="Sign Up"></HeaderLink>
        </Stack>
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </Stack>
    </>
  );
}
