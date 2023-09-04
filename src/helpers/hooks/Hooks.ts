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

export const useCustomer = (): Customer | null => {
  const { customer } = useAppSelector((state) => state.customerReducer);
  return customer;
};
