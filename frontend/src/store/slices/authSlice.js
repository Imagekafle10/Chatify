import { createSlice } from "@reduxjs/toolkit";
const initialValues = {
  authUser: { name: "Jhon", id: 123, age: 25 },
  isloading: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialValues,
  reducers: {
    logout: () => {
      return initialValues; // reset state to initial
    },
    login: (state, action) => {
      state.isLoggedIn = action.payload;
      console.log("Reducer updated:", state.isLoggedIn);
    },
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
