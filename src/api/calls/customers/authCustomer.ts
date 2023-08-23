import {
  type ClientResponse,
  type CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../../clients/BuildClient';

export const authCustomer = async (props: {
  email: string;
  password: string;
}): Promise<ClientResponse<CustomerSignInResult>> => {
  return apiRoot
    .login()
    .post({
      body: {
        email: props.email,
        password: props.password,
      },
    })
    .execute();
};

// How to use:

// authCustomer({ email: 'example-email.example.com', password: 'password' })
//   .then(console.log)
//   .catch(console.error);
