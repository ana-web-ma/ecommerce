import {
  type Customer,
  type ClientResponse,
  type CartPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../clients/ExistingTokenFlowClient';

// Запрашивает данные корзины пользователя
// В get() можно добавить параметры
// Токен подходит: statusCode: 200
export const getMyCart = async (): Promise<
  ClientResponse<CartPagedQueryResponse>
> => apiRootCreateByToken().me().carts().get().execute();

// Пример использования:

//   getMyCart()
//     .then((userCartData) => {
//       console.log('userCartData', userCartData);
//     })
//     .catch(console.error);
