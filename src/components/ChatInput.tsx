import { useRef, useState } from "react";
import { Button } from "./common/Button";
import { SendHorizontal } from "lucide-react";

interface Props {
    onSend: (message: string) => void;
    disabled: boolean;
}

const maxInputLength = 500;

export default function ChatInput({ onSend, disabled }: Props) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        const el = textareaRef.current;
        if (!el) return;

        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    };

    const handleSend = () => {
        if (!message.trim()) return;

        onSend(message);
        setMessage("");

        const el = textareaRef.current;
        if (el) el.style.height = "auto";
    };

    return (
        <div className="flex gap-2 border border-secondary px-1 lg:px-2 py-1 lg:py-2 rounded-sm">
            <div className="w-full flex items-center gap-2 px-1 lg:px-2">
                <textarea
                    ref={textareaRef}
                    value={message}
                    rows={1}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder="Type your query..."
                    disabled={disabled}
                    maxLength={maxInputLength}
                    className="text-sm lg:text-base w-full resize-none overflow-y-auto text-white/80 focus:border-none focus:ring-0 focus:outline-0 max-h-40"
                />
                <span className="text-xs lg:text-sm">
                    {message.trim().length}/{maxInputLength}
                </span>
            </div>

            <Button
                onClick={handleSend}
                size="lg"
                className="rounded-full p-3 lg:px-3 lg:py-1"
                disabled={disabled || message.length === 0}
            >
                <SendHorizontal className=" size-3 lg:size-4" />
            </Button>
        </div>
    );
}
