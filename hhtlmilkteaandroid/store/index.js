import {
  configureStore
} from "@reduxjs/toolkit";
import ProductReducer from "./reducers/ProductReducer";
import AuthReducer from "./reducers/AuthReducer";
import OrderReducer from "./reducers/OrderReducer";
import UserReducer from "./reducers/UserReducer";
import LocationReducer from "./reducers/LocationReducer";


const store = configureStore({
  reducer: {
    product: ProductReducer,
    auth: AuthReducer,
    order: OrderReducer,
    user: UserReducer,
    location: LocationReducer,
  },
});

export default store;