import { useEffect, useRef } from "react";
import { sendMessage } from "../api/chat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addLLMAnswer, addUserQuery } from "../redux/slices/messages";
import { setSessionId } from "../redux/slices/sessionId";
import { useMutation } from "@tanstack/react-query";

export default function Chat() {
    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.messages)
    const sessionId = useAppSelector(state => state.sessionId)

    const { mutate, isPending: loading } = useMutation({
        mutationFn: async (text: string) => await sendMessage(text, sessionId),

        onMutate: (text) => {
            dispatch(addUserQuery(text))
        },

        onSuccess: (data) => {
            dispatch(setSessionId(data.sessionId))
            dispatch(addLLMAnswer(data.reply))
        },

        onError: () => {
            dispatch(addLLMAnswer("Something went wrong. Please try again."))
        }
    })


    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div
            style={{
                maxWidth: 600,
                margin: "40px auto",
                border: "1px solid #ddd",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                height: "80vh",
            }}
        >
            <div style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
                <strong>AI Support Chat</strong>
            </div>

            <div
                style={{
                    flex: 1,
                    padding: 16,
                    overflowY: "auto",
                }}
            >
                {messages && messages.map((m, i) => (
                    <MessageBubble key={i} {...m} />
                ))}

                {loading && (
                    <MessageBubble sender="ai" text="Agent is typing..." />
                )}

                <div ref={bottomRef} />
            </div>

            <div style={{ padding: 16 }}>
                <ChatInput onSend={mutate} disabled={loading} />
            </div>
        </div>
    );
}
