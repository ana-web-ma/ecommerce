import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customerReducer from './reducers/CustomerSlice';

const rootReducer = combineReducers({
  customerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
