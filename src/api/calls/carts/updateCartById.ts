import {
  type Customer,
  type ClientResponse,
  type CustomerSignInResult,
  type CartPagedQueryResponse,
  type Cart,
  type MyCartUpdateAction,
} from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../../clients/ExistingTokenFlowClient';
import { apiAnonymousFlowRoot } from '../../clients/AnonymousSessionFlowClient';

export const updateCartById = async (props: {
  activeCartId: string;
  activeCartVersion: number;
  addLineItem?: {
    productId: string;
    variantId: number;
    quantity: number;
  };
  removeLineItem?: {
    lineItemId: string;
    quantity?: number;
  };
  changeLineItemQuantity?: {
    lineItemId: string;
    quantity: number;
  };
}): Promise<ClientResponse<Cart>> => {
  const actions: MyCartUpdateAction[] = [];

  if (props.addLineItem != null) {
    actions.push({
      action: 'addLineItem',
      variantId: props.addLineItem.variantId,
      quantity: props.addLineItem.quantity,
      productId: props.addLineItem.productId,
    });
  }
  if (props.removeLineItem != null) {
    actions.push({
      action: 'removeLineItem',
      lineItemId: props.removeLineItem.lineItemId,
      quantity: props.removeLineItem.quantity,
    });
  }
  if (props.changeLineItemQuantity != null) {
    actions.push({
      action: 'changeLineItemQuantity',
      lineItemId: props.changeLineItemQuantity.lineItemId,
      quantity: props.changeLineItemQuantity.quantity,
    });
  }
  console.log('actions', actions);
  return apiRootCreateByToken()
    .me()
    .carts()
    .withId({ ID: props.activeCartId })
    .post({
      body: {
        version: props.activeCartVersion,
        actions,
      },
    })
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
