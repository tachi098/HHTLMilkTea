import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
  quantity: 0,
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    add: (state, action) => {
      state.order = action.payload.order;
      state.quantity = action.payload.quantity;
      state.totalPrice = action.payload.totalPrice;
    },
    find: (state, action) => {
      state.order = action.payload.order;
      state.quantity = action.payload.quantity;
      state.totalPrice = action.payload.totalPrice;
    },
    update: (state, action) => {
      state.order = action.payload.order;
      state.quantity = action.payload.quantity;
      state.totalPrice = action.payload.totalPrice;
    },
    deleteOrderDetail: (state, action) => {
      state.order = action.payload.order;
      state.quantity = action.payload.quantity;
      state.totalPrice = action.payload.totalPrice;
    },
    checkoutSuccess: (state, action) => {
      state.order = {};
      state.quantity = 0;
      state.totalPrice = 0;
    },
    logoutOrder: (state, action) => {
      state.order = {};
      state.quantity = 0;
      state.totalPrice = 0;
    },
    ratingOrder(state){
      state.order.rating = true;
    }
  },
});

const { reducer, actions } = orderSlice;
export const {
  add,
  deleteOrderDetail,
  find,
  update,
  checkoutSuccess,
  logoutOrder,
  ratingOrder,
} = actions;
export default reducer;
