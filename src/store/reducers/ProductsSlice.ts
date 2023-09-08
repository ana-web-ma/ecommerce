import {
  type ProductProjectionPagedSearchResponse,
  type Category,
  type ProductProjection,
} from '@commercetools/platform-sdk';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IProductsState {
  products: ProductProjection[];
  pageNumber: number;
  totalCount: number;
  pageQty: number;
  category: Category | null;
}

const initialState: IProductsState = {
  products: [],
  pageNumber: 1,
  totalCount: 0,
  pageQty: 1,
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
    setProducts(
      state: IProductsState,
      action: PayloadAction<ProductProjection[]>,
    ) {
      state.products = action.payload;
    },
    setPageNumber(state: IProductsState, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    categoryRequest(
      state: IProductsState,
      action: PayloadAction<Category | null>,
    ) {
      state.category = action.payload;
    },
  },
});

export const { allProducts, setProducts, setPageNumber, categoryRequest } =
  productsSlice.actions;
export default productsSlice.reducer;
