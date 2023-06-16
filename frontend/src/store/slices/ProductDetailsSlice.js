import { createSlice } from "@reduxjs/toolkit";

const productdetailSlice = createSlice({
  name: "productdetailes",
  initialState: [],
  reducers: {
    updateproductdata(state, action) {
      return {
        ...state,
        action,
      };
    },
  },
});

export default productdetailSlice.reducer;
export const { updateproductdata } = productdetailSlice.actions;
