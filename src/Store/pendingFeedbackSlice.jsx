import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../Api/axios";

export const fetchPendingFeedbacks = createAsyncThunk(
    "pendingFeedback/fetch",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`/api/pending/feedback/${id}`)
            return res.data.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const deletePendingFeedbacks = createAsyncThunk(
    "pendingFeedback/delete",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.delete(`/api/pending/feedback/delete/${id}`)
            return res.data.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

const pendingFeedback = createSlice({
    name: "pendingFeedback",
    initialState: {
        loading: true,
        list: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPendingFeedbacks.pending, state => {
                state.loading = true
            })
            .addCase(fetchPendingFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.error = null;
            })
            .addCase(fetchPendingFeedbacks.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(deletePendingFeedbacks.fulfilled, (state, action) => {
                state.list = state.list.filter(p => p._id !== action.payload)
                state.error = null;
            })
            .addCase(deletePendingFeedbacks.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export default pendingFeedback.reducer;