import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import projectSlice from "./projectSlice"
import feedbackSlice from "./feedbackSlice"
import contactSlice from "./contactSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        projects: projectSlice,
        feedbacks: feedbackSlice,
        contact: contactSlice
    },
    // devTools: false
})