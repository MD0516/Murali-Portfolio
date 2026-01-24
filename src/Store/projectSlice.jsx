import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../Api/axios";

/* --------------------
    PROJECTS FETCH
-------------------- */

export const fetchProjects = createAsyncThunk(
    "project/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/project")
            return res.data.data
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

/* -----------------
    ADD PROJECT
----------------- */

export const addProject = createAsyncThunk(
    "project/add",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post("/api/project", payload)
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

/* --------------------
    EDIT PROJECT
-------------------- */

export const editProject = createAsyncThunk(
    "project/edit",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/api/project/${id}`, payload)
            return res.data.data
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

/* --------------------
    DELETE PROJECT
-------------------- */

export const deleteProject = createAsyncThunk(
    "project/delete",
    async ({ id }, { rejectWithValue }) => {
        try {
            await api.delete(`/api/project/${id}`)
            return id
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

const projectSlice = createSlice({
    name: "project",
    initialState: {
        list: [],
        loading: true,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // Fetching Projects        
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false
                state.error = null
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            // Add Project
            .addCase(addProject.fulfilled, (state, action) => {
                state.list.unshift(action.payload)
                state.error = null
            })

            // Edit Project
            .addCase(editProject.fulfilled, (state, action) => {
                const index = state.list.findIndex(p => p._id === action.payload._id)
                if (index !== -1) state.list[index] = action.payload;
                state.error = null
            })

            // Delete Project
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.list = state.list.filter(p => p._id !== action.payload);
                state.error = null
            });
    }
});

export default projectSlice.reducer;