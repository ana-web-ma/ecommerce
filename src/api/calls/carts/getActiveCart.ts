import { type ClientResponse, type Cart } from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../../clients/ExistingTokenFlowClient';

export const getActiveCart = async (): Promise<ClientResponse<Cart>> => {
  return apiRootCreateByToken().me().activeCart().get().execute();
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
