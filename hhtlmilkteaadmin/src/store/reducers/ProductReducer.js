import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPages: 1,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.totalPages = action.payload.totalPages;
      state.products = action.payload.content;
    },
    productAdded: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

const { reducer, actions } = ProductSlice;
export const { getProducts, productAdded } = actions;
export default reducer;
