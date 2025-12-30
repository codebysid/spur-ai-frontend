import { type ChatMessage } from "../types/types";

interface IMessageBubble extends ChatMessage {
    shiny?: boolean
}

export default function MessageBubble({ sender, text, shiny = false }: IMessageBubble) {
    const isUser = sender === "user";

    return (
        <div
            className={`flex ${isUser ? " justify-end" : " justify-start"} mb-4`}
        >
            <div
                className={`text-sm lg:text-base lg:max-w-[70%] p-2.5 rounded-xl ${isUser && "bg-primary"} ${shiny && ".shine-text"}`}
            >
                {text}
            </div>
        </div>
    );
}
