import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataGroupOrderDetails: {},
};

const groupOrderSlice = createSlice({
  name: "groupOrder",
  initialState,
  reducers: {
    getGroupOderWithUsername: (state, action) => {
      state.dataGroupOrderDetails = action.payload;
    },
    getGroupOderWithUsernameLogout: (state, action) => {
      state.dataGroupOrderDetails = {};
    },
  },
});

const { reducer, actions } = groupOrderSlice;
export const { getGroupOderWithUsername, getGroupOderWithUsernameLogout } =
  actions;
export default reducer;
