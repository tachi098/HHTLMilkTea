import {
  configureStore
} from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import ProductReducer from "./reducers/ProductReducer";
import CategoryReducer from "./reducers/CategoryReducer";
import HistoryReducer from "./reducers/HistoryReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    customer: UserReducer,
    product: ProductReducer,
    category: CategoryReducer,
    history: HistoryReducer,
  },
});

export default store;