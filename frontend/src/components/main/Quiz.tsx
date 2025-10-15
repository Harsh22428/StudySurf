// components/main/Quiz.tsx
'use client';

import React, { useState } from 'react';

interface Question {
  id: number;
  type: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
  difficulty?: string;
  concept_tested?: string;
}

interface QuizData {
  quiz_metadata?: {
    title: string;
    description: string;
    estimated_time: string;
    difficulty_level: string;
  };
  questions?: Question[];
  scoring_guide?: string;
}

interface QuizProps {
  data: QuizData | null;
}

const Quiz: React.FC<QuizProps> = ({ data }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

  // Initialize user answers array when data loads
  React.useEffect(() => {
    if (data?.questions) {
      setUserAnswers(new Array(data.questions.length).fill(null));
    }
  }, [data?.questions]);

  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">No quiz questions available.</p>
        </div>
      </div>
    );
  }

  const questions = data.questions;

  // Additional safety check for current question
  if (!questions || questions.length === 0 || !questions[currentQuestion]) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">No quiz questions available.</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    // For multiple choice, extract just the letter (A, B, C, D) from the full option text
    let answerToCompare = answer;
    if (currentQ.type === 'multiple_choice' && answer.match(/^[A-D]\)/)) {
      answerToCompare = answer.charAt(0); // Extract just the letter (A, B, C, D)
    }
    
    // Update selected answer for current question
    setSelectedAnswer(answerToCompare);
    
    // Update user answers array
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = answerToCompare;
    setUserAnswers(newUserAnswers);
    
    // Calculate total score across all answered questions
    let newScore = 0;
    newUserAnswers.forEach((userAnswer, index) => {
      if (userAnswer && questions[index] && userAnswer === questions[index].correct_answer) {
        newScore++;
      }
    });
    setScore(newScore);
    
    setShowResult(true);
  };

  const handleTrueFalse = (answer: boolean) => {
    // Convert to capitalized string to match backend format
    handleAnswer(answer ? 'True' : 'False');
  };

  const handleTextInput = (answer: string) => {
    handleAnswer(answer);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1]);
      setShowResult(!!userAnswers[currentQuestion + 1]);
    } else {
      // Move to completion screen
      setCurrentQuestion(questions.length);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1]);
      setShowResult(!!userAnswers[currentQuestion - 1]);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setUserAnswers(new Array(questions.length).fill(null));
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "Excellent work!";
    if (percentage >= 60) return "Good job!";
    if (percentage >= 40) return "Keep practicing!";
    return "Review the material and try again.";
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const renderQuestionInput = () => {
    if (currentQ.type === 'multiple_choice' && currentQ.options && currentQ.options.length > 0) {
      return (
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
                              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                showResult
                  ? option === currentQ.correct_answer
                    ? 'bg-green-100 border-green-300 text-green-900'
                    : option === selectedAnswer && option !== currentQ.correct_answer
                    ? 'bg-red-100 border-red-300 text-red-900'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                  : selectedAnswer === option
                  ? 'bg-violet-100 border-violet-300 text-violet-900'
                  : 'border-gray-200 hover:bg-violet-50 hover:border-violet-300 text-gray-900'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      );
    } else if (currentQ.type === 'true_false') {
      return (
        <div className="space-y-3">
          {['True', 'False'].map((option) => (
            <button
              key={option}
              onClick={() => !showResult && handleTrueFalse(option === 'True')}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                showResult
                  ? option === currentQ.correct_answer
                    ? 'bg-green-100 border-green-300 text-green-900'
                    : option === selectedAnswer && option !== currentQ.correct_answer
                    ? 'bg-red-100 border-red-300 text-red-900'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                  : selectedAnswer === option
                  ? 'bg-violet-100 border-violet-300 text-violet-900'
                  : 'border-gray-200 hover:bg-violet-50 hover:border-violet-300 text-gray-900'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      );
    } else if (currentQ.type === 'short_answer') {
      return (
        <div className="space-y-4">
          <textarea
            value={selectedAnswer || ''}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 min-h-[100px] resize-y text-gray-900"
            disabled={showResult}
          />
          {!showResult && (
            <button
              onClick={() => selectedAnswer && handleTextInput(selectedAnswer)}
              disabled={!selectedAnswer?.trim()}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          )}
        </div>
      );
    }
    
    return (
      <div className="text-center text-gray-500 py-8">
        <p>Question type not supported: {currentQ.type}</p>
      </div>
    );
  };

  // Completion screen
  if (currentQuestion >= questions.length) {
    return (
      <div className="p-6 h-full overflow-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Quiz Complete!</h2>
            </div>
          </div>

          <div className="text-center bg-violet-50 rounded-lg p-8">
            <div className="text-6xl mb-6">🎉</div>
            
            <div className="mb-6">
              <h3 className={`text-3xl font-bold mb-2 ${getScoreColor(score, questions.length)}`}>
                {score}/{questions.length}
              </h3>
              <p className="text-gray-600 text-lg mb-2">
                {Math.round((score / questions.length) * 100)}% Correct
              </p>
              <p className={`text-lg font-medium ${getScoreColor(score, questions.length)}`}>
                {getScoreMessage(score, questions.length)}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Results Breakdown</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-green-800">Correct</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-600">{questions.length - score}</div>
                  <div className="text-red-800">Incorrect</div>
                </div>
              </div>
            </div>

            {data.scoring_guide && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-blue-800 mb-2">Scoring Guide</h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  {data.scoring_guide}
                </p>
              </div>
            )}

            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {data.quiz_metadata?.title || 'Quiz'}
            </h2>
          </div>
          {data.quiz_metadata?.description && (
            <p className="text-gray-600">
              {data.quiz_metadata.description}
            </p>
          )}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}/{questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-violet-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 flex-1">
              {currentQ.question}
            </h3>
            <div className="flex flex-col items-end gap-2 ml-4">
              {currentQ.difficulty && (
                <span className={`px-3 py-1 rounded-full text-sm ${
                  currentQ.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentQ.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentQ.difficulty}
                </span>
              )}
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                {currentQ.type.replace('_', ' ')}
              </span>
            </div>
          </div>

          {renderQuestionInput()}
        </div>

        {/* Result & Explanation */}
        {showResult && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="mb-2">
              {selectedAnswer === currentQ.correct_answer ? (
                <span className="text-green-600 font-medium text-lg">✓ Correct!</span>
              ) : (
                <span className="text-red-600 font-medium text-lg">✗ Incorrect</span>
              )}
              {selectedAnswer !== currentQ.correct_answer && (
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Correct answer:</strong> {currentQ.correct_answer}
                </div>
              )}
            </div>
            
            {currentQ.explanation && (
              <div className="bg-blue-50 rounded-lg p-3 mt-3">
                <h5 className="font-medium text-blue-800 mb-1">Explanation:</h5>
                <p className="text-blue-700">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;