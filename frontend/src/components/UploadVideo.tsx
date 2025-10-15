// components/UploadVideo.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadVideo, validateVideoFile, UploadVideoRequest } from '../api/video/upload-video';
import { getStoredUser } from '../api/auth/signin';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/loading-animation.json';

interface UploadVideoProps {
  onUploadStart?: () => void;
  onUploadComplete?: (result: unknown) => void;
  onUploadError?: (error: string) => void;
}

const UploadVideo: React.FC<UploadVideoProps> = ({
  onUploadStart,
  onUploadComplete,
  onUploadError
}) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<unknown>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError('');
    setSuccess('');
    setUploadProgress(0);

    // Validate file
    const validation = validateVideoFile(file);
    if (!validation.isValid) {
      const errorMsg = validation.error || 'Invalid file';
      setError(errorMsg);
      onUploadError?.(errorMsg);
      return;
    }

    // Get user data for background context
    const user = getStoredUser();
    if (!user) {
      const errorMsg = 'User information not found. Please sign in again.';
      setError(errorMsg);
      onUploadError?.(errorMsg);
      router.push('/signin');
      return;
    }

    setIsUploading(true);
    onUploadStart?.(); // Notify parent that upload started

    try {
      const uploadData: UploadVideoRequest = {
        video: file,
        user_background: user.major ? `${user.major}_student` : 'general',
        subject_preference: user.major || 'general'
      };

      const result = await uploadVideo(uploadData, (progress) => {
        setUploadProgress(progress);
      });

      setSuccess('Video uploaded and processed successfully!');
      setUploadedFile(file);
      setUploadResult(result);
      onUploadComplete?.(result); // Notify parent that upload completed
      console.log('Upload result:', result);
      localStorage.setItem('uploadResult', JSON.stringify(result));
    } catch (error) {
      console.error('Upload error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to upload video';
      setError(errorMsg);
      onUploadError?.(errorMsg);

      // Handle authentication errors
      if (error instanceof Error && error.message.includes('Authentication expired')) {
        router.push('/signin');
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadResult(null);
    setSuccess('');
    setError('');
    // Reset parent state as well
    onUploadError?.('');
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Video</h3>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Success Display */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">{success}</p>
        </div>
      )}

      {isUploading ? (
        // Loading animation state
        <div className="flex flex-col items-center justify-center py-8 relative">
          {/* Mini glass blob for upload state */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 to-pink-100/50 rounded-2xl blur-sm"></div>
          
          <div className="relative z-10 text-center">
            <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-6 mb-4">
              <div className="w-32 h-32 mx-auto mb-3">
                <Lottie
                  animationData={loadingAnimation}
                  loop={true}
                  autoplay={true}
                />
              </div>
              <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-sm font-medium bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
                  Processing your video...
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : uploadedFile ? (
        // File uploaded state
        <div className="border border-green-300 bg-green-50 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">{uploadedFile.name}</p>
              <p className="text-xs text-green-600">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            onClick={resetUpload}
            className="mt-3 text-xs text-green-700 hover:text-green-800 underline"
          >
            Upload another video
          </button>
        </div>
      ) : (
        // Original upload area
        <div className="border-2 border-dashed border-violet-300 rounded-lg p-6 text-center hover:border-violet-400 transition-colors">
          <svg className="w-8 h-8 mx-auto mb-2 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-600 mb-3">Click to upload or drag and drop</p>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 cursor-pointer inline-block transition-colors"
          >
            Choose Video File
          </label>
          <p className="text-xs text-gray-500 mt-2">MP4, AVI, MOV up to 500MB</p>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;