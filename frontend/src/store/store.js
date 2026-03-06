import { configureStore, createSlice } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    addNewAdminPopup: false,
    settingPopup: false,
  },
  reducers: {
    toggleAddNewAdminPopup: (state) => {
      state.addNewAdminPopup = !state.addNewAdminPopup;
    },
    toggleSettingPopup: (state) => {
      state.settingPopup = !state.settingPopup;
    },
  },
});

export const { toggleAddNewAdminPopup, toggleSettingPopup } = popupSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupSlice.reducer,
  },
});

