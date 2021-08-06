import {
  configureStore
} from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    customer: UserReducer
  },
});

export default store;