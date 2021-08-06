import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  totalPages: 1,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.totalPages = action.payload.totalPages;
      state.users = action.payload.content;
    },
  },
});

const { reducer, actions } = UserSlice;
export const { getUsers } = actions;
export default reducer;
