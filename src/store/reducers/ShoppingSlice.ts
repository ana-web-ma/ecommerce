import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IShoppingState {
  numberOfPurchases: number;
  arrayIdProducts: string[];
}

const initialState: IShoppingState = {
  numberOfPurchases: 0,
  arrayIdProducts: [],
};

export const shoppingSlice = createSlice({
  name: 'ShoppingBag',
  initialState,
  reducers: {
    setNumberOfPurchases(state: IShoppingState, action: PayloadAction<number>) {
      state.numberOfPurchases = action.payload;
    },
  },
});

export const { setNumberOfPurchases } = shoppingSlice.actions;
export default shoppingSlice.reducer;
