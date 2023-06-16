import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/ProductSlice";
import ProductDetailsSlice from "./slices/ProductDetailsSlice";
import UserSlice from "./slices/UserSlice";
import CartSlice from "./slices/CartSlice";

const rootreducer = combineReducers({
  product: ProductSlice,
  productdetail: ProductDetailsSlice,
  user: UserSlice,
  cart: CartSlice,
});

const store = configureStore({
  reducer: rootreducer,
});
export default store;
