import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  message: "",
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
    register: (state, action) => {
      state.message = Object.is(action.payload.message, "Đăng ký thành công")
        ? ""
        : action.payload.message;
    },
  },
});

const { reducer, actions } = authSlice;
export const { login, logout, register } = actions;
export default reducer;
