import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const fetchAllUsers = createAsyncThunk(
    "user/fetchAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/user/all");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        users: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    },
});

export default userSlice.reducer;
