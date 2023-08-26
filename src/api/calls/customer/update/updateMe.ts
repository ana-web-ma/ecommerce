import {
  type Customer,
  type MyCustomerUpdateAction,
  type BaseAddress,
} from '@commercetools/platform-sdk';
import { type ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';
import { apiRoot } from '../../../clients/BuildClient';

export const updateMe = async (props: {
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
    addressId: string;
  };
  addShippingAddressId?: {
    addressId: string;
  };
  removeShippingAddressId?: {
    addressId: string;
  };
  setDefaultBillingAddress?: {
    addressId: string;
  };
  addBillingAddressId?: {
    addressId: string;
  };
  removeBillingAddressId?: {
    addressId: string;
  };
  setDateOfBirth?: {
    dateOfBirth: string;
  };
}): Promise<ApiRequest<Customer>> => {
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

  return apiRoot.me().post({ body: { version: 1, actions } });
};
