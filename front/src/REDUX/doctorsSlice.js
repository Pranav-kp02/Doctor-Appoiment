import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appoimentSlots: [],
  slotIndex: 0,
  slotTime: null,
  docDetails: "",
  relatedDOctors: [],
  allDoctorDisplay: [],
  filteredDoctor: [],
};

const doctorsSlice = createSlice({
  name: "Doctors",
  initialState,
  reducers: {
    getAllDoctorUser: (state, action) => {
      state.allDoctorDisplay = action.payload;
      state.filteredDoctor = action.payload;
    },
    filterDoctorsBySpecialty: (state, action) => {
      const specialty = action.payload;
      if (specialty) {
        state.filteredDoctor = state.allDoctorDisplay.filter(
          (ele) => ele.speciality === specialty
        );
      } else {
        state.filteredDoctor = state.allDoctorDisplay;
      }
    },

    clearFilter: (state) => {
      state.filteredDoctor = state.allDoctorDisplay;
    },

    getAppoimentSlot: (state, action) => {
      state.appoimentSlots = action.payload;
    },

    getAppoimentIndex: (state, action) => {
      state.slotIndex = action.payload;
    },

    getAppoimentTime: (state, action) => {
      state.slotTime = action.payload;
    },

    doctorsDetails: (state, action) => {
      const docId = action.payload;
      state.docDetails = state.allDoctorDisplay.find(
        (ele) => ele._id === docId
      );
    },

    getRelatedDoc: (state, action) => {
      const docId = action.payload;

      state.relatedDOctors = state.allDoctorDisplay.filter(
        (ele) =>
          ele._id !== docId && ele.speciality === state.docDetails.speciality
      );
    },
  },
});

export const {
  filterDoctorsBySpecialty,
  clearFilter,
  getAppoimentSlot,
  getAppoimentIndex,
  getAppoimentTime,
  doctorsDetails,
  getRelatedDoc,
  getAllDoctorUser,
} = doctorsSlice.actions;
export default doctorsSlice.reducer;
