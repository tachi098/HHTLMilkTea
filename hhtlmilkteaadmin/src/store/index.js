import { configureStore } from "@reduxjs/toolkit";
import SpinnerReducer from "./reducers/SpinnerReducer";

const store = configureStore({
  reducer: {
    spinner: SpinnerReducer,
  },
});

export default store;
