import {
  type Customer,
  type ClientResponse,
  type CustomerSignInResult,
  type OrderPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { type ByProjectKeyLoginRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/login/by-project-key-login-request-builder';
import { type ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';
import { apiExistingTokenRoot } from '../clients/ExistingTokenFlowClient';

// Токен подходит: statusCode: 200
export const authExistingTokenCustomer = async (): Promise<
  ClientResponse<OrderPagedQueryResponse>
> => {
  return apiExistingTokenRoot.me().orders().get().execute();
};

// Пример использования:

// authExistingTokenCustomer()
//   .then((dataExistingToken) => {
//     console.log('dataExistingToken', dataExistingToken);
//     console.log('tokenExistingToken', tokenCache.get());
//   })
//   .catch(console.error);

// Пример использования вместе с авторизацией по почте/паролю

// authPasswordCustomer(user)
//   .then((data) => {
//     console.log('data', data);
//     console.log('token', tokenCache.get());
//     authExistingTokenCustomer()
//       .then((dataExistingToken) => {
//         console.log('dataExistingToken', dataExistingToken);
//         console.log('tokenExistingToken', tokenCache.get());
//       })
//       .catch(console.error);
//   })
//   .catch(console.error);
