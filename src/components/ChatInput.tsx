import { useState } from "react";

interface Props {
    onSend: (message: string) => void;
    disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;
        onSend(message);
        setMessage("");
    };

    return (
        <div style={{ display: "flex", gap: 8 }}>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={disabled}
                placeholder="Type your message..."
                style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                }}
            />
            <button
                onClick={handleSend}
                disabled={disabled}
                style={{
                    padding: "0 16px",
                    borderRadius: 8,
                    border: "none",
                    background: "#2563eb",
                    color: "#fff",
                }}
            >
                Send
            </button>
        </div>
    );
}
