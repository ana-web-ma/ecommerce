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
  categoryFilter: 'wedding' | 'summer' | 'new' | null;
  sortDirection: boolean;
  sortType: boolean;
  productsByAttributeKey: {
    key: 'floral' | 'woody' | 'citrus' | 'amber' | null;
  };
}

const initialState: IProductsState = {
  products: [],
  totalCount: 0,
  pageQty: 1,
  searchText: null,
  category: null,
  categoryFilter: null,
  sortDirection: true,
  sortType: false,
  productsByAttributeKey: { key: null },
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
    sortDirectionChecked(
      state: IProductsState,
      action: PayloadAction<boolean>,
    ) {
      state.sortDirection = action.payload;
    },
    sortTypeChecked(state: IProductsState, action: PayloadAction<boolean>) {
      state.sortType = action.payload;
    },
    attributeKey(
      state: IProductsState,
      action: PayloadAction<'floral' | 'woody' | 'citrus' | 'amber' | null>,
    ) {
      state.productsByAttributeKey.key = action.payload;
    },
    categoryChecked(
      state: IProductsState,
      action: PayloadAction<'wedding' | 'summer' | 'new' | null>,
    ) {
      state.categoryFilter = action.payload;
    },
  },
});

export const {
  allProducts,
  search,
  categoryRequest,
  sortTypeChecked,
  sortDirectionChecked,
  attributeKey,
  categoryChecked,
} = productsSlice.actions;
export default productsSlice.reducer;
