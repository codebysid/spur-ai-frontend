export type Sender = "user" | "ai";

export interface ChatMessage {
    sender: Sender;
    text: string;
}

export interface ApiError {
    status: number;
    message: string;
};

export interface ChatResponse {
    sessionId: string;
    reply: string;
}