'use client';

import React, { useState, useEffect } from 'react';
import { useDyslexia } from '../contexts/DyslexiaContext';
import { getUserProfile, UserProfile } from '../api/user/getuser';
import { updateUserPreferences, UpdateUserRequest } from '../api/user/updateuser';
import { useRouter } from 'next/navigation';

const UserPreferences: React.FC = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { isDyslexiaMode, toggleDyslexiaMode } = useDyslexia();

  // Form state for editing
  const [editFormData, setEditFormData] = useState({
    name: '',
    age: 18,
    academicLevel: '',
    major: '',
    dyslexiaSupport: false,
    languagePreference: 'English',
    learningStyles: [] as string[],
    metadata: [] as string[]
  });

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
    'Chinese (Mandarin)', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali',
    'Urdu', 'Turkish', 'Dutch', 'Swedish', 'Norwegian', 'Polish', 'Czech'
  ];

  const academicLevels = [
    'Elementary', 'Middle School', 'High School', 'College', 'Graduate', 'Professional'
  ];

  const learningStyleOptions = [
    { id: 'visual', label: 'Visual Learner', description: 'Prefer diagrams, charts, visual demonstrations' },
    { id: 'auditory', label: 'Auditory Learner', description: 'Prefer verbal explanations, discussions, audio content' },
    { id: 'kinesthetic', label: 'Kinesthetic Learner', description: 'Prefer interactive simulations, hands-on activities' },
    { id: 'reading', label: 'Reading/Writing Learner', description: 'Prefer text-based summaries, note-taking features' }
  ];

  // Load user profile on component mount
  useEffect(() => {
    loadUserProfile();
  }, []);

  // Sync dyslexia mode with user profile
  useEffect(() => {
    if (userProfile && userProfile.dyslexiaSupport !== isDyslexiaMode) {
      toggleDyslexiaMode(userProfile.dyslexiaSupport);
    }
  }, [userProfile]);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      setError('');
      const profile = await getUserProfile();
      setUserProfile(profile);

      // Initialize edit form with current data
      setEditFormData({
        name: profile.name,
        age: profile.age,
        academicLevel: profile.academicLevel,
        major: profile.major,
        dyslexiaSupport: profile.dyslexiaSupport,
        languagePreference: profile.languagePreference,
        learningStyles: profile.learningStyles,
        metadata: profile.metadata
      });
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setError(error instanceof Error ? error.message : 'Failed to load user profile');

      // If authentication error, redirect to signin
      if (error instanceof Error && error.message.includes('Authentication expired')) {
        router.push('/signin');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError('');

      const updateData: UpdateUserRequest = {
        name: editFormData.name,
        age: editFormData.age,
        academicLevel: editFormData.academicLevel,
        major: editFormData.major,
        dyslexiaSupport: editFormData.dyslexiaSupport,
        languagePreference: editFormData.languagePreference,
        learningStyles: editFormData.learningStyles,
        metadata: editFormData.metadata
      };

      const updatedProfile = await updateUserPreferences(updateData);
      setUserProfile(updatedProfile);
      setIsEditing(false);

      // Update dyslexia mode if changed
      if (updatedProfile.dyslexiaSupport !== isDyslexiaMode) {
        toggleDyslexiaMode(updatedProfile.dyslexiaSupport);
      }

    } catch (error) {
      console.error('Failed to update preferences:', error);
      setError(error instanceof Error ? error.message : 'Failed to update preferences');

      // If authentication error, redirect to signin
      if (error instanceof Error && error.message.includes('Authentication expired')) {
        router.push('/signin');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    // Reset form data to current profile
    if (userProfile) {
      setEditFormData({
        name: userProfile.name,
        age: userProfile.age,
        academicLevel: userProfile.academicLevel,
        major: userProfile.major,
        dyslexiaSupport: userProfile.dyslexiaSupport,
        languagePreference: userProfile.languagePreference,
        learningStyles: userProfile.learningStyles,
        metadata: userProfile.metadata
      });
    }
  };

  const handleLearningStyleChange = (styleId: string) => {
    setEditFormData(prev => ({
      ...prev,
      learningStyles: prev.learningStyles.includes(styleId)
        ? prev.learningStyles.filter(id => id !== styleId)
        : [...prev.learningStyles, styleId]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    router.push('/signin');
  };

  // Convert learning style IDs to labels for display
  const getLearningStyleLabel = (styleId: string) => {
    const style = learningStyleOptions.find(option => option.id === styleId);
    return style ? style.label : styleId;
  };

  if (isLoading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col h-full max-h-full">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col h-full max-h-full">
        <div className="text-center text-red-600">
          <p>Failed to load user profile</p>
          <button
            onClick={loadUserProfile}
            className="mt-2 text-sm text-violet-600 hover:text-violet-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col h-full max-h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Your Preferences</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-violet-600 hover:text-violet-700 font-medium cursor-pointer"
          >
            Edit Preferences
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-violet-600 text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-violet-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="border border-gray-300 text-gray-600 px-3 py-1 rounded-md text-xs font-medium hover:bg-gray-50 cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="overflow-y-auto flex-1 space-y-4 pr-2 min-h-0">
        {/* Dyslexia Support */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Dyslexia Support</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (isEditing) {
                  const newValue = !editFormData.dyslexiaSupport;
                  setEditFormData(prev => ({ ...prev, dyslexiaSupport: newValue }));
                }
              }}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${(isEditing ? editFormData.dyslexiaSupport : userProfile.dyslexiaSupport)
                ? 'bg-green-500'
                : 'bg-gray-200'
                } ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
              disabled={!isEditing}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${(isEditing ? editFormData.dyslexiaSupport : userProfile.dyslexiaSupport)
                  ? 'translate-x-5'
                  : 'translate-x-1'
                  }`}
              />
            </button>
            <span className="text-sm text-gray-600">
              {(isEditing ? editFormData.dyslexiaSupport : userProfile.dyslexiaSupport) ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        {/* Language Preference */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Language</span>
          {isEditing ? (
            <select
              value={editFormData.languagePreference}
              onChange={(e) => setEditFormData(prev => ({ ...prev, languagePreference: e.target.value }))}
              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none bg-white text-gray-900"
            >
              {languages.map((language) => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          ) : (
            <span className="text-sm text-gray-600">{userProfile.languagePreference}</span>
          )}
        </div>

        {/* Learning Style Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Learning Styles</label>
          {isEditing ? (
            // Editing mode - show checkboxes
            <div className="space-y-3">
              {learningStyleOptions.map((style) => (
                <label key={style.id} className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editFormData.learningStyles.includes(style.id)}
                    onChange={() => handleLearningStyleChange(style.id)}
                    className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500 mt-0.5"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-700">{style.label}</div>
                    <div className="text-xs text-gray-500">{style.description}</div>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            // Display mode - show badges
            <div className="flex flex-wrap gap-2 mt-3">
              {userProfile.learningStyles.length > 0 ? (
                userProfile.learningStyles.map((styleId, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-medium ${styleId === 'visual' ? 'bg-blue-100 text-blue-800' :
                        styleId === 'auditory' ? 'bg-green-100 text-green-800' :
                          styleId === 'kinesthetic' ? 'bg-purple-100 text-purple-800' :
                            styleId === 'reading' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {getLearningStyleLabel(styleId)}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500 italic">No learning styles selected</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;