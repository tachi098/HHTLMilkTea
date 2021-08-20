import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataGroupOrderDetails: {},
  shortUrl: "",
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
    getShortURLFromData: (state, action) => {
      state.shortUrl = action.payload.shortUrl;
    },
    getShortURLEmpty: (state, action) => {
      state.shortUrl = "";
    },
  },
});

const { reducer, actions } = groupOrderSlice;
export const {
  getGroupOderWithUsername,
  getGroupOderWithUsernameLogout,
  getShortURLFromData,
  getShortURLEmpty,
} = actions;
export default reducer;
