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
    productUpdate(state, action) {
      const { id, name, title, additionOptions, sizeOptions, categoryId, linkImage } = action.payload;
      const existingProduct = state.products.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.title = title;
        existingProduct.additionOptions = additionOptions;
        existingProduct.sizeOptions = sizeOptions;
        existingProduct.categoryId = categoryId;
        existingProduct.linkImage = linkImage;
      }
    }
  },
});

const { reducer, actions } = ProductSlice;
export const { getProducts, productAdded, productUpdate } = actions;
export default reducer;