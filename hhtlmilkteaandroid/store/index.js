import {
  configureStore
} from "@reduxjs/toolkit";
import ProductReducer from "./reducers/ProductReducer";
import AuthReducer from "./reducers/AuthReducer";


const store = configureStore({
  reducer: {
    product: ProductReducer,
    auth: AuthReducer,
  },
});

export default store;