import {
  type Address,
  type ClientResponse,
  type CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../../clients/BuildClient';

export interface CustomAddress extends Address {
  key: string;
}

//! Addresses must contain a key with the address type
//! key: 'firstShippingAddress' | 'firstBillingAddress',

export const createCustomer = async (props: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: CustomAddress[];
}): Promise<ClientResponse<CustomerSignInResult>> => {
  const { email, password, firstName, lastName, dateOfBirth, addresses } =
    props;

  return apiRoot
    .customers()
    .post({
      body: {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
      },
    })
    .execute();
};
