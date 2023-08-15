import React, { type ReactElement } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  type TooltipProps,
  Typography,
  styled,
  tooltipClasses,
  type ButtonProps,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useIsLogged } from '../../helpers/hooks/Hooks';

const TextSpan = (props: { child: string }): ReactElement => {
  return <span>{props.child}</span>;
};

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 15,
    fontFamily: 'Economica',
  },
}));

const NavLink = styled(Button)<ButtonProps>(() => ({
  textTransform: 'none',
  fontSize: '22px',
  fontFamily: 'Economica',
}));

const NotFound = (): ReactElement => {
  const navigate = useNavigate();
  const title = '404'.split('');

  return (
    <Box
      sx={{
        pt: 2,
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <LightTooltip title="To Home Page">
          <NavLink
            variant="text"
            onClick={(): void => {
              navigate('/');
            }}
          >
            Home
          </NavLink>
        </LightTooltip>
        <LightTooltip title="About Us">
          <NavLink
            variant="text"
            onClick={(): void => {
              navigate('/');
            }}
          >
            About
          </NavLink>
        </LightTooltip>
        <LightTooltip title={useIsLogged() ? "You're logged in" : 'Log In'}>
          <span>
            <NavLink
              variant="text"
              startIcon={<LoginIcon />}
              disabled={useIsLogged()}
              onClick={(): void => {
                navigate('/login');
              }}
            >
              LogIn
            </NavLink>
          </span>
        </LightTooltip>
        <LightTooltip
          title={useIsLogged() ? 'Log Out' : "You aren't authorized"}
        >
          <span>
            <NavLink
              variant="text"
              startIcon={<LogoutIcon />}
              disabled={!useIsLogged()}
              onClick={(): void => {
                navigate('/register');
              }}
            >
              LogOut
            </NavLink>
          </span>
        </LightTooltip>
      </Container>
      <Container maxWidth="md">
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Container
              sx={{
                maxWidth: '620px',
              }}
            >
              <img
                src="https://static.semrush.com/blog/uploads/files/7a/c4/7ac4acca6898c1bb4781b64dd751a8df/what-does-error-404-not-found-mean.svg"
                alt="404 - page not found"
                style={{
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  margin: '0 auto',
                }}
              />
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Container
              sx={{
                width: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Typography variant="h1" fontFamily={'Economica'}>
                {title.map((letter, index) => {
                  return <TextSpan key={index} child={letter}></TextSpan>;
                })}
              </Typography>
              <Typography variant="h3" fontFamily={'Economica'}>
                Page Not Found
              </Typography>
              <Typography variant="subtitle1" fontFamily={'Economica'}>
                This page doesn&apos;t exist or was removed
              </Typography>
              <Typography variant="subtitle1" fontFamily={'Economica'}>
                We suggest you back to home
              </Typography>
              <LightTooltip title="To Home Page">
                <Button
                  variant="contained"
                  onClick={(): void => {
                    navigate('/');
                  }}
                  style={{
                    fontFamily: 'Economica',
                    fontSize: '20px',
                  }}
                >
                  Back to Home
                </Button>
              </LightTooltip>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;
