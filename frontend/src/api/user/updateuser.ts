// src/api/user/updateuser.ts

export interface UpdateUserRequest {
    name: string;
    age: number;
    academicLevel: string;
    major: string;
    dyslexiaSupport: boolean;
    languagePreference: string;
    learningStyles: string[];
    metadata: string[];
}

export interface UpdatedUserProfile {
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

export async function updateUserPreferences(updateData: UpdateUserRequest): Promise<UpdatedUserProfile> {
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    if (!authToken) {
        throw new Error('No authentication token found. Please sign in again.');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/user/preferences`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'X-API-Key': API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
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
            throw new Error(errorMessages || 'Failed to update user preferences');
        }

        const updatedProfile: UpdatedUserProfile = await response.json();

        // Update stored user data with latest info
        localStorage.setItem('user_data', JSON.stringify(updatedProfile));

        return updatedProfile;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error occurred while updating user preferences');
    }
}