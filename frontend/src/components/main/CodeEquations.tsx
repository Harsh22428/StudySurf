// components/main/CodeEquations.tsx
'use client';

import React from 'react';

interface Equation {
  formula: string;
  explanation: string;
  variables?: Record<string, string>; // Since each equation has different variable names
  example_calculation?: string;
}

interface CodeExample {
  title: string;
  language: string;
  code: string;
  explanation: string;
  output?: string;
}

interface CodeEquationsData {
  equations?: Equation[];
  code_examples?: CodeExample[];
  practical_applications?: string;
}

interface CodeEquationsProps {
  data: CodeEquationsData | null;
}

const CodeEquations: React.FC<CodeEquationsProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Code & Equations</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">No equations or code examples available.</p>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Code & Equations</h2>
          </div>
          <p className="text-gray-600">
            Mathematical formulas and code implementations for projectile motion
          </p>
        </div>

        {/* Equations Section */}
        {data.equations && data.equations.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Physics Equations</h3>
            <div className="space-y-6">
              {data.equations.map((equation, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  {/* Formula Display */}
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <code className="text-green-400 text-lg font-mono">
                      {equation.formula}
                    </code>
                  </div>

                  {/* Explanation */}
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Explanation</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {equation.explanation}
                  </p>

                  {/* Variables */}
                  {equation.variables && Object.keys(equation.variables).length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-md font-medium text-gray-800 mb-2">Variables</h5>
                      <div className="bg-blue-50 rounded-lg p-4">
                        {Object.entries(equation.variables).map(([variable, description]) => (
                          <div key={variable} className="flex flex-wrap items-start gap-2 mb-2 last:mb-0">
                            <code className="bg-blue-200 px-2 py-1 rounded text-sm font-mono text-blue-800">
                              {variable}
                            </code>
                            <span className="text-blue-700 text-sm flex-1">
                              {description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Example Calculation */}
                  {equation.example_calculation && (
                    <div>
                      <h5 className="text-md font-medium text-gray-800 mb-2">Example Calculation</h5>
                      <div className="bg-green-50 rounded-lg p-4">
                        <pre className="text-green-800 text-sm whitespace-pre-wrap font-mono">
                          {equation.example_calculation}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Examples Section */}
        {data.code_examples && data.code_examples.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Code Examples</h3>
            <div className="space-y-6">
              {data.code_examples.map((example, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  {/* Title and Language */}
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-lg font-medium text-gray-800">{example.title}</h4>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm font-mono">
                      {example.language}
                    </span>
                  </div>

                  {/* Code Block */}
                  <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm font-mono whitespace-pre">
                      <code>{example.code}</code>
                    </pre>
                  </div>

                  {/* Explanation */}
                  <div className="mb-4">
                    <h5 className="text-md font-medium text-gray-800 mb-2">Explanation</h5>
                    <p className="text-gray-600 leading-relaxed">
                      {example.explanation}
                    </p>
                  </div>

                  {/* Output */}
                  {example.output && (
                    <div>
                      <h5 className="text-md font-medium text-gray-800 mb-2">Expected Output</h5>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                          {example.output}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practical Applications */}
        {data.practical_applications && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Practical Applications</h3>
            <div className="bg-purple-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {data.practical_applications}
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
            Download Code
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy All Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEquations;