import {
  type Address,
  type ClientResponse,
  type CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../../clients/BuildClient';

export interface CustomAddress extends Address {
  key: string;
}

//! В адресах обязательно должен быть ключ с типом адреса
//! key: 'firstShippingAddress' | 'firstBillingAddress',
//* Без этого адреса не смогут быть нормально обработаны

// Пользователь создан: statusCode: 201
// Пользователь уже существует: statusCode: 400
export const createCustomer = async (props: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: CustomAddress[];
}): Promise<ClientResponse<CustomerSignInResult>> => {
  const { email, password, firstName, lastName, dateOfBirth, addresses } =
    props;

  return apiRoot
    .customers()
    .post({
      body: {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
      },
    })
    .execute();
};

// Пример использования:

// const user = {
//   email: 'test9@e.e',
//   password: 'password',
//   firstName: 'f',
//   lastName: 'l',
//   dateOfBirth: '2000-01-01',
//   addresses: [
//     {
//       country: 'US',
//       city: 'co',
//       streetName: 'so',
//       postalCode: '11111',
//!      key: 'firstShippingAddress',
//     },
//     {
//       country: 'FR',
//       city: 'ct',
//       streetName: 'st',
//       postalCode: '22222',
//!      key: 'firstBillingAddress',
//     },
//   ],
// };

// createCustomer({ isCheckedCopyCheckBox, ...user })
//   .then((resp) => {
//      console.log('resp', resp);
//      firstUpdateAddress({
//        isCheckedCopyCheckBox,
//        isCheckedShipping,
//        isCheckedBilling,
//        userId: resp.body.customer.id,
//      })
//        .then((updateResp) => {
//          console.log('updateResp', updateResp);
//        })
//        .catch(console.log);
//    })
//    .catch(console.log);
