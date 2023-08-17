import {
  type Address,
  type ClientResponse,
  type CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../clients/BuildClient';

// Пользователь создан: statusCode: 201
// Пользователь уже существует: statusCode: 400
export const createCustomer = async (props: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
}): Promise<ClientResponse<CustomerSignInResult>> => {
  return apiRoot
    .customers()
    .post({
      body: {
        email: props.email,
        password: props.password,
        firstName: props.firstName,
        lastName: props.lastName,
        dateOfBirth: props.dateOfBirth,
        addresses: props.addresses,
      },
    })
    .execute();
};

// Пример использования:

// createCustomer({ email: 'example-email.example.com', password: 'password' })
//   .then(console.log)
//   .catch(console.error);
