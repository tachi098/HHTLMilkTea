import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import ProductReducer from "./reducers/ProductReducer";
import CategoryReducer from "./reducers/CategoryReducer";
import OrderReducer from "./reducers/OrderReducer";
import HistoryReducer from "./reducers/HistoryReducer";
import SpinnerReducer from "./reducers/SpinnerReducer";
import WheelReducer from "./reducers/WheelReducer";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    customer: UserReducer,
    product: ProductReducer,
    category: CategoryReducer,
    order: OrderReducer,
    history: HistoryReducer,
    spinner: SpinnerReducer,
    wheel: WheelReducer,
  },
});

export default store;
