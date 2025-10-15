// components/main/Summary.tsx
'use client';

import React, { useState } from 'react';

interface KeyTakeaway {
  concept: string;
  summary: string;
  importance: string;
  memory_aid?: string;
}

interface LearningCard {
  front: string;
  back: string;
  category: string;
  difficulty: string;
}

interface SummaryData {
  executive_summary?: string;
  key_takeaways?: KeyTakeaway[];
  learning_cards?: LearningCard[];
  review_checklist?: string[];
  next_learning_steps?: string;
}

interface SummaryProps {
  data: SummaryData | null;
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (!data) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Summary</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">No summary data available.</p>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Summary</h2>
          </div>
          <p className="text-gray-600">
            Key concepts and takeaways for quick review and retention
          </p>
        </div>

        {/* Executive Summary */}
        {data.executive_summary && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
            <div className="bg-violet-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">
                {data.executive_summary}
              </p>
            </div>
          </div>
        )}

        {/* Learning Cards (Flashcard Style) */}
        {data.learning_cards && data.learning_cards.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Study Flashcards</h3>
            <p className="text-gray-600 mb-4">Click on any card to flip it and reveal the answer.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {data.learning_cards.map((card, index) => (
                <div key={index} className="perspective-1000">
                  <div 
                    className={`relative w-full h-48 cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${
                      flippedCards.includes(index) ? 'rotate-y-180' : ''
                    }`}
                    onClick={() => toggleCard(index)}
                  >
                    {/* Front of card */}
                    <div className="absolute inset-0 backface-hidden bg-white border-2 border-violet-300 rounded-lg p-4 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {card.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          card.difficulty === 'easy' ? 'bg-blue-100 text-blue-800' :
                          card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {card.difficulty}
                        </span>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-800 text-center font-medium">
                          {card.front}
                        </p>
                      </div>

                      <div className="text-center mt-3">
                        <span className="text-gray-500 text-sm">Click to reveal answer</span>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-violet-50 border-2 border-violet-400 rounded-lg p-4 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm">
                          Answer
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          card.difficulty === 'easy' ? 'bg-blue-100 text-blue-800' :
                          card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {card.difficulty}
                        </span>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-800 text-center">
                          {card.back}
                        </p>
                      </div>

                      <div className="text-center mt-3">
                        <span className="text-gray-500 text-sm">Click to see question</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Takeaways */}
        {data.key_takeaways && data.key_takeaways.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Takeaways</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data.key_takeaways.map((takeaway, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{takeaway.concept}</h4>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {takeaway.summary}
                  </p>
                  
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Why it matters:</h5>
                    <p className="text-gray-600">
                      {takeaway.importance}
                    </p>
                  </div>

                  {takeaway.memory_aid && (
                    <div className="bg-blue-50 rounded p-3">
                      <h5 className="text-sm font-medium text-blue-800 mb-1">Memory aid:</h5>
                      <p className="text-blue-700">
                        {takeaway.memory_aid}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Checklist */}
        {data.review_checklist && data.review_checklist.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Self-Check Review</h3>
            <div className="bg-orange-50 rounded-lg p-6">
              <p className="text-orange-800 mb-4">
                Go through this checklist to verify your understanding:
              </p>
              <div className="space-y-3">
                {data.review_checklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500 mt-1"
                      id={`check-${index}`}
                    />
                    <label 
                      htmlFor={`check-${index}`}
                      className="text-orange-800 cursor-pointer flex-1"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Next Learning Steps */}
        {data.next_learning_steps && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What&apos;s Next?</h3>
            <div className="bg-indigo-50 rounded-lg p-6">
              <p className="text-indigo-800 leading-relaxed">
                {data.next_learning_steps}
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
            Email Summary
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Export Cards
          </button>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Summary;