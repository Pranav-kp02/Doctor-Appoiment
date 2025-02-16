import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashData: [],
  docApplyData: [],
  allDoctors: [],
  allApppoiment: [],
  aFilterappoiment: [],
  userDetails: [],
  userDataSolo: [],
};

const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    getDashData: (state, action) => {
      state.dashData = action.payload;
    },
    getApplyDoctorData: (state, action) => {
      state.docApplyData = action.payload;
    },
    AllDoctorData: (state, action) => {
      state.allDoctors = action.payload;
    },
    allAppoimentData: (state, action) => {
      state.allApppoiment = action.payload;
    },
    adminFilterAppoiment: (state, action) => {
      const status = action.payload;
      if (status) {
        state.aFilterappoiment = state.allApppoiment.filter(
          (ele) => ele.status === status
        );
      } else {
        state.aFilterappoiment = state.allApppoiment;
      }
    },
    getAllUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    getUserData: (state, action) => {
      state.userDataSolo = action.payload;
    },
    banuser: (state, action) => {
      state.userDataSolo.user.active = action.payload;
    },
  },
});

export const {
  getDashData,
  getApplyDoctorData,
  AllDoctorData,
  allAppoimentData,
  adminFilterAppoiment,
  getAllUserDetails,
  getUserData,
  banuser,
} = adminSlice.actions;
export default adminSlice.reducer;
