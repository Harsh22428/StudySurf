// components/MainContent.tsx
'use client';

import React, { useState } from 'react';
import HookVideo from './main/HookVideo';
import Explanation from './main/Explanation';
import Animation from './main/Animation';
import CodeEquations from './main/CodeEquations';
import Diagrams from './main/Diagrams';
import Applications from './main/Applications';
import Summary from './main/Summary';
import Quiz from './main/Quiz';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/loading-animation.json';
import mockData from '@/data/mockData.json';

interface MainContentProps {
  isVideoProcessing?: boolean;
  hasVideoContent?: boolean;
  uploadResult?: unknown;
}

const MainContent: React.FC<MainContentProps> = ({ 
  isVideoProcessing = false, 
  hasVideoContent = false,
  uploadResult = null
}) => {
  const [activeTab, setActiveTab] = useState('explanation');

  const tabs = [
    {
      id: 'explanation',
      title: 'Explanation',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: 'Personalized analogies & explanations',
      component: <Explanation data={hasVideoContent ? uploadResult?.content_generation?.content?.explanation?.content : null} />
    },
    {
      id: 'animation',
      title: 'Animation',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      description: 'Three.js visualizations',
      component: <Animation data={hasVideoContent ? uploadResult?.content_generation?.content?.animation_config?.content : null} />
    },
    {
      id: 'code',
      title: 'Code & Equations',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      description: 'Formulas & code examples',
      component: <CodeEquations data={hasVideoContent ? uploadResult?.content_generation?.content?.code_equation?.content : null} />
    },
    {
      id: 'visualization',
      title: 'Diagrams',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      description: 'Charts & visual content',
      component: <Diagrams data={hasVideoContent ? uploadResult?.content_generation?.content?.visualization?.content : null} />
    },
    {
      id: 'application',
      title: 'Applications',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      description: 'Real-world examples',
      component: <Applications data={hasVideoContent ? uploadResult?.content_generation?.content?.application?.content : null} />
    },
    {
      id: 'summary',
      title: 'Summary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      description: 'Key concept cards',
      component: <Summary data={hasVideoContent ? uploadResult?.content_generation?.content?.summary?.content : null} />
    },
    {
      id: 'quiz',
      title: 'Quiz',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      description: 'Contextual assessments',
      component: <Quiz data={hasVideoContent ? uploadResult?.content_generation?.content?.quiz_generation?.content : null} />
    }
  ];

  const renderProcessingContent = () => (
    <div className="h-full flex items-center justify-center relative">
      {/* Glass blob elements for loading state */}
      <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-r from-pink-400/10 to-violet-400/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="text-center relative z-10">
        {/* Glass morphism container for animation */}
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="w-48 h-48 mx-auto mb-6">
            <Lottie 
              animationData={loadingAnimation} 
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-4">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent mb-2">
              Processing Your Video
            </h3>
            <p className="text-violet-600/80 text-sm font-medium">
              AI agents are analyzing and generating content...
            </p>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md mx-auto">
          <p className="text-violet-700/90 leading-relaxed">
            Our AI agents are analyzing your video and generating personalized content for each learning format...
          </p>
        </div>
      </div>
    </div>
  );

  const renderEmptyContent = () => (
    <div className="text-center text-gray-500 mt-20">
      <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <h3 className="text-lg font-medium text-gray-600 mb-2">Ready for Interactive Content</h3>
      <p className="text-sm text-gray-500">Upload a video to generate flowcharts, animations, and interactive learning materials</p>
    </div>
  );
  const renderTabContent = () => {
    // Show processing animation while video is being processed
    if (isVideoProcessing) {
      return renderProcessingContent();
    }
    
    // Show empty state if no video has been processed yet
    if (!hasVideoContent) {
      return renderEmptyContent();
    }

    // Show actual tab content when video is processed
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return currentTab?.component || renderEmptyContent();
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl h-full shadow-lg flex flex-col">
      {/* Tab Navigation - Only show when content is available */}
      {hasVideoContent && !isVideoProcessing && (
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-violet-500 text-violet-600 bg-violet-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MainContent;