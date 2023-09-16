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

// How to use

// createAnonymousCart()
// .then((createCartResp) => {
//   console.log('createCartResp', createCartResp);
//   getActiveCart()
//     .then((getActiveCartResp) => {
//       console.log('getActiveCartResp', getActiveCartResp.body.lineItems);
//       cartCache.id = getActiveCartResp.body.id;
//       cartCache.version = getActiveCartResp.body.version;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })
// .catch(console.error);
