import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customerReducer from './reducers/CustomerSlice';
import productsReducer from './reducers/ProductsSlice';

const rootReducer = combineReducers({
  customerReducer,
  productsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
