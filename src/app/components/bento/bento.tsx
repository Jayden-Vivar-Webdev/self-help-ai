import React from 'react';

const codeString = `if (userRPE < 4) {
  // User found workout too easy
  increaseWorkoutIntensity();
  displayMessage("Great! Let's push a bit harder next time.");

} else if (userRPE >= 4 && userRPE <= 7) {
  // User had a moderate workout
  maintainCurrentPlan();
  displayMessage("Awesome! Keep up the steady progress.");

} else if (userRPE > 7 && userRPE < 10) {
  // User found workout challenging but manageable
  suggestRecoveryTips();
  displayMessage("Well done! Remember to rest and recover.");

} else if (userRPE >= 10) {
  // User is too fatigued or injured
  reduceWorkoutIntensity();
  recommendMedicalConsult();
  displayMessage("Take it easy and consult a professional if needed.");
}`;

export default function BentoGrid() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center mb-16">
          <p className="text-base font-semibold text-blue-600 mb-4">Increased Performance</p>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Everything you need to achieve your health and fitness goals
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how our intelligent platform adapts to your needs and helps you reach peak performance.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 lg:grid-rows-2">
          {/* Mobile Friendly Card */}
          <div className="relative lg:row-span-2 group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Mobile Friendly</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Optimized for mobile. Login, review your workouts, and talk to your Nexian for advice anywhere, anytime.
                </p>
                <div className="bg-gray-900 rounded-xl p-4 shadow-inner">
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                    <div className="text-white text-sm font-medium">Nexia Mobile</div>
                    <div className="text-gray-400 text-xs mt-1">Your fitness companion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Card */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0l-3-3m3 3l-3 3m-5 8H5a2 2 0 01-2-2V9a2 2 0 012-2h8" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Performance</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Nexia adapts and modifies your programs to ensure you are continuously improving and reaching new heights.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="text-sm text-gray-600">Strength Increase</span>
                    <span className="text-sm font-semibold text-green-600">+15%</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="text-sm text-gray-600">Endurance Boost</span>
                    <span className="text-sm font-semibold text-green-600">+22%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Technologies Card */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Advanced Technologies</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Your Nexian is a powerful intelligent personal health and fitness specialist powered by cutting-edge AI.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-600">AI Powered</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-600">Smart Analytics</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-600">Personalized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Powerful Results Card */}
          <div className="relative lg:col-span-2 group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-100 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <div className="p-8 w-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Powerful Results</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  The more you interact with Nexia, the smarter it programs your nutritional and fitness plans.
                </p>
                
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-inner">
                  <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-gray-300 text-sm mt-2 font-mono">nexia-programming.js</div>
                  </div>
                  <div className="p-4 text-sm font-mono overflow-auto max-h-64">
                    <pre className="text-green-400">
                      <code>{codeString}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}