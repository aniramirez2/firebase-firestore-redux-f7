import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "product",
  initialState: {
    products: [], // me almacena objetos
    error: null,
  },
  reducers: {
    setProduct: (state, action) => {
      console.log("products", action.payload);
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      console.log("actions", action);
      state.products = [...state.products, ...action.payload];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // pendiente agregar el action de editar productos
    //pendiente agregar el action de eliminar
  },
});

export const { setProduct, setError } = productsSlice.actions;
export default productsSlice.reducer; // productReducer productReducer
