import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

const userSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    userbyusername: (state, action) => {
      state.customer = action.payload.user;
    },
  },
});

const {
  reducer,
  actions
} = userSlice;
export const {
  userbyusername
} = actions;
export default reducer;