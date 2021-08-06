import { configureStore } from "@reduxjs/toolkit";
import SpinnerReducer from "./reducers/SpinnerReducer";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";

const store = configureStore({
  reducer: {
    spinner: SpinnerReducer,
    auth: AuthReducer,
    user: UserReducer,
  },
});

export default store;
