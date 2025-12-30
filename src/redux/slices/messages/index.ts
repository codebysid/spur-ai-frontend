import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatMessage } from "../../../types/types";
import { localStorageKeys } from "../../../utils/helper";
import { getMessages } from "../../../api/chat";

const initialState: ChatMessage[] = await initState()

async function initState() {
    const messages = localStorage.getItem(localStorageKeys.messages)
    if (messages) return JSON.parse(messages)
    const sessionId = localStorage.getItem(localStorageKeys.sessionId)
    if (sessionId) {
        const result = await getMessages(sessionId)
        if (result && result.length > 0) {
            localStorage.setItem(localStorageKeys.messages, JSON.stringify(result))
            return result
        }
    }
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