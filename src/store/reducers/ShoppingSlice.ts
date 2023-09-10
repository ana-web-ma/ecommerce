import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IShoppingState {
  numberOfPurchases: number;
  arrayKeysProducts: string[];
  cashAnonimusCart: {
    id: string | null;
    version: number;
  };
}

const initialState: IShoppingState = {
  numberOfPurchases: 0,
  arrayKeysProducts: [],
  cashAnonimusCart: {
    id: null,
    version: 0,
  },
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
    setAnonimusCart(
      state: IShoppingState,
      action: PayloadAction<{ id: string; version: number }>,
    ) {
      state.cashAnonimusCart.id = action.payload.id;
      state.cashAnonimusCart.version = action.payload.version;
    },
  },
});

export const {
  setNumberOfPurchases,
  addToCart,
  removeFromCart,
  setAnonimusCart,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;
