import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spinners: [],
  isLoading: false,
};

const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    findByAll: (state, action) => {
      state.spinners = action.payload;
      state.isLoading = true;
    },
  },
});

const { reducer, actions } = spinnerSlice;
export const { findByAll } = actions;
export default reducer;
