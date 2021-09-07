import { configureStore } from "@reduxjs/toolkit";
import SpinnerReducer from "./reducers/SpinnerReducer";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import CategoryReducer from "./reducers/CategoryReducer";
import AdditionOptionReducer from "./reducers/AdditionOptionReducer";
import SizeOptionReducer from "./reducers/SizeOptionReducer";
import ProductReducer from "./reducers/ProductReducer";
import OrderReducer from "./reducers/OrderReducer";
import RevenueReducer from "./reducers/RevenueReducer";
import RatingReducer from "./reducers/RatingReducer";

const store = configureStore({
  reducer: {
    revenue: RevenueReducer,
    order: OrderReducer,
    spinner: SpinnerReducer,
    auth: AuthReducer,
    user: UserReducer,
    product: ProductReducer,
    category: CategoryReducer,
    additionOption: AdditionOptionReducer,
    sizeOption: SizeOptionReducer,
    rating: RatingReducer,
  },
});

export default store;
