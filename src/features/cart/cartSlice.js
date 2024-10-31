import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    valueUpdate: (state, action) => {
      const product = state.find((product) => product.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    valueDecrement: (state, action) => {
      const product = state.find((product) => product.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    emptyCart: (state, action) => {
      state.length = 0; // Clear the array
    }
  }
});

export const { addProduct, removeProduct, valueUpdate, valueDecrement, emptyCart } = productSlice.actions;
export default productSlice.reducer;

export const selectProductById = (state, productId) =>
  state.products.find((product) => product.id === productId);
