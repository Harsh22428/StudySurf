// src/api/auth/signin.ts

export interface SigninRequest {
    username: string;
    password: string;
}

export interface User {
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

export interface SigninResponse {
    access_token: string;
    token_type: string;
    user: User;
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

export async function signinUser(credentials: SigninRequest): Promise<SigninResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
            },
            body: JSON.stringify(credentials),
        });
            console.log(response)
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid username or password');
            }

            const errorData: ApiError = await response.json();
            const errorMessages = errorData.detail.map(error => error.msg).join(', ');
            throw new Error(errorMessages || 'Signin failed');
        }

        const data: SigninResponse = await response.json();

        // Store the JWT token in localStorage
        if (data.access_token) {
            localStorage.setItem('auth_token', data.access_token);
            localStorage.setItem('user_data', JSON.stringify(data.user));
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error occurred during signin');
    }
}

// Utility function to get stored auth token
export function getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('auth_token');
    }
    return null;
}

// Utility function to get stored user data
export function getStoredUser(): User | null {
    if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
    }
    return null;
}

// Utility function to clear auth data (logout)
export function clearAuthData(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
    }
}