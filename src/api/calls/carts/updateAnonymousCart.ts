import {
  type Customer,
  type ClientResponse,
  type CustomerSignInResult,
  type CartPagedQueryResponse,
  type Cart,
} from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../../clients/ExistingTokenFlowClient';
import { apiAnonymousFlowRoot } from '../../clients/AnonymousSessionFlowClient';

export const updateAnonymousCart = async (props: {
  activeCartId: string;
  activeCartVersion: number;
  productId: string;
  variantId: number;
  quantity: number;
}): Promise<ClientResponse<Cart>> => {
  // return apiAnonymousFlowRoot().me().carts().get().execute();
  return apiAnonymousFlowRoot()
    .me()
    .carts()
    .withId({ ID: props.activeCartId })
    .post({
      body: {
        version: props.activeCartVersion,
        actions: [
          {
            action: 'addLineItem',
            productId: props.productId,
            variantId: props.variantId,
            quantity: props.quantity,
          },
        ],
      },
      // body: {
      //   currency: 'EUR',
      //   lineItems: [
      //     { productId: '0bb3fd68-5ef0-484a-8f27-b4be13644e51', variantId: 2 },
      //     // { productId: '0bb3fd68-5ef0-484a-8f27-b4be13644e51', variantId: 1 },
      //   ],
      // },
    })
    .execute();
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
