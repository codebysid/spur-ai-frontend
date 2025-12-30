import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./slices/messages";
import sessionSlice from "./slices/sessionId";

export const store = configureStore({
    reducer: {
        messages: messageSlice,
        sessionId: sessionSlice
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']