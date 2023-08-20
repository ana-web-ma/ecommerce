import {
  Box,
  Checkbox,
  Drawer,
  IconButton,
  Link,
  Stack,
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
import SearchIcon from '../ui/icons/SearchIcon';
import logo from './img/logo.png';
import { useAppDispatch, useIsLogged } from '../../helpers/hooks/Hooks';
import { logout } from '../../store/reducers/CustomerSlice';

function HeaderLink(props: {
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

const Header = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [checkedMenu, setCheckedMenu] = React.useState(false);

  const handleDrawerToggle = (action: boolean): void => {
    setCheckedMenu(action);
  };

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
          sx={{ display: { md: 'none', zIndex: '2000' } }}
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
        <Box>
          <IconButton
            component={Link}
            onClick={(): void => {
              navigate('/');
            }}
          >
            <SearchIcon />
          </IconButton>
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
