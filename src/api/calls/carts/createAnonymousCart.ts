import { type ClientResponse, type Cart } from '@commercetools/platform-sdk';
import { apiAnonymousFlowRoot } from '../../clients/AnonymousSessionFlowClient';

export const createAnonymousCart = async (): Promise<ClientResponse<Cart>> => {
  return apiAnonymousFlowRoot()
    .me()
    .carts()
    .post({ body: { currency: 'EUR', country: 'US' } })
    .execute();
};
