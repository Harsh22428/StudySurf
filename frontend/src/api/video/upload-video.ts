// src/api/video/upload-video.ts

export interface UploadVideoRequest {
    video: File;
    user_background: string;
    subject_preference: string;
}

export interface UploadVideoResponse {
    transcript: {
        text: string;
        language: string;
    };
    concepts: {
        analysis: string;
        word_count: number;
        estimated_duration: number;
    };
    user_context: {
        background: string;
        subject_preference: string;
        filename: string;
    };
    status: string;
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

export async function uploadVideo(
    uploadData: UploadVideoRequest,
    onProgress?: (progress: number) => void
): Promise<UploadVideoResponse> {
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    if (!authToken) {
        throw new Error('No authentication token found. Please sign in again.');
    }

    try {
        // Create FormData for multipart/form-data request
        const formData = new FormData();
        formData.append('video', uploadData.video);
        formData.append('user_background', uploadData.user_background);
        formData.append('subject_preference', uploadData.subject_preference);
        formData.append('auth_token', authToken);

        const response = await fetch(`${API_BASE_URL}/api/process-video-complete`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'X-API-Key': API_KEY,
                // Don't set Content-Type header - let browser set it with boundary for FormData
            },
            body: formData,
            
        });
        if (!response.ok) {
            if (response.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
                throw new Error('Authentication expired. Please sign in again.');
            }

            if (response.status === 413) {
                throw new Error('Video file is too large. Please upload a smaller file.');
            }

            let errorMessage = 'Failed to upload video';
            try {
                const errorData: ApiError = await response.json();
                errorMessage = errorData.detail.map(error => error.msg).join(', ');
            } catch {
                // If error response isn't JSON, use default message
            }

            throw new Error(errorMessage);
        }

        const result: UploadVideoResponse = await response.json();
        return result;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error occurred while uploading video');
    }
}

// Utility function to validate video file
export function validateVideoFile(file: File): { isValid: boolean; error?: string } {
    const maxSize = 500 * 1024 * 1024; // 500MB in bytes
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/quicktime', 'video/x-msvideo'];

    if (file.size > maxSize) {
        return {
            isValid: false,
            error: 'File size must be less than 500MB'
        };
    }

    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            error: 'Please upload a valid video file (MP4, AVI, MOV)'
        };
    }

    return { isValid: true };
}