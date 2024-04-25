import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    // podriamos incluir otros reducers como productos, compras, carritos etc
  }
});

export default store;