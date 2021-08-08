import { configureStore } from "@reduxjs/toolkit";
import SpinnerReducer from "./reducers/SpinnerReducer";
import AuthReducer from "./reducers/AuthReducer";
import UserReducer from "./reducers/UserReducer";
import CategoryReducer from "./reducers/CategoryReducer";
import AdditionOptionReducer from "./reducers/AdditionOptionReducer";
import SizeOptionReducer from "./reducers/SizeOptionReducer";
import ProductReducer from "./reducers/ProductReducer";

const store = configureStore({
  reducer: {
    spinner: SpinnerReducer,
    auth: AuthReducer,
    user: UserReducer,
    product: ProductReducer,
    category: CategoryReducer,
    additionOption: AdditionOptionReducer,
    sizeOption: SizeOptionReducer,
  },
});

export default store;
