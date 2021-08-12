import {
  configureStore
} from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import ProductReducer from "./reducers/ProductReducer";
import CategoryReducer from "./reducers/CategoryReducer";
import OrderReducer from "./reducers/OrderReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    customer: UserReducer,
    product: ProductReducer,
    category: CategoryReducer,
    order: OrderReducer,
  },
});

export default store;