import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: string | undefined = localStorage.getItem("sessionId") || undefined

export const sessionSlice = createSlice({
    initialState,
    name: "sessionId",
    reducers: {
        setSessionId: (_state, action: PayloadAction<string>) => {
            localStorage.setItem("sessionId", action.payload);
            return action.payload
        }
    }
})

export default sessionSlice.reducer
export const { setSessionId } = sessionSlice.actions