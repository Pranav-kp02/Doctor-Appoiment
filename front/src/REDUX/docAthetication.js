import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: [],
  athetication: false,
  token: null,
  allAppoiment: [],
  docDash: [],
  appoimentFIlter: [],
  patientDetails: [],
};

const docAthetication = createSlice({
  name: "DOCTOR-details",
  initialState,
  reducers: {
    getDoctorLoginInfo: (state, action) => {
      state.doctor = action.payload.doctor;
      state.athetication = action.payload.athetication;
      state.token = action.payload.token;
    },
    getAllDoctorAppoiment: (state, action) => {
      state.allAppoiment = action.payload;
    },
    getDoctorDashData: (state, action) => {
      state.docDash = action.payload;
    },
    updateDoctordata: (state, action) => {
      state.doctor = { ...state.doctor, ...action.payload };
    },
    filterAppoiment: (state, action) => {
      const status = action.payload;
      if (status) {
        state.appoimentFIlter = state.allAppoiment.filter(
          (ele) => ele.status === status
        );
      } else {
        state.appoimentFIlter = state.allAppoiment;
      }
    },
    getPatientData: (state, action) => {
      state.patientDetails = action.payload;
    },
  },
});

export const {
  getDoctorLoginInfo,
  getAllDoctorAppoiment,
  getDoctorDashData,
  updateDoctordata,
  filterAppoiment,
  getPatientData,
} = docAthetication.actions;
export default docAthetication.reducer;
