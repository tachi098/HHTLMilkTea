import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

const initialState = {
  user: {}
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
