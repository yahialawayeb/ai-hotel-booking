export const getApiUrl = () => {
    if (typeof window === 'undefined') {
        // Server-side
        return process.env.INTERNAL_API_URL || 'https://ai-hotel-booking.onrender.com';
    }
    // Client-side
    return process.env.NEXT_PUBLIC_API_URL || 'https://ai-hotel-booking.onrender.com';
};
