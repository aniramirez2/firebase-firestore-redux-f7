import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "product",
  initialState: {
    products: [], // me almacena objetos
    error: null,
  },
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    addProductSlice: (state, action) => {
      state.products.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // pendiente agregar el action de editar productos
    //pendiente agregar el action de eliminar
  },
});

export const { setProduct, setError, addProductSlice } = productsSlice.actions;
export default productsSlice.reducer; // productReducer productReducer
