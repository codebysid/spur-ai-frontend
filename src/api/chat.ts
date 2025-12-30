const backendUrl = import.meta.env.VITE_BACKEND_URL

export async function sendMessage(
    message: string,
    sessionId?: string
): Promise<{ reply: string; sessionId: string }> {
    const res = await fetch(`${backendUrl}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId }),
    });

    if (!res.ok) {
        throw new Error("Failed to send message");
    }

    return res.json();
}

export async function getMessages(
    sessionId?: string
) {
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
}