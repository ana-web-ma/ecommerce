import React from 'react';
import { type ReactElement } from 'react';
import { IconButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '../ui/icons/SearchIcon';
import HeaderLink from './HeaderLink';
import logo from './img/logo.png';

export default function Header(): ReactElement {
  return (
    <>
      <Stack direction="row" width="100%" justifyContent="space-between">
        <IconButton component={Link} to="/">
          <img src={logo} />
        </IconButton>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <HeaderLink text="Home" path="/" icon={<HomeIcon />} />
          <HeaderLink text="Log in" path="/login" icon={<LoginIcon />} />
          <HeaderLink text="Registration" path="/register" icon={<AddIcon />} />
          <HeaderLink text="Log out" path="/" icon={<LogoutIcon />} />
        </Stack>
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </Stack>
    </>
  );
}
