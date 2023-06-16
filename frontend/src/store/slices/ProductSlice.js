import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  product: null,
  error: false,
  productCount: null,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updatedata(state, action) {
      state.loading = false;
      state.product = action.payload.product;
      state.error = false;
      state.productCount = action.payload.productCount;
    },
    updatedata_loading(state, action) {
      state.loading = true;
      state.error = false;
    },
    updatedata_error(state, action) {
      state.loading = false;
      state.error = true;
    },
  },
});

export default productSlice.reducer;
export const { updatedata, updatedata_error, updatedata_loading } =
  productSlice.actions;
