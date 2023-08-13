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
  isLogged: false,
};

export const customerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    login(state: ICustomerState, action: PayloadAction<string>) {
      const newState = { ...state };
      newState.customer.id = action.payload;
      newState.isLogged = true;
    },
  },
});

export const { login } = customerSlice.actions;
export default customerSlice.reducer;
