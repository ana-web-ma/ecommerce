import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IShoppingState {
  numberOfPurchases: number;
  arrayKeysProducts: string[];
}

const initialState: IShoppingState = {
  numberOfPurchases: 0,
  arrayKeysProducts: [],
};

export const shoppingSlice = createSlice({
  name: 'ShoppingBag',
  initialState,
  reducers: {
    addToCart(state: IShoppingState, action: PayloadAction<string>) {
      state.arrayKeysProducts.push(action.payload);
    },
    removeFromCart(state: IShoppingState, action: PayloadAction<string>) {
      const index = state.arrayKeysProducts.indexOf(action.payload);
      if (index > -1) {
        state.arrayKeysProducts.splice(index, 1);
      }
    },
    setNumberOfPurchases(state: IShoppingState, action: PayloadAction<number>) {
      state.numberOfPurchases = action.payload;
    },
  },
});

export const { setNumberOfPurchases, addToCart, removeFromCart } =
  shoppingSlice.actions;
export default shoppingSlice.reducer;
