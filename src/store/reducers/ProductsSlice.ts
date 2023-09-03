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
  searchText: null | string;
  category: Category | null;
  categoryFilter: string[];
  sortDirection: boolean;
  sortType: boolean;
  productsByAttributeKey: {
    key: 'floral' | 'woody' | 'citrus' | 'amber' | 'none';
  };
  priceValue: number[];
  openFilterBar: boolean;
}

const initialState: IProductsState = {
  products: [],
  pageNumber: 1,
  totalCount: 0,
  pageQty: 1,
  searchText: null,
  category: null,
  categoryFilter: [],
  sortDirection: true,
  sortType: false,
  productsByAttributeKey: { key: 'none' },
  priceValue: [0, 2500],
  openFilterBar: false,
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
      action: PayloadAction<'floral' | 'woody' | 'citrus' | 'amber' | 'none'>,
    ) {
      state.productsByAttributeKey.key = action.payload;
    },
    categoryChecked(state: IProductsState, action: PayloadAction<string[]>) {
      state.categoryFilter = action.payload;
    },
    setPriceValue(state: IProductsState, action: PayloadAction<number[]>) {
      state.priceValue = action.payload;
    },
    setOpenFilterBar(state: IProductsState, action: PayloadAction<boolean>) {
      state.openFilterBar = action.payload;
    },
  },
});

export const {
  allProducts,
  setProducts,
  search,
  setPageNumber,
  categoryRequest,
  sortTypeChecked,
  sortDirectionChecked,
  attributeKey,
  categoryChecked,
  setPriceValue,
  setOpenFilterBar,
} = productsSlice.actions;
export default productsSlice.reducer;
