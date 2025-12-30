import type { ChatResponse } from "../types/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export async function sendMessage(
    message: string,
    sessionId?: string
): Promise<ChatResponse> {
    const res = await fetch(`${backendUrl}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId }),
    });

    const data = await res.json();


    if (!res.ok) {
        throw {
            status: res.status,
            message: data.error || "Something went wrong",
        };
    }

    return data
}

export async function getMessages(
    sessionId?: string
) {
    try {
        const res = await fetch(`${backendUrl}/chat/all-messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
        });
        if (!res.ok) {
            throw new Error("Failed to get messages");
        }
        const data = await res.json()
        console.log({ data })

        return data;
    } catch (err) {
        console.log(err)
    }
}