import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vouchers: [],
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    list: (state, action) => {
      state.vouchers = action.payload;
    },
  },
});

const { reducer, actions } = voucherSlice;
export const { list } = actions;
export default reducer;
