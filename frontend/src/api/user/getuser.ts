// src/api/user/getuser.ts

export interface UserProfile {
    id: string;
    name: string;
    username: string;
    age: number;
    academicLevel: string;
    major: string;
    dyslexiaSupport: boolean;
    languagePreference: string;
    learningStyles: string[];
    metadata: string[];
    created_at: string;
}

export interface ApiError {
    detail: Array<{
        loc: string[];
        msg: string;
        type: string;
    }>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'study_surf_users_secret_key';

export async function getUserProfile(): Promise<UserProfile> {
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    if (!authToken) {
        throw new Error('No authentication token found. Please sign in again.');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'X-API-Key': API_KEY,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
                throw new Error('Authentication expired. Please sign in again.');
            }

            const errorData: ApiError = await response.json();
            const errorMessages = errorData.detail.map(error => error.msg).join(', ');
            throw new Error(errorMessages || 'Failed to fetch user profile');
        }

        const userProfile: UserProfile = await response.json();

        // Update stored user data
        localStorage.setItem('user_data', JSON.stringify(userProfile));

        return userProfile;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error occurred while fetching user profile');
    }
}