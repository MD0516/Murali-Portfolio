import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../Api/axios";

export const postMessage = createAsyncThunk(
    "contact/post",
    async (payload, { rejectWithValue }) => {
        try {
            await api.post("/api/contact", payload)
            return true
        } catch (error) {
            rejectWithValue(error.response.data.message)
        }
    }
)

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        list: null,
        error: null,
        loading: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postMessage.pending, (state) => {
                state.loading = true
            })
            .addCase(postMessage.fulfilled, (state) => {
                state.loading = false;
                state.error = null
            })
            .addCase(postMessage.rejected, (state) => {
                state.loading = false
                state.error = null
            })
    }
})

export default contactSlice.reducer;