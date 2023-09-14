import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { type Cart, type Customer } from '@commercetools/platform-sdk';
import { type RootState, type AppDispatch } from '../../store/Store';
import { type IProductsState } from '../../store/reducers/ProductsSlice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Customer
export const useIsLogged = (): boolean => {
  const { isLogged } = useAppSelector((state) => state.customerReducer);
  return isLogged;
};

export const useIsToken = (): boolean => {
  const { isToken } = useAppSelector((state) => state.customerReducer);
  return isToken;
};

export const useCustomer = (): Customer | null => {
  const { customer } = useAppSelector((state) => state.customerReducer);
  return customer;
};

// Products
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

export const useIsLoading = (): boolean => {
  const loading = useAppSelector((state) => state.productsReducer.isLoading);
  return loading;
};

// Filter
export const useSearchText = (): string | null => {
  const { searchText } = useAppSelector((state) => state.filterReducer);
  return searchText;
};

export const useSortType = (): boolean => {
  const sortType = useAppSelector((state) => state.filterReducer.sortType);
  return sortType;
};

export const useSortDirection = (): boolean => {
  const sortDirection = useAppSelector(
    (state) => state.filterReducer.sortDirection,
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
    (state) => state.filterReducer.productsByAttributeKey.key,
  );
  return attributeKey;
};

export const useCategoryChecked = (): string[] => {
  const categoryChecked = useAppSelector(
    (state) => state.filterReducer.categoryFilter,
  );
  return categoryChecked;
};

export const usePriceValue = (): number[] => {
  const PriceValue = useAppSelector((state) => state.filterReducer.priceValue);
  return PriceValue;
};

export const useOpenFilterBar = (): boolean => {
  const openFilterBar = useAppSelector(
    (state) => state.filterReducer.openFilterBar,
  );
  return openFilterBar;
};

export const useFilterChecked = (): boolean => {
  const filterChecked = useAppSelector(
    (state) => state.filterReducer.filterChecked,
  );
  return filterChecked;
};

// Shopping bag
export const useNumberOfPurchases = (): number => {
  const numberOfPurchases = useAppSelector(
    (state) => state.shoppingReducer.numberOfPurchases,
  );
  return numberOfPurchases;
};

export const useArrayProductsKeysFromCart = (): string[] => {
  const arrayFromCart = useAppSelector(
    (state) => state.shoppingReducer.arrayKeysProducts,
  );
  return arrayFromCart;
};

export const useCart = (): Cart | null => {
  const CartData = useAppSelector((state) => state.shoppingReducer.cart);
  return CartData;
};

export const useIdCart = (): string => {
  const IdCart = useAppSelector((state) => state.shoppingReducer.cashCart.id);
  return IdCart !== null ? IdCart : '';
};

export const useVersionCart = (): number => {
  const VersionCart = useAppSelector(
    (state) => state.shoppingReducer.cashCart.version,
  );
  return VersionCart;
};

export const useSendRequest = (): boolean => {
  const sendRequest = useAppSelector(
    (state) => state.shoppingReducer.sendRequest,
  );
  return sendRequest;
};
