import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users/slice';
import productsReducer from './products/slice'

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer
    // podriamos incluir otros reducers como productos, compras, carritos etc
  }
});

export default store;