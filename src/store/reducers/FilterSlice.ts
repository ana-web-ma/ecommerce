import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IFilterState {
  searchText: null | string;
  categoryFilter: string[];
  sortDirection: boolean;
  sortType: boolean;
  productsByAttributeKey: {
    key: 'floral' | 'woody' | 'citrus' | 'amber' | 'none';
  };
  priceValue: number[];
  openFilterBar: boolean;
  filterChecked: boolean;
}

const initialState: IFilterState = {
  searchText: null,
  categoryFilter: [],
  sortDirection: true,
  sortType: false,
  productsByAttributeKey: { key: 'none' },
  priceValue: [0, 2500],
  openFilterBar: false,
  filterChecked: false,
};

export const filterSlice = createSlice({
  name: 'FilterProducts',
  initialState,
  reducers: {
    search(state: IFilterState, action: PayloadAction<string | null>) {
      state.searchText = action.payload;
    },
    sortDirectionChecked(state: IFilterState, action: PayloadAction<boolean>) {
      state.sortDirection = action.payload;
    },
    sortTypeChecked(state: IFilterState, action: PayloadAction<boolean>) {
      state.sortType = action.payload;
    },
    attributeKey(
      state: IFilterState,
      action: PayloadAction<'floral' | 'woody' | 'citrus' | 'amber' | 'none'>,
    ) {
      state.productsByAttributeKey.key = action.payload;
    },
    categoryChecked(state: IFilterState, action: PayloadAction<string[]>) {
      state.categoryFilter = action.payload;
    },
    setPriceValue(state: IFilterState, action: PayloadAction<number[]>) {
      state.priceValue = action.payload;
    },
    setOpenFilterBar(state: IFilterState, action: PayloadAction<boolean>) {
      state.openFilterBar = action.payload;
    },
    setFilterChecked(state: IFilterState, action: PayloadAction<boolean>) {
      state.filterChecked = action.payload;
    },
  },
});

export const {
  search,
  sortTypeChecked,
  sortDirectionChecked,
  attributeKey,
  categoryChecked,
  setPriceValue,
  setOpenFilterBar,
  setFilterChecked,
} = filterSlice.actions;
export default filterSlice.reducer;
