import { type ChatMessage } from "../types/types";

export default function MessageBubble({ sender, text }: ChatMessage) {
    const isUser = sender === "user";

    return (
        <div
            className={`flex ${isUser ? " justify-end" : " justify-start"} mb-4`}
        >
            <div
                className={`max-w-[70%] p-2.5 rounded-xl ${isUser && "bg-primary"}`}
            >
                {text}
            </div>
        </div>
    );
}
