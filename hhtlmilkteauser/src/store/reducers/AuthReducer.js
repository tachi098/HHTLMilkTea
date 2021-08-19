import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: !Object.is(localStorage.getItem("user"), null) ? JSON.parse(localStorage.getItem("user")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

const { reducer, actions } = authSlice;
export const { login, logout, register } = actions;
export default reducer;
