import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../api/chat";
import { type ChatMessage } from "../types/chat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export default function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | undefined>(
        localStorage.getItem("sessionId") || undefined
    );

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = async (text: string) => {
        setMessages((prev) => [...prev, { sender: "user", text }]);
        setLoading(true);

        try {
            const res = await sendMessage(text, sessionId);
            setSessionId(res.sessionId);
            localStorage.setItem("sessionId", res.sessionId);

            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: res.reply },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { sender: "ai", text: "Something went wrong. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

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
                {messages.map((m, i) => (
                    <MessageBubble key={i} {...m} />
                ))}

                {loading && (
                    <MessageBubble sender="ai" text="Agent is typing..." />
                )}

                <div ref={bottomRef} />
            </div>

            <div style={{ padding: 16 }}>
                <ChatInput onSend={handleSend} disabled={loading} />
            </div>
        </div>
    );
}
