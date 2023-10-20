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
