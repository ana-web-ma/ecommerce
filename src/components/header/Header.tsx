import React from 'react';
import { type ReactElement } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '../ui/icons/SearchIcon';
import HeaderLink from './HeaderLink';
import logo from './img/logo.png';
import { useAppDispatch, useIsLogged } from '../../helpers/hooks/Hooks';
import { logout } from '../../store/reducers/CustomerSlice';

export default function Header(): ReactElement {
  const dispatch = useAppDispatch();

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
          {!useIsLogged() ? (
            <HeaderLink text="Log in" path="/login" icon={<LoginIcon />} />
          ) : (
            ''
          )}
          {!useIsLogged() ? (
            <HeaderLink
              text="Registration"
              path="/register"
              icon={<AddIcon />}
            />
          ) : (
            ''
          )}
          <Box
            onClick={() => {
              dispatch(logout());
            }}
          >
            {useIsLogged() ? (
              <HeaderLink text="Log out" path="/" icon={<LogoutIcon />} />
            ) : (
              ''
            )}
          </Box>
        </Stack>
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </Stack>
    </>
  );
}
