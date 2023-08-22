import {
  Box,
  Checkbox,
  Drawer,
  IconButton,
  Link,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SearchIcon from '../ui/icons/SearchIcon';
import logo from './img/logo.png';
import { useAppDispatch, useIsLogged } from '../../helpers/hooks/Hooks';
import { logout } from '../../store/reducers/CustomerSlice';

function HeaderLink(props: {
  text: string;
  path: string;
  icon?: ReactElement;
}): ReactElement {
  const navigate = useNavigate();

  return (
    <Typography variant="h3">
      <Link
        onClick={(): void => {
          navigate(props.path);
        }}
        style={{
          color: 'inherit',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {props.icon}
        {props.text}
      </Link>
    </Typography>
  );
}

const Header = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [checkedMenu, setCheckedMenu] = React.useState(false);

  const handleDrawerToggle = (action: boolean): void => {
    setCheckedMenu(action);
  };

  const actionLink = [
    { isLogged: true, icon: <SearchIcon />, tooltip: 'Search', path: '/' },
    {
      isLogged: useIsLogged(),
      icon: <PermIdentityIcon />,
      tooltip: 'My Account',
      path: '/my-profile',
    },
    {
      isLogged: true,
      icon: <ShoppingBagIcon />,
      tooltip: 'Shopping Bag',
      path: '/cart',
    },
    {
      isLogged: !useIsLogged(),
      icon: <LoginIcon />,
      tooltip: 'Log In',
      path: '/login',
    },
    {
      isLogged: !useIsLogged(),
      icon: <AddIcon />,
      tooltip: 'Create a new account',
      path: '/register',
    },
  ];

  const drawer = (
    <Stack height="100%" justifyContent="center" alignItems="center">
      <Stack
        gap={1}
        onClick={() => {
          handleDrawerToggle(false);
        }}
      >
        <HeaderLink text="Home" path="/" icon={<HomeIcon />} />
        {!useIsLogged() ? (
          <HeaderLink text="Log in" path="/login" icon={<LoginIcon />} />
        ) : (
          ''
        )}
        {!useIsLogged() ? (
          <HeaderLink text="Registration" path="/register" icon={<AddIcon />} />
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
    </Stack>
  );

  return (
    <>
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          component={Link}
          onClick={(): void => {
            navigate('/');
          }}
        >
          <img src={logo} />
        </IconButton>
        <Checkbox
          sx={{
            '& .MuiSvgIcon-root': { color: 'black', fontSize: 38 },
            display: { md: 'none', zIndex: '2000' },
          }}
          icon={<MenuIcon />}
          checkedIcon={<MenuOpenIcon />}
          checked={checkedMenu}
          onChange={(event): void => {
            setCheckedMenu(event.target.checked);
          }}
        />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ display: { md: 'flex', xs: 'none' } }}
          role="presentation"
          onClick={() => {
            setCheckedMenu(false);
          }}
          onKeyDown={() => {
            setCheckedMenu(false);
          }}
        >
          <HeaderLink text="Home" path="/" />
          <HeaderLink text="NEW & TRENDING" path="/" />
          <HeaderLink text="FRAGRANCES" path="/" />
          <HeaderLink text="INTERIOR" path="/" />
          <HeaderLink text="About Us" path="/" />
        </Stack>

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          direction="down"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: { md: 'none', xs: 'block' },
          }}
          icon={<SpeedDialIcon />}
        >
          {actionLink.map((link, ind) => (
            <SpeedDialAction
              key={`speedDial-${ind}`}
              sx={{ display: link.isLogged ? 'block' : 'none' }}
              icon={
                <IconButton
                  component={Link}
                  onClick={(): void => {
                    navigate(link.path);
                  }}
                >
                  {link.icon}
                </IconButton>
              }
              tooltipTitle={link.tooltip}
            />
          ))}
          <SpeedDialAction
            sx={{ display: useIsLogged() ? 'block' : 'none' }}
            key={'LogOutKey'}
            icon={
              <IconButton
                component={Link}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <LogoutIcon />
              </IconButton>
            }
            tooltipTitle="Log Out"
          />
        </SpeedDial>

        <Box sx={{ display: { md: 'none', xs: 'block' } }}></Box>
        <Box sx={{ display: { md: 'flex', xs: 'none' } }}>
          <Tooltip title="Search">
            <IconButton
              component={Link}
              onClick={(): void => {
                navigate('/');
              }}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
          {useIsLogged() ? (
            <Tooltip title="My Account">
              <IconButton
                component={Link}
                onClick={(): void => {
                  navigate('/my-profile');
                }}
              >
                <PermIdentityIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
          <Tooltip title="Shopping Bag">
            <IconButton
              component={Link}
              onClick={(): void => {
                navigate('/cart');
              }}
            >
              <ShoppingBagIcon />
            </IconButton>
          </Tooltip>
          {useIsLogged() ? (
            <Tooltip title="Log Out">
              <IconButton
                component={Link}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
          {!useIsLogged() ? (
            <Tooltip title="Log In">
              <IconButton
                component={Link}
                onClick={(): void => {
                  navigate('/login');
                }}
              >
                <LoginIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
          {!useIsLogged() ? (
            <Tooltip title="Create a new account">
              <IconButton
                component={Link}
                onClick={(): void => {
                  navigate('/register');
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
        </Box>
      </Stack>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={checkedMenu}
          onClose={(): void => {
            handleDrawerToggle(false);
          }}
          sx={{
            display: { md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '100%',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
