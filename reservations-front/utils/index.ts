import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { State } from "@/store/slices/GlobalSlice";

export const DEFAULT_SESSION_KEY_DATA = "reservations_app";

export const handleGetSavedInfo = (): State | null => {
    if (typeof window !== "undefined") {
        const info = sessionStorage.getItem(DEFAULT_SESSION_KEY_DATA);
        if (!info) {
            return null;
        } else {
            return JSON.parse(info || "{}") as State;
        }
    } else {
        return null;
    }
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
