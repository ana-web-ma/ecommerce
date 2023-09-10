import {
  type Customer,
  type ClientResponse,
  type CustomerSignInResult,
  type CartPagedQueryResponse,
  type Cart,
} from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../../clients/ExistingTokenFlowClient';
import { apiAnonymousFlowRoot } from '../../clients/AnonymousSessionFlowClient';

export const getActiveCart = async (): Promise<ClientResponse<Cart>> => {
  // return apiAnonymousFlowRoot().me().carts().get().execute();
  return apiRootCreateByToken().me().activeCart().get().execute();
  // .post({ body: { email: 'a@a.aa', password: '!1Aaaaaa' } })
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
