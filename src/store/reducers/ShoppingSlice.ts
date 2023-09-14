import { type Cart } from '@commercetools/platform-sdk';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IShoppingState {
  numberOfPurchases: number;
  arrayKeysProducts: string[];
  cart: Cart | null;
  cashCart: {
    id: string | null;
    version: number;
  };
  sendRequest: boolean;
}

const initialState: IShoppingState = {
  numberOfPurchases: 0,
  arrayKeysProducts: [],
  cart: null,
  cashCart: {
    id: null,
    version: 0,
  },
  sendRequest: false,
};

export const shoppingSlice = createSlice({
  name: 'ShoppingBag',
  initialState,
  reducers: {
    addToCart(state: IShoppingState, action: PayloadAction<string>) {
      if (!state.arrayKeysProducts.includes(action.payload)) {
        state.arrayKeysProducts.push(action.payload);
      }
    },
    removeFromCart(state: IShoppingState, action: PayloadAction<string>) {
      const index = state.arrayKeysProducts.indexOf(action.payload);
      if (index > -1) {
        state.arrayKeysProducts.splice(index, 1);
      }
    },
    resetNumberOfPurchases(state: IShoppingState) {
      state.numberOfPurchases = 0;
    },
    addNumberOfPurchases(state: IShoppingState, action: PayloadAction<number>) {
      state.numberOfPurchases += action.payload;
    },
    setCart(state: IShoppingState, action: PayloadAction<Cart>) {
      state.cart = action.payload;
    },
    setCartIdAndVersion(
      state: IShoppingState,
      action: PayloadAction<{ id: string; version: number }>,
    ) {
      state.cashCart.id = action.payload.id;
      state.cashCart.version = action.payload.version;
    },
    setCartVersion(state: IShoppingState, action: PayloadAction<number>) {
      state.cashCart.version = action.payload;
    },
    setSendRequest(state: IShoppingState, action: PayloadAction<boolean>) {
      state.sendRequest = action.payload;
    },
  },
});

export const {
  resetNumberOfPurchases,
  addNumberOfPurchases,
  addToCart,
  removeFromCart,
  setCart,
  setCartIdAndVersion,
  setCartVersion,
  setSendRequest,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;
