'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';

export default function Home() {


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center transform transition-transform hover:scale-105">
              <span className="text-white font-bold text-lg" aria-hidden="true">S</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">StudySurf</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/signin">
              <button
                className="group bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 ease-in-out hover:shadow-lg hover:shadow-slate-900/10"
                aria-label="Sign in to your account"
              >
                <span className="flex items-center space-x-2">
                  <span>Sign In</span>
                  <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-16">
        {/* Hero Section */}
        <section className="relative text-center max-w-5xl mx-auto mb-32">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-100/40 to-indigo-100/40 rounded-[60px] blur-3xl transform -rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-purple-100/40 to-pink-100/40 rounded-[60px] blur-3xl transform rotate-3"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 leading-tight tracking-tight transition-colors duration-300">
            Transform Daunting Lectures Into
            <span className="block mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Interactive Learning</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto font-medium transition-colors duration-300">
            Upload any lecture video and get personalized, accessible interactive content tailored to your learning needs and abilities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <Link href="/signup">
              <button
                className="group relative bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-xl hover:shadow-indigo-600/20 dark:hover:shadow-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all duration-200 ease-out transform hover:-translate-y-0.5"
                aria-label="Join Smart Studying and start learning"
              >
                <span className="flex items-center space-x-2">
                  <span>Start Learning Free</span>
                  <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </span>
              </button>
            </Link>
            <a href="#how-it-works" className="group flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="font-medium">See How It Works</span>
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-32" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-3xl font-bold text-center text-slate-900 mb-16">Powerful Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-indigo-100">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-200/50 group-hover:shadow-violet-300/50 transition-shadow">
                  <svg className="w-8 h-8 text-white transform transition-transform group-hover:scale-110 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Video to Interactive</h3>
                <p className="text-base text-slate-600 text-center leading-relaxed">
                  Upload any lecture video and automatically generate summaries, quizzes, animations, and interactive simulations.
                </p>
              </div>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-purple-100">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-200/50 group-hover:shadow-purple-300/50 transition-shadow">
                  <svg className="w-8 h-8 text-white transform transition-transform group-hover:scale-110 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Accessibility First</h3>
                <p className="text-base text-slate-600 text-center leading-relaxed">
                  Built-in support for dyslexia, learning disabilities, multiple languages, and age-appropriate content customization.
                </p>
              </div>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-indigo-100">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200/50 group-hover:shadow-indigo-300/50 transition-shadow">
                  <svg className="w-8 h-8 text-white transform transition-transform group-hover:scale-110 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Smart Personalization</h3>
                <p className="text-base text-slate-600 text-center leading-relaxed">
                  Content adapts to your major, age, and learning preferences. Physics majors get different context than CS majors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative bg-gradient-to-b from-slate-50 to-white -mx-6 px-6 py-24 mb-32" aria-labelledby="how-it-works-heading">
          <div className="absolute inset-0 bg-grid-slate-900/[0.02] -z-10"></div>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-violet-100/20 to-indigo-100/20 rounded-l-[100px] -z-10 blur-3xl"></div>
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="how-it-works-heading" className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-lg text-slate-600">Three simple steps to transform your learning experience</p>
            </div>
            
            <div className="relative grid md:grid-cols-3 gap-12">
              {/* Connecting Line */}
              <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-200 via-purple-200 to-indigo-200 hidden md:block"></div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-center bg-white rounded-2xl p-8 shadow-xl shadow-violet-100/20 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-200/40">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-violet-200/50 group-hover:shadow-violet-300/50 transition-all duration-300 transform group-hover:scale-110">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Upload Video</h3>
                  <p className="text-base text-slate-600 leading-relaxed">Upload any lecture video in any format - we handle the rest</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-center bg-white rounded-2xl p-8 shadow-xl shadow-purple-100/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-200/40">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-purple-200/50 group-hover:shadow-purple-300/50 transition-all duration-300 transform group-hover:scale-110">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">AI Processing</h3>
                  <p className="text-base text-slate-600 leading-relaxed">Our AI analyzes content and creates interactive learning materials</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-center bg-white rounded-2xl p-8 shadow-xl shadow-indigo-100/20 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-200/40">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg shadow-indigo-200/50 group-hover:shadow-indigo-300/50 transition-all duration-300 transform group-hover:scale-110">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Learn & Engage</h3>
                  <p className="text-base text-slate-600 leading-relaxed">Access personalized, interactive learning content instantly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative text-center max-w-3xl mx-auto overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-700 dark:to-indigo-700 rounded-3xl transform -rotate-1"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-700 dark:to-indigo-700 rounded-3xl transform rotate-1 opacity-50"></div>
          <div className="relative bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-700 dark:to-indigo-700 p-16 rounded-3xl text-white overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
              <p className="text-xl mb-10 text-violet-100">
                Join thousands of students making education more accessible and engaging.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/signup">
                  <button
                    className="group bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-violet-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-slate-700 focus:ring-offset-2 focus:ring-offset-violet-600 dark:focus:ring-offset-violet-700 transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-700/20 dark:hover:shadow-violet-500/20"
                    aria-label="Get started with Smart Studying for free"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Get Started Free</span>
                      <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </span>
                  </button>
                </Link>
                <a href="#features" className="text-violet-100 hover:text-white transition-colors">
                  <span className="flex items-center space-x-2">
                    <span>Learn More</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-32 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">Features</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">Use Cases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">About</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">Terms</a></li>
                <li><a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white dark:hover:text-slate-300 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 dark:border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-lg font-bold">StudySurf</span>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              © 2025 StudySurf Learning. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}