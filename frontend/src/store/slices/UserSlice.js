import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  User: null,
  token: null,
  error: false,
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Userloading(state, action) {
      state.loading = true;
      state.error = false;
      state.User = null;
    },
    Usersuccessfull(state, action) {
      state.loading = false;
      state.User = action.payload.user;
      state.token = action.payload.token;
      state.error = false;
    },
    Usererror(state, action) {
      state.loading = false;
      state.error = true;
    },
  },
});
export default UserSlice.reducer;
export const { Userloading, Usererror, Usersuccessfull } = UserSlice.actions;
