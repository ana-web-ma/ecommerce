import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { type Customer } from '@commercetools/platform-sdk';
import { type RootState, type AppDispatch } from '../../store/Store';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useIsLogged = (): boolean => {
  const { isLogged } = useAppSelector((state) => state.customerReducer);
  return isLogged;
};

interface ICustomer {
  id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  email: string | undefined;
  addressShipping: IAddress[] | undefined;
}

interface IAddress {
  city: string | undefined;
  country: string | undefined;
  post: string | undefined;
  street: string | undefined;
  shipping: boolean | undefined;
  billing: boolean | undefined;
  billingDefault: boolean | undefined;
  shippingDefault: boolean | undefined;
}

export const useDataCustomer = (): ICustomer => {
  const { customer } = useAppSelector((state) => state.customerReducer);
  const dataCustomer = {
    id: customer?.id,
    firstName: customer?.firstName,
    lastName: customer?.lastName,
    dateOfBirth: customer?.dateOfBirth,
    email: customer?.email,
    addressShipping: customer?.addresses.map((address) => {
      return {
        city: address.city,
        country: address.country,
        post: address.postalCode,
        street: address.streetName,
        shipping:
          address.id !== undefined
            ? customer?.shippingAddressIds?.includes(address.id)
            : false,
        billing:
          address.id !== undefined
            ? customer?.billingAddressIds?.includes(address.id)
            : false,
        billingDefault: address.id === customer?.defaultBillingAddressId,
        shippingDefault: address.id === customer?.defaultShippingAddressId,
      };
    }),
  };
  return dataCustomer;
};

export const useCustomer = (): Customer | null => {
  const { customer } = useAppSelector((state) => state.customerReducer);
  return customer;
};

export const useSearchText = (): string | null => {
  const { searchText } = useAppSelector((state) => state.customerReducer);
  return searchText;
};
