import {
  configureStore
} from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import ProductReducer from "./reducers/ProductReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    customer: UserReducer,
    product: ProductReducer
  },
});

export default store;