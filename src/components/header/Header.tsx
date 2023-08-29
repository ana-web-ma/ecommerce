import React, { useState, type ReactElement } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  Link,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Tooltip,
  styled,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SearchIcon from '../ui/icons/SearchIcon';
import logo from './img/logo.png';
import { useAppDispatch, useIsLogged } from '../../helpers/hooks/Hooks';
import { logout } from '../../store/reducers/CustomerSlice';
import imageHomeDecor from './img/home-decor.jpg';
import imageFragrances from './img/Fragrances.avif';
import imageCollections from './img/collections.avif';
import HeaderLink from './HeaderLink';

const BoxForHoverElement = styled('div')({
  width: '100%',
  height: '370px',
  zIndex: '50',
  top: '75px',
  position: 'absolute',
  backgroundColor: '#F6F6F6',
  borderBottom: '1px solid #D9D9D9',
  transition: 'transform .6s linear',
});

const StackHover = styled(Stack)({
  height: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  textAlign: 'right',
  gap: '3vw',
  alignItems: 'center',
});

const Img = styled('img')({
  display: 'block',
  height: '340px',
  objectFit: 'contain',
});

const Header = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [checkedMenu, setCheckedMenu] = useState(false);
  const [hoverFragrances, setHoverFragrances] = useState(false);
  const [hoverHomeDecor, setHoverHomeDecor] = useState(false);
  const [hoverCollections, setHoverCollections] = useState(false);

  const handleDrawerToggle = (action: boolean): void => {
    setCheckedMenu(action);
  };

  const actionLink = [
    { isLogged: true, icon: <SearchIcon />, tooltip: 'Search', path: '/' },
    {
      isLogged: useIsLogged(),
      icon: <PermIdentityIcon />,
      tooltip: 'My Profile',
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

  const navMenuLinks = (
    <>
      <HeaderLink text="Home" path="/" />
      <HeaderLink text="Catalog" path="/catalog" />
      <HeaderLink text="NEW" path="catalog/new" />
      <HeaderLink text="Collections" path="catalog/collections" />
      <HeaderLink text="Fragrances" path="catalog/fragrances" />
      <HeaderLink text="Home decor" path="catalog/home-decor" />
      <HeaderLink text="About Us" path="/about" />
    </>
  );

  const drawer = (
    <Stack height="100%" justifyContent="center" alignItems="center">
      <Stack
        gap={3}
        onClick={() => {
          handleDrawerToggle(false);
        }}
      >
        {navMenuLinks}
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
          zIndex="200"
          component={Link}
          onClick={(): void => {
            setHoverCollections(false);
            setHoverFragrances(false);
            setHoverHomeDecor(false);
            navigate('/');
          }}
        >
          <img src={logo} />
        </IconButton>

        <Checkbox
          sx={{
            '& .MuiSvgIcon-root': {
              color: 'black',
              fontSize: 38,
            },
            display: { md: 'none' },
            zIndex: '2000',
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
          zIndex="200"
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
          <Box
            onClick={() => {
              setHoverCollections(false);
              setHoverFragrances(false);
              setHoverHomeDecor(false);
            }}
          >
            <HeaderLink text="Home" path="/" />
          </Box>
          <Box
            onClick={() => {
              setHoverCollections(false);
              setHoverFragrances(false);
              setHoverHomeDecor(false);
            }}
          >
            <HeaderLink text="Catalog" path="/catalog" />
          </Box>
          <Box
            onClick={() => {
              setHoverCollections(false);
              setHoverFragrances(false);
              setHoverHomeDecor(false);
            }}
          >
            <HeaderLink text="New" path="/catalog/new" />
          </Box>
          <Box
            onClick={() => {
              if (hoverCollections) setHoverCollections(false);
              else setHoverCollections(true);
              setHoverFragrances(false);
              setHoverHomeDecor(false);
            }}
          >
            <HeaderLink text="Collections" />
          </Box>
          <Box
            onClick={() => {
              setHoverCollections(false);
              if (hoverFragrances) setHoverFragrances(false);
              else setHoverFragrances(true);
              setHoverHomeDecor(false);
            }}
          >
            <HeaderLink text="Fragrances" />
          </Box>
          <Box
            onClick={() => {
              setHoverCollections(false);
              if (hoverHomeDecor) setHoverHomeDecor(false);
              else setHoverHomeDecor(true);
              setHoverFragrances(false);
            }}
          >
            <HeaderLink text="Home decor" />
          </Box>
          <Box
            onClick={() => {
              setHoverCollections(false);
              setHoverHomeDecor(false);
              setHoverFragrances(false);
            }}
          >
            <HeaderLink text="About Us" path="/about" />
          </Box>
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
                  navigate('/login');
                }}
              >
                <LogoutIcon />
              </IconButton>
            }
            tooltipTitle="Log Out"
          />
        </SpeedDial>

        <Box sx={{ display: { md: 'none', xs: 'block' }, width: '50px' }}></Box>

        <Box
          zIndex="200"
          sx={{ display: { md: 'flex', xs: 'none' } }}
          onMouseEnter={() => {
            setHoverCollections(false);
            setHoverHomeDecor(false);
            setHoverFragrances(false);
          }}
        >
          {actionLink.map((link, ind) => (
            <Tooltip
              title={link.tooltip}
              key={`activeNavLink-${ind}`}
              sx={{ display: link.isLogged ? 'block' : 'none' }}
            >
              <IconButton
                component={Link}
                onClick={(): void => {
                  navigate(link.path);
                }}
              >
                {link.icon}
              </IconButton>
            </Tooltip>
          ))}

          {useIsLogged() ? (
            <Tooltip title="Log Out">
              <IconButton
                component={Link}
                onClick={() => {
                  dispatch(logout());
                  navigate('/login');
                }}
                sx={{ mt: '-7px' }}
              >
                <LogoutIcon />
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
      <BoxForHoverElement
        sx={{
          display: { md: 'block', xs: 'none' },
          transform: hoverCollections ? 'translateY(0)' : 'translateY(-100%)',
        }}
        onMouseEnter={() => {
          setHoverCollections(true);
        }}
        onMouseLeave={() => {
          setHoverCollections(false);
        }}
      >
        <StackHover
          onClick={() => {
            setHoverCollections(false);
          }}
        >
          <HeaderLink
            text="Collections"
            size="26px"
            path="catalog/collections"
          />
          <Stack spacing={3}>
            <HeaderLink
              text="Summer collection"
              path="catalog/collections/summer"
            />
            <Divider />
            <HeaderLink
              text="Wedding collection"
              path="catalog/collections/wedding"
            />
          </Stack>
          <Img src={imageCollections} />
        </StackHover>
      </BoxForHoverElement>
      <BoxForHoverElement
        sx={{
          display: { md: 'block', xs: 'none' },
          transform: hoverFragrances ? 'translateY(0)' : 'translateY(-100%)',
        }}
        onMouseEnter={() => {
          setHoverFragrances(true);
        }}
        onMouseLeave={() => {
          setHoverFragrances(false);
        }}
      >
        <StackHover
          onClick={() => {
            setHoverFragrances(false);
          }}
        >
          <HeaderLink text="Fragrances" size="26px" path="catalog/fragrances" />
          <Stack spacing={3}>
            <HeaderLink text="Candles" path="catalog/fragrances/candles" />
            <Divider />
            <HeaderLink text="Perfume" path="catalog/fragrances/perfume" />
            <Divider />
            <HeaderLink text="Diffusers" path="catalog/fragrances/diffusers" />
          </Stack>
          <Img src={imageFragrances} />
        </StackHover>
      </BoxForHoverElement>
      <BoxForHoverElement
        sx={{
          display: { md: 'block', xs: 'none' },
          transform: hoverHomeDecor ? 'translateY(0)' : 'translateY(-100%)',
        }}
        onMouseEnter={() => {
          setHoverHomeDecor(true);
        }}
        onMouseLeave={() => {
          setHoverHomeDecor(false);
        }}
      >
        <StackHover
          onClick={() => {
            setHoverHomeDecor(false);
          }}
        >
          <HeaderLink text="Home decor" size="26px" path="catalog/home-decor" />
          <Stack spacing={3}>
            <HeaderLink
              text="Accessories"
              path="catalog/home-decor/accessories"
            />
            <Divider />
            <HeaderLink text="Vases" path="catalog/home-decor/vases" />
            <Divider />
            <HeaderLink
              text="Candle holders"
              path="catalog/home-decor/candle-holders"
            />
            <Divider />
            <HeaderLink text="Tableware" path="catalog/home-decor/tableware" />
          </Stack>
          <Img src={imageHomeDecor} />
        </StackHover>
      </BoxForHoverElement>
      <BoxForHoverElement
        sx={{
          display: { md: 'block', xs: 'none' },
          transform: 'translateY(-100%)',
          backgroundColor: '#fff',
          borderColor: '#fff',
        }}
      />
    </>
  );
};

export default Header;
