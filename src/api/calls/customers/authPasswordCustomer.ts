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
    .me()
    .login()
    .post({
      body: {
        email: props.email,
        password: props.password,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
      },
    })
    .execute();
};
