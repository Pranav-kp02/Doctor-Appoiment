import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailOtp: false,
  uEmail: null,
  otpVerfited: false,
};

const otpVerfication = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    isOtpVerfiy: (state, action) => {
      state.emailOtp = action.payload;
    },
    userEmail: (state, action) => {
      state.uEmail = action.payload;
      state.otpVerfited = true;
    },
  },
});

export const { isOtpVerfiy, userEmail } = otpVerfication.actions;
export default otpVerfication.reducer;
