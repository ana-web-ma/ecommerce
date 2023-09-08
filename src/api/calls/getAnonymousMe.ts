import {
  type Customer,
  type ClientResponse,
  type CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../clients/ExistingTokenFlowClient';
import { apiAnonymousFlowRoot } from '../clients/AnonymousSessionFlowClient';

export const getAnonymousMe = async (): Promise<
  ClientResponse<CustomerSignInResult>
> => {
  return apiAnonymousFlowRoot()
    .me()
    .login()
    .post({ body: { email: 'a@a.aa', password: '!1Aaaaaa' } })
    .execute();
};

// How to use

//   getMe({ id: props.id })
//     .then((loggedUserData) => {
//       console.log('loggedUserData', loggedUserData);
//     })
//     .catch(console.error);

// Use with password auth

// authPasswordCustomer(user)
// .then((userData) => {
//   console.log('userData', userData);
//   getMe({ id: userData.id })
//     .then((loggedUserData) => {
//       console.log('loggedUserData', loggedUserData);
//     })
//     .catch(console.error);
// })
// .catch(console.error);
