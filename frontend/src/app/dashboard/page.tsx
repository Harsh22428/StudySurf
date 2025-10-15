// app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import MainContent from '@/components/MainContent';
import UploadVideo from '@/components/UploadVideo';
import UserPreferences from '@/components/UserPreferences';
import { DyslexiaProvider, useDyslexia } from '@/contexts/DyslexiaContext';
import { getUserProfile } from '@/api/user/getuser';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardContent: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { isDyslexiaMode } = useDyslexia();
    
    // Video processing state management
    const [isVideoProcessing, setIsVideoProcessing] = useState(false);
    const [hasVideoContent, setHasVideoContent] = useState(false); // Set to true for testing dummy content
    const [uploadResult, setUploadResult] = useState<unknown>(null);
    const [userProfile, setUserProfile] = useState<any>(null);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        router.push('/signin');
    };

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profile = await getUserProfile();
                setUserProfile(profile);
            } catch (error) {
                console.error('Failed to load user profile:', error);
            }
        };
        loadProfile();
    }, []);

    const handleEditPreferences = () => {
        console.log('Edit preferences clicked');
        setShowDropdown(false);
    };

    // Upload event handlers
    const handleUploadStart = () => {
        setIsVideoProcessing(true);
        setHasVideoContent(false);
        setUploadResult(null);
    };

    const handleUploadComplete = (result: unknown) => {
        setIsVideoProcessing(false);
        setHasVideoContent(true);
        setUploadResult(result);
    };

    const handleUploadError = (error: string) => {
        setIsVideoProcessing(false);
        setHasVideoContent(false);
        setUploadResult(null);
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-violet-50 relative overflow-hidden ${isDyslexiaMode ? 'font-mono text-lg leading-relaxed' : ''}`}>
            {/* Glass blob elements */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-pink-400/15 to-violet-400/15 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-violet-300/8 to-purple-300/8 rounded-full blur-3xl"></div>

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-violet-200 relative z-40">
                <div className="px-8 py-4 flex justify-between items-center">
                    {/* Logo and Company Name */}
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-violet-600 rounded-sm flex items-center justify-center">
                            <span className="text-white font-bold text-sm">S</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">StudySurf</span>
                    </div>

                    {/* User Account Section */}
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                            <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium">{userProfile?.name || 'Loading...'}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                <button
                                    onClick={handleEditPreferences}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                                >
                                    Edit Preferences
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Dashboard Content */}
            <div className="px-8 py-6 flex gap-6 h-[calc(100vh-80px)] relative z-10">
                {/* Main Content Area (80% width) */}
                <div className="w-3/4">
                    <MainContent 
                        isVideoProcessing={isVideoProcessing}
                        hasVideoContent={hasVideoContent}
                        uploadResult={uploadResult}
                    />
                </div>

                {/* Right Sidebar (20% width) */}
                <div className="w-1/4 flex flex-col gap-6">
                    <div className="h-auto min-h-[280px]">
                        <UploadVideo 
                            onUploadStart={handleUploadStart}
                            onUploadComplete={handleUploadComplete}
                            onUploadError={handleUploadError}
                        />
                    </div>
                    <div className="flex-1 min-h-0">
                        <UserPreferences />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    return (
        <DyslexiaProvider>
            <DashboardContent />
        </DyslexiaProvider>
    );
};

export default Dashboard;