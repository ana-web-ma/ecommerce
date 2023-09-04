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

export const useAttributeKey = (): {
  key: 'floral' | 'woody' | 'citrus' | 'amber' | null;
} => {
  const attributeKey = useAppSelector(
    (state) => state.productsReducer.productsByAttributeKey,
  );
  return attributeKey;
};

export const useCategoryChecked = (): 'wedding' | 'summer' | 'new' | null => {
  const categoryChecked = useAppSelector(
    (state) => state.productsReducer.categoryFilter,
  );
  return categoryChecked;
};
