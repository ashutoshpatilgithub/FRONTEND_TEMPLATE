import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const recordBorrowedBook = createAsyncThunk(
    "borrow/recordBorrowedBook",
    async (/** @type {any} */ { id, email, customDueDate, customPrice }, { rejectWithValue }) => {
        try {
            const response = await api.post(
                `/borrow/record-borrow-book/${id}`,
                { email, customDueDate, customPrice }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to record borrow");
        }
    }
);

export const returnBorrowedBook = createAsyncThunk(
    "borrow/returnBorrowedBook",
    async (/** @type {any} */ { id, email }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `/borrow/return-borrowed-book/${id}`,
                { email }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to return book");
        }
    }
);

export const fetchMyBorrowedBooks = createAsyncThunk(
    "borrow/fetchMyBorrowedBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/borrow/my-borrowed-books");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch borrowed books");
        }
    }
);

export const fetchAdminBorrowedBooks = createAsyncThunk(
    "borrow/fetchAdminBorrowedBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/borrow/borrowed-books-by-users");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch admin borrow data");
        }
    }
);

const borrowSlice = createSlice({
    name: "borrow",
    initialState: {
        loading: false,
        myBorrowedBooks: [],
        adminBorrowedBooks: [],
        error: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyBorrowedBooks.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchMyBorrowedBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.myBorrowedBooks = action.payload.borrowedBooks;
            })
            .addCase(fetchMyBorrowedBooks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(fetchAdminBorrowedBooks.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAdminBorrowedBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.adminBorrowedBooks = action.payload.borrowedBooks;
            })
            .addCase(fetchAdminBorrowedBooks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(recordBorrowedBook.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(recordBorrowedBook.fulfilled, (state, action) => { state.loading = false; state.message = action.payload.message; })
            .addCase(recordBorrowedBook.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(returnBorrowedBook.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(returnBorrowedBook.fulfilled, (state, action) => { state.loading = false; state.message = action.payload.message; })
            .addCase(returnBorrowedBook.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    },
});

export default borrowSlice.reducer;
