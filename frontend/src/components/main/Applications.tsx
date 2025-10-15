// components/main/Applications.tsx
'use client';

import React from 'react';

interface RealWorldApplication {
  application: string;
  description: string;
  industry: string;
  example_scenario: string;
  connection_to_concept: string;
}

interface CaseStudy {
  title: string;
  description: string;
  outcome: string;
  lesson: string;
}

interface ApplicationsData {
  real_world_applications?: RealWorldApplication[];
  career_connections?: string[];
  everyday_examples?: string[];
  case_studies?: CaseStudy[];
  future_implications?: string;
}

interface ApplicationsProps {
  data: ApplicationsData | null;
}

const Applications: React.FC<ApplicationsProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Real-World Applications</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">No application data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Real-World Applications</h2>
          </div>
          <p className="text-gray-600">
            Discover how projectile motion concepts are applied across various industries and fields
          </p>
        </div>

        {/* Real World Applications */}
        {data.real_world_applications && data.real_world_applications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Industry Applications</h3>
            <div className="grid gap-6">
              {data.real_world_applications.map((app, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-800">{app.application}</h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {app.industry}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {app.description}
                  </p>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-800 mb-2">Example Scenario</h5>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-green-800 text-sm">
                        {app.example_scenario}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-800 mb-2">Physics Connection</h5>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-purple-800 text-sm">
                        {app.connection_to_concept}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Career Connections */}
        {data.career_connections && data.career_connections.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Career Connections</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data.career_connections.map((career, index) => (
                <div key={index} className="bg-orange-50 rounded-lg p-4">
                  <p className="text-orange-800 text-sm leading-relaxed">
                    {career}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Everyday Examples */}
        {data.everyday_examples && data.everyday_examples.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Everyday Examples</h3>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="grid gap-3">
                {data.everyday_examples.map((example, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-blue-800 text-sm">
                      {example}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Case Studies */}
        {data.case_studies && data.case_studies.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Case Studies</h3>
            <div className="space-y-6">
              {data.case_studies.map((study, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">{study.title}</h4>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-800 mb-2">Background</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-800 mb-2">Outcome</h5>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-green-800 text-sm">
                        {study.outcome}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-800 mb-2">Key Lesson</h5>
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <p className="text-yellow-800 text-sm">
                        {study.lesson}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Future Implications */}
        {data.future_implications && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Future Implications</h3>
            <div className="bg-indigo-50 rounded-lg p-6">
              <p className="text-indigo-800 leading-relaxed">
                {data.future_implications}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Save Applications
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share Examples
          </button>
        </div>
      </div>
    </div>
  );
};

export default Applications;