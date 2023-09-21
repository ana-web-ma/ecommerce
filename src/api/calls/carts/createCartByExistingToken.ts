import { type ClientResponse, type Cart } from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../../clients/ExistingTokenFlowClient';

export const createAnonymousCartByToken = async (): Promise<
  ClientResponse<Cart>
> => {
  return apiRootCreateByToken()
    .me()
    .carts()
    .post({ body: { currency: 'EUR', country: 'US' } })
    .execute();
};
