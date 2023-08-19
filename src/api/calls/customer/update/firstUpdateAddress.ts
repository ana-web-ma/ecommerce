import {
  type CustomerUpdateAction,
  type Address,
  type ClientResponse,
  type Customer,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../../../clients/BuildClient';

export interface CustomAddress extends Address {
  readonly addressType: 'shipping' | 'billing' | 'both';
  readonly defaultType?: 'shipping' | 'billing' | 'both';
}

//! В адресах обязательно должен быть ключ с типом адреса
//! key: 'firstShippingAddress' | 'firstBillingAddress',
//* Без этого адреса не смогут быть нормально обработаны

export const firstUpdateAddress = async (props: {
  userId: string;
  isCheckedShipping: boolean;
  isCheckedBilling: boolean;
  isCheckedCopyCheckBox: boolean;
}): Promise<ClientResponse<Customer>> => {
  const actions: CustomerUpdateAction[] = [
    {
      action: 'addShippingAddressId',
      addressKey: props.isCheckedCopyCheckBox
        ? 'firstBothAddress'
        : 'firstShippingAddress',
    },
    {
      action: 'addBillingAddressId',
      addressKey: props.isCheckedCopyCheckBox
        ? 'firstBothAddress'
        : 'firstBillingAddress',
    },
  ];

  if (props.isCheckedShipping) {
    actions.push({
      action: 'setDefaultShippingAddress',
      addressKey: props.isCheckedCopyCheckBox
        ? 'firstBothAddress'
        : 'firstShippingAddress',
    });
  }
  if (props.isCheckedBilling) {
    actions.push({
      action: 'setDefaultBillingAddress',
      addressKey: props.isCheckedCopyCheckBox
        ? 'firstBothAddress'
        : 'firstBillingAddress',
    });
  }

  return apiRoot
    .customers()
    .withId({ ID: props.userId })
    .post({
      body: {
        version: 1,
        actions,
      },
    })
    .execute();
};

// Пример использования:

// const user = {
//   email: 'test4@e.e',
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

// createCustomer(user)
// .then((resp) => {
// firstUpdateAddress({
//   userId: resp.body.customer.id,
//   isCheckedShipping: true,
//   isCheckedBilling: false,
// })
//   .then((updateResp) => {
//     console.log('updateResp', updateResp);
//   })
//   .catch(console.log);
// })
// .catch(console.log);
