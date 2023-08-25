import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Customer } from '@commercetools/platform-sdk';

interface ICustomerState {
  customer: Customer | null;
  isLogged: boolean;
}

const customerJson = localStorage.getItem('EPERFUME_CUSTOMER_DATA');

const initialState: ICustomerState = {
  customer: customerJson != null ? JSON.parse(customerJson) : null,
  isLogged: !(localStorage.getItem('EPERFUME_CUSTOMER_TOKEN') == null),
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
      localStorage.setItem('EPERFUME_CUSTOMER_TOKEN', action.payload.token);
      localStorage.setItem(
        'EPERFUME_CUSTOMER_DATA',
        JSON.stringify(action.payload.customer),
      );
    },
    logout(state: ICustomerState) {
      // eslint-disable-next-line no-param-reassign
      state.isLogged = false;
      localStorage.removeItem('EPERFUME_CUSTOMER_TOKEN');
      localStorage.removeItem('EPERFUME_CUSTOMER_DATA');
    },
  },
});

export const { login, logout } = customerSlice.actions;
export default customerSlice.reducer;
