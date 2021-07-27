import { configureStore } from "@reduxjs/toolkit";
import SpinnerReducer from "./reducers/SpinnerReducer";
import AuthReducer from "./reducers/AuthReducer";

const store = configureStore({
  reducer: {
    spinner: SpinnerReducer,
    auth: AuthReducer,
  },
});

export default store;
