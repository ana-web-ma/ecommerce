import {
  type Customer,
  type MyCustomerUpdateAction,
  type BaseAddress,
  type ClientResponse,
} from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../../../clients/ExistingTokenFlowClient';
import { getMe } from '../../getMe';

export const updateMe = async (props: {
  id: string;
  changeEmail?: {
    newEmail: string;
  };
  setFirstName?: {
    newFirstName: string;
  };
  setLastName?: {
    newLastName: string;
  };
  addAddress?: {
    address: BaseAddress;
  };
  changeAddress?: {
    addressId: string;
    address: BaseAddress;
  };
  removeAddress?: {
    addressId: string;
  };
  setDefaultShippingAddress?: {
    addressId: string | undefined;
  };
  addShippingAddressId?: {
    addressId: string | undefined;
  };
  removeShippingAddressId?: {
    addressId: string;
  };
  setDefaultBillingAddress?: {
    addressId: string | undefined;
  };
  addBillingAddressId?: {
    addressId: string | undefined;
  };
  removeBillingAddressId?: {
    addressId: string;
  };
  setDateOfBirth?: {
    dateOfBirth: string;
  };
}): Promise<ClientResponse<Customer>> => {
  const actions: MyCustomerUpdateAction[] = [];

  if (props.changeEmail != null) {
    actions.push({
      action: 'changeEmail',
      email: props.changeEmail.newEmail,
    });
  }
  if (props.setFirstName != null) {
    actions.push({
      action: 'setFirstName',
      firstName: props.setFirstName.newFirstName,
    });
  }
  if (props.setLastName != null) {
    actions.push({
      action: 'setLastName',
      lastName: props.setLastName.newLastName,
    });
  }
  if (props.addAddress != null) {
    actions.push({
      action: 'addAddress',
      address: props.addAddress.address,
    });
  }
  if (props.changeAddress != null) {
    actions.push({
      action: 'changeAddress',
      address: props.changeAddress.address,
      addressId: props.changeAddress.addressId,
    });
  }
  if (props.removeAddress != null) {
    actions.push({
      action: 'removeAddress',
      addressId: props.removeAddress.addressId,
    });
  }
  if (props.setDefaultShippingAddress != null) {
    actions.push({
      action: 'setDefaultShippingAddress',
      addressId: props.setDefaultShippingAddress.addressId,
    });
  }
  if (props.addShippingAddressId != null) {
    actions.push({
      action: 'addShippingAddressId',
      addressId: props.addShippingAddressId.addressId,
    });
  }
  if (props.removeShippingAddressId != null) {
    actions.push({
      action: 'removeShippingAddressId',
      addressId: props.removeShippingAddressId.addressId,
    });
  }
  if (props.setDefaultBillingAddress != null) {
    actions.push({
      action: 'setDefaultBillingAddress',
      addressId: props.setDefaultBillingAddress.addressId,
    });
  }
  if (props.addBillingAddressId != null) {
    actions.push({
      action: 'addBillingAddressId',
      addressId: props.addBillingAddressId.addressId,
    });
  }
  if (props.removeBillingAddressId != null) {
    actions.push({
      action: 'removeBillingAddressId',
      addressId: props.removeBillingAddressId.addressId,
    });
  }
  if (props.setDateOfBirth != null) {
    actions.push({
      action: 'setDateOfBirth',
      dateOfBirth: props.setDateOfBirth.dateOfBirth,
    });
  }

  return apiRootCreateByToken()
    .me()
    .post({
      body: { version: (await getMe({ id: props.id })).body.version, actions },
    })
    .execute();
};

// How to use

// updateMe({
//   id: '703242c5-49a2-4dc0-83f5-08e3cc0e6d4d',
//   setFirstName: {
//     newFirstName: 'NewFirstName',
//   },
// })
//   .then((updateResp) => {
//     console.log('updateResp', updateResp);
//   })
//   .catch(console.log);

// Use after authPasswordCustomer
// authPasswordCustomer({ email: 'a@a.aa', password: '!1Aaaaaa' })
// .then((customerResp) => {
//   console.log('customerResp', customerResp);
//   updateMe({
//     id: customerResp.body.customer.id,
//     setFirstName: {
//       newFirstName: 'firstNameNew',
//     },
//   })
//     .then((updateResp) => {
//       console.log('updateResp', updateResp);
//     })
//     .catch(console.log);
// })
// .catch(console.log);
