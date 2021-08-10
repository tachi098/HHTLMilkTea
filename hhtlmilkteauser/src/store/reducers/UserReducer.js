import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  customer: {}
};

const userSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    userbyusername: (state, action) => {
      state.customer = action.payload.user;
    },
    profileUpdate: (state, action) => {
      console.log({ action })
      state.customer = action.payload;
    }
  },
});

const {
  reducer,
  actions
} = userSlice;
export const {
  userbyusername,
  profileUpdate
} = actions;
export default reducer;