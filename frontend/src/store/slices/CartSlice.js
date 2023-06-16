import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  loading: true,
  cart: [],
  CartCount: 0,
  error: false,
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updatecart(state, action) {
      state.loading = false;
      const existingItem = state.cart.find(
        (item) => item.Product._id === action.payload.Product._id
      );

      if (existingItem) {
        let restictedCount = existingItem.itemCount;
        existingItem.itemCount =
          existingItem.itemCount + action.payload.itemCount;

        if (existingItem.itemCount > existingItem.Product.stock) {
          toast.error(
            `Product Exist in your Cart ---- Stock limit is  ${existingItem.Product.stock}`
          );
          existingItem.itemCount = existingItem.Product.stock;
          restictedCount = existingItem.Product.stock - restictedCount;
          state.CartCount = state.CartCount + restictedCount;
        } else {
          state.CartCount = state.CartCount + action.payload.itemCount;
          toast("Added to Cart");
        }
      } else {
        state.cart.push(action.payload);
        state.CartCount = state.CartCount + action.payload.itemCount;
        toast("Added to Cart");
      }

      state.error = false;
    },
    updateCount(state, action) {
      state.loading = false;
      const newData = action.payload;
      let CartCount = 0;
      // Loop through the new data

      // Find the matching item in the cart array
      const existingItem = state.cart.find(
        (item) => item.Product._id === newData.Product._id
      );

      // If the matching item exists and the data has changed, update it
      if (existingItem && existingItem.itemCount !== newData.itemCount) {
        CartCount = newData.itemCount - existingItem.itemCount;
        existingItem.itemCount = newData.itemCount;
      }
      // If the matching item doesn't exist, add it to the cart array

      state.CartCount = state.CartCount + CartCount;
      state.error = false;
    },
    fetchCart(state, action) {
      state.loading = action.payload.loading;
      state.cart = action.payload.cart;
      state.CartCount = action.payload.CartCount;
      state.error = action.payload.error;
    },
    clearCart(state, action) {
      state.cart = [];
      state.CartCount = 0;
    },
  },
});
export default CartSlice.reducer;
export const { updatecart, updateCount, fetchCart, clearCart } =
  CartSlice.actions;
