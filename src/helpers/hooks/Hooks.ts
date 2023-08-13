import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { type RootState, type AppDispatch } from '../../store/Store';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useIsLogged = (): boolean => {
  const { isLogged } = useAppSelector((state) => state.customerReducer);
  return isLogged;
};
