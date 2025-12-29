import { type ChatMessage } from "../types/chat";

export default function MessageBubble({ sender, text }: ChatMessage) {
    const isUser = sender === "user";

    return (
        <div
            style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                marginBottom: 8,
            }}
        >
            <div
                style={{
                    maxWidth: "70%",
                    padding: "10px 14px",
                    borderRadius: 12,
                    background: isUser ? "#2563eb" : "#e5e7eb",
                    color: isUser ? "#fff" : "#000",
                }}
            >
                {text}
            </div>
        </div>
    );
}
