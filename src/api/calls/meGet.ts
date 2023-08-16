import {
  type Customer,
  type ClientResponse,
} from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../clients/ExistingTokenFlowClient';

// Запрашивает данные авторизованного пользователя
// Токен подходит: statusCode: 200
export const meGet = async (): Promise<ClientResponse<Customer>> =>
  apiRootCreateByToken().me().get().execute();

// Пример использования:

//   meGet()
//     .then((loggedUserData) => {
//       console.log('loggedUserData', loggedUserData);
//     })
//     .catch(console.error);

// Пример использования вместе с авторизацией по почте/паролю
// Сразу после логина запрашивает данные пользователя
// Данные те же, что и при authPasswordCustomer

// authPasswordCustomer(user)
// .then((userData) => {
//   console.log('userData', userData);
//   meGet()
//     .then((loggedUserData) => {
//       console.log('loggedUserData', loggedUserData);
//     })
//     .catch(console.error);
// })
// .catch(console.error);
