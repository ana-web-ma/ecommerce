import {
  type ProductProjectionPagedSearchResponse,
  type Category,
  type ProductProjection,
} from '@commercetools/platform-sdk';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IProductsState {
  products: ProductProjection[];
  totalCount: number;
  pageQty: number;
  searchText: null | string;
  category: Category | null;
}

const initialState: IProductsState = {
  products: [],
  totalCount: 0,
  pageQty: 1,
  searchText: null,
  category: null,
};

export const productsSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    allProducts(
      state: IProductsState,
      action: PayloadAction<ProductProjectionPagedSearchResponse>,
    ) {
      state.products = action.payload.results;
      if (action.payload.total !== undefined) {
        state.totalCount = action.payload.total;
        state.pageQty = Math.ceil(action.payload.total / 6);
      }
    },
    search(state: IProductsState, action: PayloadAction<string | null>) {
      state.searchText = action.payload;
    },
    categoryRequest(
      state: IProductsState,
      action: PayloadAction<Category | null>,
    ) {
      state.category = action.payload;
    },
  },
});

export const { allProducts, search, categoryRequest } = productsSlice.actions;
export default productsSlice.reducer;
