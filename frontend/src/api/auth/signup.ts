// src/api/auth/signup.ts

export interface SignupRequest {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    age: number;
    academicLevel: string;
    major: string;
    dyslexiaSupport: boolean;
    languagePreference: string;
    learningStyles: string[];
    metadata: string[];
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

export interface SignupResponse {
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
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'vth_hackathon_2025_secret_key';

export async function signupUser(userData: SignupRequest): Promise<SignupResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData: ApiError = await response.json();

            // Extract user-friendly error messages
            const errorMessages = errorData.detail.map(error => error.msg).join(', ');
            throw new Error(errorMessages || 'Signup failed');
        }

        const data: SignupResponse = await response.json();

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
        throw new Error('Network error occurred during signup');
    }
}