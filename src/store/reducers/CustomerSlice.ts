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
  isLogged: !(localStorage.getItem('isLogged') == null),
};

export const customerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    login(state: ICustomerState, action: PayloadAction<string>) {
      // eslint-disable-next-line no-param-reassign
      state.isLogged = true;
      // eslint-disable-next-line no-param-reassign
      state.customer.id = action.payload;
      localStorage.setItem('isLogged', 'LOGGED');
    },
    logout(state: ICustomerState) {
      // eslint-disable-next-line no-param-reassign
      state.isLogged = false;
      localStorage.removeItem('isLogged');
    },
  },
});

export const { login, logout } = customerSlice.actions;
export default customerSlice.reducer;
