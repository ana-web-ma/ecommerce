import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Customer } from '@commercetools/platform-sdk';
import { tokenCache } from '../../api/tokenCache';

interface ICustomerState {
  customer: Customer | null;
  id: string | null;
  searchText: string | null;
  isLogged: boolean;
}

const initialState: ICustomerState = {
  customer: null,
  isLogged: localStorage.getItem('EPERFUME_CUSTOMER_ID') !== null,
  id: null,
  searchText: null,
};

interface ILoginData {
  customer: Customer;
  token: string;
}

export const customerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    login(state: ICustomerState, action: PayloadAction<ILoginData>) {
      // eslint-disable-next-line no-param-reassign
      state.isLogged = true;
      // eslint-disable-next-line no-param-reassign
      state.customer = action.payload.customer;
      localStorage.setItem(
        'EPERFUME_CUSTOMER_ID',
        JSON.stringify(action.payload.customer.id),
      );
    },
    setCustomer(state: ICustomerState, action: PayloadAction<Customer>) {
      // eslint-disable-next-line no-param-reassign
      state.customer = action.payload;
    },
    logout(state: ICustomerState) {
      // eslint-disable-next-line no-param-reassign
      state.isLogged = false;
      tokenCache.set({ expirationTime: 0, token: '' });
      localStorage.removeItem('EPERFUME_CUSTOMER_ID');
    },
    search(state: ICustomerState, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.searchText = action.payload;
    },
  },
});

export const { login, logout, search, setCustomer } = customerSlice.actions;
export default customerSlice.reducer;
