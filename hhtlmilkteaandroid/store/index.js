import {
  configureStore
} from "@reduxjs/toolkit";
import ProductReducer from "./reducers/ProductReducer";
import AuthReducer from "./reducers/AuthReducer";
import OrderReducer from "./reducers/OrderReducer";


const store = configureStore({
  reducer: {
    product: ProductReducer,
    auth: AuthReducer,
    order: OrderReducer,
  },
});

export default store;