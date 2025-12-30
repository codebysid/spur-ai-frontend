import { useEffect, useRef } from "react";
import { sendMessage } from "../api/chat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addLLMAnswer, addUserQuery } from "../redux/slices/messages";
import { setSessionId } from "../redux/slices/sessionId";
import { useMutation } from "@tanstack/react-query";
import type { ApiError, ChatResponse } from "../types/types";

export default function Chat() {
    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.messages)
    const sessionId = useAppSelector(state => state.sessionId)

    const { mutate, isPending: loading } = useMutation<ChatResponse, ApiError, string>({
        mutationFn: async (text: string) => await sendMessage(text, sessionId || undefined),

        onMutate: (text) => {
            dispatch(addUserQuery(text))
        },

        onSuccess: (data) => {
            dispatch(setSessionId(data.sessionId))
            dispatch(addLLMAnswer(data.reply))
        },

        onError: (error) => {
            if (error.status === 429) {
                dispatch(addLLMAnswer("You cannot do concurrent requests, otherwise you will be spammed and reported"));
            }
            else if (error.status === 400) {
                dispatch(addLLMAnswer("Message invalid"));
            }
            else {
                dispatch(addLLMAnswer("Something went wrong. Please try again."));
            }
        }
    })


    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div
            className="max-w-150 border border-secondary rounded-sm flex flex-col justify-center w-full h-[80vh]"
        >
            <div
                className=" p-4 border-b border-secondary"
            >
                <strong>AI Support Chat</strong>
            </div>

            <div

                className=" flex-1 p-4 overflow-auto"
            >
                {messages && messages.map((m, i) => (
                    <MessageBubble key={i} {...m} />
                ))}

                {loading && (
                    <MessageBubble sender="ai" text="Agent is typing..." />
                )}

                <div ref={bottomRef} />
            </div>

            <div className="p-4">
                <ChatInput onSend={mutate} disabled={loading} />
            </div>
        </div>
    );
}
