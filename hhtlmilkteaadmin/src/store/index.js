import { configureStore } from "@reduxjs/toolkit";
import SpinnerReducer from "./reducers/SpinnerReducer";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import CategoryReducer from "./reducers/CategoryReducer";
import SaleOffReducer from "./reducers/SaleOffReducer";
import AdditionOptionReducer from "./reducers/AdditionOptionReducer";
import SizeOptionReducer from "./reducers/SizeOptionReducer";
import ProductReducer from "./reducers/ProductReducer";
import OrderReducer from "./reducers/OrderReducer"

const store = configureStore({
  reducer: {
    order: OrderReducer,
    spinner: SpinnerReducer,
    auth: AuthReducer,
    user: UserReducer,
    product: ProductReducer,
    category: CategoryReducer,
    saleOff: SaleOffReducer,
    additionOption: AdditionOptionReducer,
    sizeOption: SizeOptionReducer,
  },
});

export default store;
