import { createSlice } from "@reduxjs/toolkit";

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
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.message = "Logged in successfully";
        },
        register: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.message = "Registered successfully";
        },
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

export const { login, register, resetAuthSlice, logout } = authSlice.actions;
export default authSlice.reducer;
