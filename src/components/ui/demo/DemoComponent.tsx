import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { type ReactElement } from 'react';
import { createCustomer } from '../../../api/calls/customers/createCustomer';
import { firstUpdateAddress } from '../../../api/calls/customers/update/firstUpdateAddress';
import { getProducts } from '../../../api/calls/products/getProducts';

function DemoComponent(): ReactElement {
  const isCheckedCopyCheckBox = true;
  const isCheckedShipping = true;
  const isCheckedBilling = true;
  const user = {
    email: 'test9@e.e',
    password: 'password',
    firstName: 'f',
    lastName: 'l',
    dateOfBirth: '2000-01-01',
    addresses: [
      {
        country: 'US',
        city: 'co',
        streetName: 'so',
        postalCode: '11111',
        key: 'firstShippingAddress',
      },
      {
        country: 'FR',
        city: 'ct',
        streetName: 'st',
        postalCode: '22222',
        key: 'firstBillingAddress',
      },
    ],
  };

  const handleSubmit = (e: { preventDefault: () => void }): void => {
    createCustomer({ ...user })
      .then((resp) => {
        console.log('resp', resp);
        firstUpdateAddress({
          userId: resp.body.customer.id,
          isCheckedShipping: true,
          isCheckedBilling: true,
          isCheckedCopyCheckBox: false,
        })
          .then((updateResp) => {
            console.log('updateResp', updateResp);
          })
          .catch(console.log);
      })
      .catch(console.log);
  };

  const handleProductsSubmit = (e: { preventDefault: () => void }): void => {
    getProducts({
      limit: 5,
      pageNumber: 3,
      sort: {
        field: 'id',
        order: 'desc',
      },
      filter: {
        categoriesById: { id: '3af6470b-59b5-4d4e-9a7b-81133a440499' },
        // productByKey: { key: '34 Boulevard Saint Germain' },
      },
    })
      .then((resp) => {
        console.log('resp', resp.body.results);
      })
      .catch(console.log);
  };

  return (
    <>
      <Container>
        <Button variant="contained" onClick={handleSubmit}>
          ADD USER
        </Button>
        <Button variant="contained" onClick={handleProductsSubmit}>
          get products
        </Button>
        <Grid container>
          <Grid item>
            <Paper variant="outlined">
              <Typography variant="h2">HEADLINE 1 h1/h2</Typography>
              <Typography variant="h3">Form title h3</Typography>
              <Typography variant="subtitle1">Card title subtitle1</Typography>
              <Typography variant="subtitle2">Card tag subtitle2</Typography>
              <Typography variant="body1">Text Body1</Typography>
              <Typography variant="body2">Text Body2</Typography>
            </Paper>
          </Grid>
          <Grid item xs>
            <Box sx={{ p: 2, border: 'solid 1px #D9D9D9' }}>
              <Stack>
                <TextField
                  hiddenLabel
                  variant="outlined"
                  placeholder="Placeholder"
                ></TextField>
                <TextField
                  hiddenLabel
                  variant="outlined"
                  placeholder="Placeholder"
                  error
                  helperText="Incorrect entry."
                ></TextField>
                <Divider />
              </Stack>
            </Box>
            <Box
              sx={{
                p: 2,
                border: 'solid 1px #D9D9D9',
              }}
            >
              <Divider>Dividers with text</Divider>
              <Stack>
                <Button variant="text">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

DemoComponent.propTypes = {};

export default DemoComponent;
