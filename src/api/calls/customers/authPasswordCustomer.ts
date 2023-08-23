import {
  type ClientResponse,
  type CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiPasswordFlowRoot } from '../../clients/PasswordFlowClient';

// Returns user data and save the token
export const authPasswordCustomer = async (props: {
  email: string;
  password: string;
}): Promise<ClientResponse<CustomerSignInResult>> => {
  return apiPasswordFlowRoot({
    username: props.email,
    password: props.password,
  })
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

// authPasswordCustomer({
//   email: 'example-email.example.com',
//   password: 'password',
// })
//   .then((data) => {
//     console.log('data', data);
//   })
//   .catch(console.error);
