import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../Api/axios";

/* ---------------------
    FEEDBACKS FETCH
---------------------- */
export const fetchFeedbacks = createAsyncThunk(
    "feedbacks/fetch",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`/api/feedback/${id}`)
            return res.data.data
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

/* ---------------------
    FEEDBACKS ADD
---------------------- */
export const postFeedback = createAsyncThunk(
    "feedbacks/post",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post(`/api/feedback`, payload)
            return res.data.data
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

/* ---------------------
    FEEDBACKS EDIT
---------------------- */
export const editFeedback = createAsyncThunk(
    "feedbacks/edit",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.put(`/api/feedback`, payload)
            return res.data.data
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

/* ---------------------
    FEEDBACKS DELETE
---------------------- */
export const deleteFeedback = createAsyncThunk(
    "feedbacks/delete",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/api/feedback/${id}`)
            return id
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

/* ---------------------
    FEEDBACKS LIKE
---------------------- */
export const likeFeedback = createAsyncThunk(
    "feedbacks/like",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post(`/api/feedback/like`, payload)
            return res.data.data
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

const feedbackSlice = createSlice({
    name: "feedback",
    initialState: {
        list: [],
        loading: true,
        error: null
    },
    reducers: {
        clearFeedbackError(state) {
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            // Fetch Feedbacks
            .addCase(fetchFeedbacks.pending, state => {
                state.loading = true
            })
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.error = null
            })
            .addCase(fetchFeedbacks.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Post Feedback
            .addCase(postFeedback.fulfilled, (state, action) => {
                state.list.unshift(action.payload)
                state.error = null
            })
            .addCase(postFeedback.rejected, (state, action) => {
                state.error = action.payload
            })

            // Edit Feedback
            .addCase(editFeedback.fulfilled, (state, action) => {
                const index = state.list.findIndex(f => f._id === action.payload._id);
                if (index !== -1) state.list[index] = action.payload;
                state.error = null
            })
            .addCase(editFeedback.rejected, (state, action) => {
                state.error = action.payload
            })

            // Delete Feedback
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.list = state.list.filter(f => f._id !== action.payload)
                state.error = null
            })
            .addCase(deleteFeedback.rejected, (state, action) => {
                state.error = action.payload
            })

            // Like Feedback
            .addCase(likeFeedback.fulfilled, (state, action) => {
                const index = state.list.findIndex(f => f._id === action.payload._id);
                if (index !== -1) state.list[index] = action.payload
                state.error = null
            })
    }
})

export const { clearFeedbackError } = feedbackSlice.actions;
export default feedbackSlice.reducer