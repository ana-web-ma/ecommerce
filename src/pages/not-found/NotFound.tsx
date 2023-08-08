import React, { type ReactElement } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <Box sx={{ my: 2 }}>
      <Container maxWidth="md">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Container
              sx={{
                width: '320px',
              }}
            >
              <img
                src="https://static.semrush.com/blog/uploads/files/7a/c4/7ac4acca6898c1bb4781b64dd751a8df/what-does-error-404-not-found-mean.svg"
                alt=""
                width={320}
                height={300}
              />
            </Container>
          </Grid>
          <Grid item xs={12} md={6}>
            <Container
              sx={{
                width: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'end',
              }}
            >
              <Typography variant="h1" fontFamily={'economica'}>
                404
              </Typography>
              <Typography variant="h6" fontFamily={'economica'}>
                Page Not Found
              </Typography>
              <Typography variant="subtitle1" fontFamily={'economica'}>
                This page doesn&apos;t exist or was removed
              </Typography>
              <Typography variant="subtitle1" fontFamily={'economica'}>
                We suggest you back to home
              </Typography>
              <Button
                variant="contained"
                onClick={(): void => {
                  navigate('/parfume');
                }}
              >
                Back to Home
              </Button>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;
