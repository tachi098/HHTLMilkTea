import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spinners: [],
  segments: [],
  segColors: [],
  isLoading: false,
};

const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    findAll: (state, action) => {
      state.spinners = action.payload.spinners;
      state.segments = action.payload.segments;
      state.segColors = action.payload.segColors;
      state.isLoading = true;
    },
    save: (state, action) => {
      state.spinners.push(action.payload);
      state.segments.push(action.payload.name);
      state.segColors.push(action.payload.color);
      state.isLoading = true;
    },
    remove: (state, action) => {
      state.spinners = state.spinners.filter(
        (spinner) => !Object.is(spinner.id, action.payload)
      );
      state.isLoading = true;
    },
  },
});

const { reducer, actions } = spinnerSlice;
export const { findAll, save, remove } = actions;
export default reducer;
