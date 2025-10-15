// components/main/Explanation.tsx
'use client';

import React from 'react';

interface ExplanationData {
  main_explanation?: string;
  key_concepts?: Array<{
    concept: string;
    explanation: string;
    analogy?: string;
    example?: string;
  }>;
  connections_to_user_field?: string;
  common_misconceptions?: string[];
  practical_applications?: string[];
  difficulty_progression?: string;
  next_steps?: string;
}

interface ExplanationProps {
  data: ExplanationData | null;
}

const Explanation: React.FC<ExplanationProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Explanation</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">No explanation data available.</p>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Explanation</h2>
          </div>
          <p className="text-gray-600">
            Personalized explanation tailored to your learning background
          </p>
        </div>

        {/* Main Explanation */}
        {data.main_explanation && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
            <div className="bg-violet-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                {data.main_explanation}
              </p>
            </div>
          </div>
        )}

        {/* Key Concepts */}
        {data.key_concepts && data.key_concepts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Concepts</h3>
            <div className="space-y-4">
              {data.key_concepts.map((concept, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    {concept.concept}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {concept.explanation}
                  </p>
                  
                  {concept.analogy && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-3">
                      <h5 className="text-sm font-medium text-blue-800 mb-2">Analogy</h5>
                      <p className="text-blue-700 text-sm">
                        {concept.analogy}
                      </p>
                    </div>
                  )}
                  
                  {concept.example && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-green-800 mb-2">Example</h5>
                      <p className="text-green-700 text-sm">
                        {concept.example}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Field Connections */}
        {data.connections_to_user_field && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Relevance to Your Field</h3>
            <div className="bg-orange-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                {data.connections_to_user_field}
              </p>
            </div>
          </div>
        )}

        {/* Common Misconceptions */}
        {data.common_misconceptions && data.common_misconceptions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Misconceptions</h3>
            <div className="space-y-3">
              {data.common_misconceptions.map((misconception, index) => (
                <div key={index} className="bg-red-50 border-l-4 border-red-300 p-4">
                  <p className="text-red-800 text-sm">
                    <span className="font-medium">Myth:</span> {misconception}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practical Applications */}
        {data.practical_applications && data.practical_applications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Practical Applications</h3>
            <div className="grid gap-4">
              {data.practical_applications.map((application, index) => (
                <div key={index} className="bg-purple-50 rounded-lg p-4">
                  <p className="text-purple-800 text-sm">
                    {application}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        {data.next_steps && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Next Steps</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                {data.next_steps}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explanation;