import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

export default store;
