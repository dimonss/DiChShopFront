import { PATH_TO_IMAGE } from 'constants/globalConstants';
import config from "config";

export const getFullPathToImg = (img: string) =>
    config.isDev()
        ? 'http://localhost/api/' + PATH_TO_IMAGE + img
        : PATH_TO_IMAGE + img;

export const parseTokenFromText = (text: string): string | null => {
    if (!text) return null;
    
    // Trim whitespace
    const trimmedText = text.trim();
    
    // Check if it's a bare token (36 characters, UUID format)
    if (trimmedText.length === 36 && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmedText)) {
        return trimmedText;
    }
    
    // Check if it's a URL with auth parameter
    try {
        const url = new URL(trimmedText);
        const authParam = url.searchParams.get('auth');
        if (authParam && authParam.length === 36) {
            return authParam;
        }
    } catch (e) {
        // Not a valid URL, continue checking
    }
    
    // Check if it contains auth parameter in query string format
    const authMatch = trimmedText.match(/[?&]auth=([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
    if (authMatch && authMatch[1]) {
        return authMatch[1];
    }
    
    return null;
};
