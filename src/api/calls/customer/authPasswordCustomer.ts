import {
  type ClientResponse,
  type CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiPasswordFlowRoot } from '../../clients/PasswordFlowClient';

// Пользователь найден: statusCode: 200
// Неправильный email или пароль: statusCode: 400
// Возвращает данные пользователя и сохраняет токен
export const authPasswordCustomer = async (props: {
  email: string;
  password: string;
}): Promise<ClientResponse<CustomerSignInResult>> => {
  return apiPasswordFlowRoot({
    username: props.email,
    password: props.password,
  })
    .me()
    .login()
    .post({
      body: {
        email: props.email,
        password: props.password,
      },
    })
    .execute();
};

// Пример использования:

// authPasswordCustomer({
//   email: 'example-email.example.com',
//   password: 'password',
// })
//   .then((data) => {
//     console.log('data', data);
//   })
//   .catch(console.error);
