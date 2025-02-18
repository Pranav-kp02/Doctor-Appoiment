import { combineReducers, configureStore } from "@reduxjs/toolkit";
import doctorsSlice from "./doctorsSlice";
import adminSlice from "./adminSlice";
import userAuthentication from "./userAuthenticationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import docAthetication from "./docAthetication";
import otpVerfication from "./otpVerfiction";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userAth", "DoctorAth", "doctors"], // Match reducer names
  // Optional: Add additional configuration
  // debug: process.env.NODE_ENV !== "production", // Enable debug in development
  serialize: true,
  timeout: 0, // The time after which persist/REHYDRATE will be dispatched
};

const rootReducer = combineReducers({
  DoctorAth: docAthetication,
  userAth: userAuthentication,
  doctors: doctorsSlice,
  Admin: adminSlice,
  otpVerfication: otpVerfication,
});

// Configure middleware to handle serialization warnings
const customizedMiddleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
    },
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
  // Optional: Add development tools configuration
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export const persistor = persistStore(store);
