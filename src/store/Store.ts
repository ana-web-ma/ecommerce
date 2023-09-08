import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customerReducer from './reducers/CustomerSlice';
import productsReducer from './reducers/ProductsSlice';
import filterReducer from './reducers/FilterSlice';
import shoppingReducer from './reducers/ShoppingSlice';

const rootReducer = combineReducers({
  customerReducer,
  productsReducer,
  filterReducer,
  shoppingReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
