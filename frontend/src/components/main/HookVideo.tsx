// components/main/HookVideo.tsx
'use client';

import React, { useState } from 'react';

const HookVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Hook Video</h2>
      
      {/* Video Player */}
      <div className="bg-black rounded-lg overflow-hidden shadow-lg mb-4">
        <div className="relative aspect-video">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900 to-purple-800 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 ml-1 cursor-pointer" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {!isPlaying ? <path d="M8 5v14l11-7z"/> : <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>}
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Physics in Game Development</h3>
              <p className="text-white/80 text-sm">3:45 duration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Info */}
      <div className="bg-violet-50 rounded-lg p-4">
        <p className="text-gray-600">
          Engaging introduction to projectile motion using game development examples.
        </p>
      </div>
    </div>
  );
};

export default HookVideo;