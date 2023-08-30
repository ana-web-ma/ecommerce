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
import { updateMe } from '../../../api/calls/customers/update/updateMe';
import { authPasswordCustomer } from '../../../api/calls/customers/authPasswordCustomer';
import { getMe } from '../../../api/calls/getMe';
import { getProducts } from '../../../api/calls/products/getProducts';
import { getCategories } from '../../../api/calls/categories/getCategories';
import { getCategoryById } from '../../../api/calls/categories/getCategoryById';
import { searchProducts } from '../../../api/calls/products/searchProducts';

function DemoComponent(): ReactElement {
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

  const handleUpdateSubmit = (e: { preventDefault: () => void }): void => {
    authPasswordCustomer({ email: 'a@a.aa', password: '!1Aaaaaa' })
      .then((customerResp) => {
        console.log('customerResp', customerResp);
        updateMe({
          id: customerResp.body.customer.id,
          setFirstName: {
            newFirstName: 'firstNameNew',
          },
        })
          .then((updateResp) => {
            console.log('updateResp', updateResp);
          })
          .catch(console.log);
      })
      .catch(console.log);
  };

  const handleGetMe = (e: { preventDefault: () => void }): void => {
    getMe({ id: '703242c5-49a2-4dc0-83f5-08e3cc0e6d4d' })
      .then((getMeResp) => {
        console.log('getMeResp', getMeResp);
      })
      .catch(console.log);
  };

  const handleProductsSubmit = (e: { preventDefault: () => void }): void => {
    searchProducts({
      text: 'roses',

      limit: 100,
      pageNumber: 1,
      // sort: {
      //   field: 'id',
      //   order: 'desc',
      // },
    })
      .then((resp) => {
        console.log('resp', resp.body.results);
      })
      .catch(console.log);

    // getProducts({
    //   limit: 100,
    //   pageNumber: 1,
    //   sort: {
    //     field: 'id',
    //     order: 'desc',
    //   },
    //   filter: {
    //     // productsByCategoryId: { id: '8c4a5815-b067-4f86-b565-9409d38672d3' },
    //     // productByKey: { key: '34 Boulevard Saint Germain' },
    //     // productByPrice: {
    //     //   from: 0,
    //     //   to: 10000,
    //     // },
    //     productByAttributeKey: { key: 'amber' },
    //   },
    // })
    //   .then((resp) => {
    //     console.log('resp', resp.body.results);
    //   })
    //   .catch(console.log);
  };

  const handleCategoriesSubmit = (e: { preventDefault: () => void }): void => {
    // getCategoryById({ id: '26920e5c-0643-440d-aa79-2a82a76c97a4' })
    //   .then((resp) => {
    //     console.log('ancestors', resp.body.ancestors);
    //   })
    //   .catch(console.log);

    getCategories()
      .then((resp) => {
        // console.log('resp', resp.body.results);
        console.log('resp', resp.body);
      })
      .catch(console.log);
  };

  return (
    <>
      <Container>
        <Button variant="outlined" onClick={handleGetMe}>
          Get User
        </Button>
        <Button variant="contained" onClick={handleUpdateSubmit}>
          UPDATE USER
        </Button>
        <Button variant="outlined" onClick={handleSubmit}>
          ADD USER
        </Button>
        <Button variant="contained" onClick={handleProductsSubmit}>
          get products
        </Button>
        <Button variant="contained" onClick={handleCategoriesSubmit}>
          get categories
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
