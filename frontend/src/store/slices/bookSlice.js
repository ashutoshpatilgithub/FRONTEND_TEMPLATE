import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const fetchBooks = createAsyncThunk(
    "book/fetchBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/book/all");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch books");
        }
    }
);

export const addBook = createAsyncThunk(
    "book/addBook",
    async (/** @type {any} */ bookData, { rejectWithValue }) => {
        try {
            const response = await api.post("/book/admin/add", bookData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add book");
        }
    }
);

export const deleteBook = createAsyncThunk(
    "book/deleteBook",
    async (/** @type {any} */ id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/book/delete/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete book");
        }
    }
);

const bookSlice = createSlice({
    name: "book",
    initialState: {
        loading: false,
        books: [],
        error: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload.books;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bookSlice.reducer;
