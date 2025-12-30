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
