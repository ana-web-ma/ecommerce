import {
  type ClientResponse,
  type Cart,
  type MyCartUpdateAction,
} from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../../clients/ExistingTokenFlowClient';

export const updateCartById = async (props: {
  activeCartId: string;
  activeCartVersion: number;
  addLineItem?: {
    productId: string;
    variantId: number;
    quantity: number;
  };
  changeLineItemQuantity?: {
    lineItemId: string;
    quantity: number;
  };
  removeLineItem?: {
    lineItemId: string;
    quantity?: number;
  };
  clearLineItems?: {
    lineItemIds: string[];
  };
  addDiscountCode?: {
    code: string;
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
  if (props.clearLineItems != null) {
    props.clearLineItems.lineItemIds.forEach((id) => {
      actions.push({
        action: 'removeLineItem',
        lineItemId: id,
      });
    });
  }
  if (props.addDiscountCode != null) {
    actions.push({
      action: 'addDiscountCode',
      code: props.addDiscountCode.code,
    });
  }
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

// updateCartById({
//   activeCartId: cartCache.id,
//   activeCartVersion: cartCache.version,
//   addLineItem: {
//     productId: '0bb3fd68-5ef0-484a-8f27-b4be13644e51',
//     variantId: 2,
//     quantity: 4,
//   },
//   // removeLineItem: {
//   //   lineItemId: '1bea1fe8-e15e-4da4-b6ae-18c6314931a3',
//   //   quantity: 1,
//   // },
//   // changeLineItemQuantity: {
//   //   lineItemId: 'f8701d93-c42e-4c01-b49b-75c5d03c2b01',
//   //   quantity: 23,
//   // },
// })
//   .then((updateCartByIdResp) => {
//     cartCache.version = updateCartByIdResp.body.version;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
