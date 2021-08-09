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
    onStatus: (state, action) => {
      const index = state.users.findIndex((u) =>
        Object.is(u.username, action.payload.username)
      );
      state.users[index].deletedAt = action.payload.deletedAt;
    },
  },
});

const { reducer, actions } = UserSlice;
export const { getUsers, onStatus } = actions;
export default reducer;
