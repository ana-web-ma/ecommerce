import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { type Customer } from '@commercetools/platform-sdk';
import { type RootState, type AppDispatch } from '../../store/Store';
import { type IProductsState } from '../../store/reducers/ProductsSlice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useIsLogged = (): boolean => {
  const { isLogged } = useAppSelector((state) => state.customerReducer);
  return isLogged;
};

export const useCustomer = (): Customer | null => {
  const { customer } = useAppSelector((state) => state.customerReducer);
  return customer;
};

export const useSearchText = (): string | null => {
  const { searchText } = useAppSelector((state) => state.productsReducer);
  return searchText;
};

export const useAllProducts = (): IProductsState => {
  const data = useAppSelector((state) => state.productsReducer);
  return data;
};

export const useGetPageNumber = (): number => {
  const pageNumber = useAppSelector(
    (state) => state.productsReducer.pageNumber,
  );
  return pageNumber;
};

export const useSortType = (): boolean => {
  const sortType = useAppSelector((state) => state.productsReducer.sortType);
  return sortType;
};

export const useSortDirection = (): boolean => {
  const sortDirection = useAppSelector(
    (state) => state.productsReducer.sortDirection,
  );
  return sortDirection;
};

export const useAttributeKey = ():
  | 'floral'
  | 'woody'
  | 'citrus'
  | 'amber'
  | 'none' => {
  const attributeKey = useAppSelector(
    (state) => state.productsReducer.productsByAttributeKey.key,
  );
  return attributeKey;
};

export const useCategoryChecked = (): string[] => {
  const categoryChecked = useAppSelector(
    (state) => state.productsReducer.categoryFilter,
  );
  return categoryChecked;
};

export const usePriceValue = (): number[] => {
  const PriceValue = useAppSelector(
    (state) => state.productsReducer.priceValue,
  );
  return PriceValue;
};

export const useOpenFilterBar = (): boolean => {
  const openFilterBar = useAppSelector(
    (state) => state.productsReducer.openFilterBar,
  );
  return openFilterBar;
};

export const useFilterChecked = (): boolean => {
  const filterChecked = useAppSelector(
    (state) => state.productsReducer.filterChecked,
  );
  return filterChecked;
};
