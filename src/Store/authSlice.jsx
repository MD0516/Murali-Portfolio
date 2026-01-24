import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../Api/axios"

/* --------------------
    SESSION RESTORE
-------------------- */

export const checkSession = createAsyncThunk(
    "auth/checkSession",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/auth/profile")
            return res.data.user
        } catch {
            return rejectWithValue(null)
        }
    }
)

/* ---------------------
    MAGIC LINK REQUEST
--------------------- */

export const requestMagicLink = createAsyncThunk(
    "auth/requestMagicLink",
    async (payload, { rejectWithValue }) => {
        try {
            await api.post("/api/auth/request", payload)
            return true
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

/* -----------------------------------
    MAGIC LINK VERIFY (SETS COOKIE)
----------------------------------- */

export const verifyMagicLink = createAsyncThunk(
    "auth/verifyMagicLink",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post("/api/auth/verify", payload)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

/* ----------------------------
   ADMIN LOGIN (SETS COOKIE)
---------------------------- */

export const adminLogin = createAsyncThunk(
    "auth/adminLogin",
    async (payload, { rejectWithValue }) => {
        try {
            await api.post("/api/auth/admin/login", payload)
            return true
        } catch (err) {
            return rejectWithValue(err.response.data.message)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null,
        mailLoading: false,
        mailSent: false,
        isVerifying: false
    },
    reducers: {
        clearAuthError(state) {
            state.error = null
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            /* -------- Session Restore -------- */
            .addCase(checkSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null
            })
            .addCase(checkSession.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
            })

            /* -------- Magic Link Request -------- */
            .addCase(requestMagicLink.pending, (state) => {
                state.mailLoading = true;
                state.error = null;
                state.mailSent = false;
            })
            .addCase(requestMagicLink.fulfilled, (state) => {
                state.mailLoading = false;
                state.mailSent = true;
                state.error = null
            })
            .addCase(requestMagicLink.rejected, (state, action) => {
                state.mailLoading = false;
                state.error = action.payload;
            })

            /* -------- Magic Link Verify -------- */
            .addCase(verifyMagicLink.pending, (state) => {
                state.isVerifying = true
            })
            .addCase(verifyMagicLink.fulfilled, (state) => {
                state.isVerifying = false
                state.error = null
            })
            .addCase(verifyMagicLink.rejected, (state, action) => {
                state.isVerifying = false
                state.error = action.payload || "Verification failed";
            })

            /* -------- Admin Login -------- */
            .addCase(adminLogin.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
})

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;