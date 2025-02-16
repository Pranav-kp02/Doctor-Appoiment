import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginRegPage: "",
  user: [],
  athetication: false,
  token: null,
  allUserAppoiments: [],
};

const userAuthentication = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    getLoginInfo: (state, action) => {
      state.user = action.payload.user;
      state.athetication = action.payload.athetication;
      state.token = action.payload.token;
    },
    getUserUpdateData: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    changeLogReg: (state, action) => {
      state.loginRegPage = action.payload;
    },
    getUserAppoiment: (state, action) => {
      state.allUserAppoiments = action.payload;
    },
    LogOutUser: (state, action) => {
      state.user = action.payload.user;
      state.athetication = action.payload.athetication;
      state.token = action.payload.token;
      state.allUserAppoiments = action.payload.allUserAppoiments;
    },
  },
});

export const {
  getLoginInfo,
  changeLogReg,
  getUserUpdateData,
  getUserAppoiment,
  LogOutUser,
} = userAuthentication.actions;
export default userAuthentication.reducer;
