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
  isCheckedCopyCheckBox: boolean;
  userId: string;
  isCheckedShipping: boolean;
  isCheckedBilling: boolean;
}): Promise<ClientResponse<Customer>> => {
  const actions: CustomerUpdateAction[] = [
    { action: 'addShippingAddressId', addressKey: 'firstShippingAddress' },
  ];

  if (props.isCheckedCopyCheckBox) {
    if (props.isCheckedShipping) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressKey: 'firstShippingAddress',
      });
    }
    if (props.isCheckedBilling) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressKey: 'firstShippingAddress',
      });
    }
  } else {
    actions.push({
      action: 'addBillingAddressId',
      addressKey: 'firstBillingAddress',
    });
    if (props.isCheckedShipping) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressKey: 'firstShippingAddress',
      });
    }
    if (props.isCheckedBilling) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressKey: 'firstBillingAddress',
      });
    }
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
