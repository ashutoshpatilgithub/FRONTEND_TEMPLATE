import { configureStore, createSlice } from "@reduxjs/toolkit";

// Minimal slices so components can safely select `state.auth` / `state.popup`
// even before the real feature slices are implemented.

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    message: null,
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    resetAuthSlice: (state) => {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.message = "Logged out";
    },
  },
});

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

export const { resetAuthSlice, logout } = authSlice.actions;
export const { toggleAddNewAdminPopup, toggleSettingPopup } = popupSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    popup: popupSlice.reducer,
  },
});

