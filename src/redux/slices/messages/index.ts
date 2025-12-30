import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatMessage } from "../../../types/chat";

const initialState: ChatMessage[] = initState()

function initState() {
    const messages = localStorage.getItem("messages")
    if (messages) return JSON.parse(messages)
    return []
}

export const messageSlice = createSlice({
    initialState,
    name: "messages",
    reducers: {
        addUserQuery: (state, action: PayloadAction<string>) => {
            state.push({ sender: "user", text: action.payload })
        },
        addLLMAnswer: (state, action: PayloadAction<string>) => {
            state.push({ sender: "ai", text: action.payload })
            localStorage.setItem("messages", JSON.stringify(state))
        }
    }
})

export default messageSlice.reducer
export const { addLLMAnswer, addUserQuery } = messageSlice.actions