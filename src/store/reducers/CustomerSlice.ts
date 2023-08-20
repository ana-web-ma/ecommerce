import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICustomer {
  id: string | null;
}

interface ICustomerState {
  customer: ICustomer;
  isLogged: boolean;
}

const initialState: ICustomerState = {
  customer: {
    id: null,
  },
  isLogged: !(localStorage.getItem('EPERFUME_CUSTOMER_TOKEN') == null),
};

interface ILoginData {
  customerId: string;
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
      state.customer.id = action.payload.customerId;
      localStorage.setItem('EPERFUME_CUSTOMER_TOKEN', action.payload.token);
    },
    logout(state: ICustomerState) {
      // eslint-disable-next-line no-param-reassign
      state.isLogged = false;
      localStorage.removeItem('EPERFUME_CUSTOMER_TOKEN');
    },
  },
});

export const { login, logout } = customerSlice.actions;
export default customerSlice.reducer;
