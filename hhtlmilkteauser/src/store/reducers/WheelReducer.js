import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wheels: [],
};

const wheelSclice = createSlice({
  name: "wheel",
  initialState,
  reducers: {
    findAll: (state, action) => {
      const list = Array.from(action.payload.wheelHistories).sort(
        (a, b) => b.id - a.id
      );

      const listShow = [];

      for (let i = 0; i <= 6; i++) {
        listShow.push(list[i]);
      }

      state.wheels = listShow;
    },
  },
});

const { reducer, actions } = wheelSclice;
export const { findAll } = actions;
export default reducer;
