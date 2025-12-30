import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const localStorageKeys = {
    sessionId: "sessionId",
    messages: "messages"
}


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
