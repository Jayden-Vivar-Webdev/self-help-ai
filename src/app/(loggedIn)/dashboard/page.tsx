'use client';
import { useEffect, useRef, useState } from 'react';
import WorkoutPlanDisplay from '@/app/components/workouts/viewWorkouts'
import { Visualiser } from '@/app/components/visualiser/3d-visualiser';
import { retrieveWorkout } from '@/app/lib/helpers/frontend/requestWorkouts';
import { startTalking, stopTalking } from '@/app/lib/helpers/frontend/aiSessionStart';
import {WorkoutWeek} from '@/app/lib/types/workouts/workoutHistory'
import { FiMic, FiMicOff, FiUser, FiActivity, FiZap } from 'react-icons/fi'

//Visualiser parameters
type VisualiserType = {
  startListening: () => void;
  stop: () => void;
};

export default function VoiceAgent() {
  //Variables Usestates
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const stopBtnRef = useRef<HTMLButtonElement>(null);
  const [retrieveableWorkouts, setRetrieveableWorkouts] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visualiserRef = useRef<VisualiserType | null>(null);
  const [workouts, setWorkout] = useState<WorkoutWeek | null>();
  const orbRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [isTalking, setIsTalking] = useState(false);
  
  
  //Load in visualiser for ai interactions
  useEffect(() => {
    const vis = Visualiser(containerRef.current);
    if (vis) {
      visualiserRef.current = vis;
    }
  }, []);
  

  //fetch user workout data.
  const fetchUserWorkout = async () => {
    const workouts = await retrieveWorkout()
    if(workouts){
      setWorkout(workouts);
      setRetrieveableWorkouts(true);
    }
    else{
      setRetrieveableWorkouts(false)
    }
  };
  

  useEffect(()=>{
    fetchUserWorkout();
  },[retrieveableWorkouts])

  

  const handleStart = () => {
    visualiserRef.current?.startListening();
    setIsTalking(true);    // set talking mode on
    startTalking(orbRef.current, statusRef.current, setRetrieveableWorkouts);
  };

  const handleStop = () => {
    visualiserRef.current?.stop();
    setIsTalking(false);   // set talking mode off
    stopTalking(orbRef.current, statusRef.current);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Voice Agent Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full mb-6">
              <FiZap className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">AI-Powered Assistant</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Meet Your Personal Trainer
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Talk naturally with Nexian to get personalized workout guidance, track your progress, and optimize your training
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
              <div className="bg-blue-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiUser className="text-2xl text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Personal Guidance</h3>
              <p className="text-slate-600 text-sm">Get customized advice based on your fitness level and goals</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
              <div className="bg-emerald-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiActivity className="text-2xl text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Progress Tracking</h3>
              <p className="text-slate-600 text-sm">Monitor your improvements and adjust your training plan</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 text-center">
              <div className="bg-purple-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiMic className="text-2xl text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Voice Interaction</h3>
              <p className="text-slate-600 text-sm">Speak naturally - no complicated commands needed</p>
            </div>
          </div>

          {/* Main Voice Agent Interface */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              
              {/* Visualizer Section */}
              <div className="bg-slate-900 p-6 sm:p-8 md:p-12 text-center">
                <div className="z-10 flex justify-center mb-6 sm:mb-8">
                  <div 
                    id="orb" 
                    ref={orbRef} 
                    className={`relative transition-all duration-500 ${isTalking ? 'scale-105 sm:scale-110' : 'scale-100'}`}
                  >
                    {/* Responsive container with multiple ring animations */}
                    <div className="relative">
                      <div 
                        ref={containerRef} 
                        className='h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-gradient-to-br from-slate-700/50 to-slate-900/50 backdrop-blur-sm'
                      ></div>
                      
                      {/* Multiple pulse rings when talking */}
                      {isTalking && (
                        <>
                          <div className="absolute inset-0 rounded-full border-2 border-blue-400/60 animate-ping"></div>
                          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-ping" style={{ animationDelay: '0.3s' }}></div>
                          <div className="absolute inset-0 rounded-full border border-purple-400/30 animate-ping" style={{ animationDelay: '0.6s' }}></div>
                        </>
                      )}
                      
                      {/* Subtle idle glow when not talking */}
                      {!isTalking && (
                        <div className="absolute inset-0 rounded-full border border-slate-400/20 animate-pulse"></div>
                      )}
                      
                      {/* Inner decorative elements */}
                      <div className="absolute inset-4 rounded-full border border-white/10"></div>
                      <div className="absolute inset-8 rounded-full border border-white/5"></div>
                      
                      {/* Center indicator dot */}
                      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                        isTalking 
                          ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' 
                          : 'bg-slate-400 shadow-sm'
                      }`}></div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div 
                  id="status" 
                  ref={statusRef} 
                  className="text-base sm:text-lg font-medium text-slate-300 mb-6 sm:mb-8 min-h-[2rem] flex items-center justify-center px-4"
                >
                  Ready to connect...
                </div>

                {/* Control Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
                  <button
                    ref={startBtnRef}
                    onClick={handleStart}
                    disabled={isTalking}
                    className={`flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg w-full sm:w-auto ${
                      isTalking 
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95'
                    }`}
                  >
                    <FiMic className="text-lg sm:text-xl" />
                    <span className="whitespace-nowrap">{isTalking ? 'Listening...' : 'Start Conversation'}</span>
                  </button>
                  
                  <button
                    ref={stopBtnRef}
                    onClick={handleStop}
                    disabled={!isTalking}
                    className={`z-10 flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg w-full sm:w-auto ${
                      !isTalking 
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 active:scale-95'
                    }`}
                  >
                    <FiMicOff className="text-lg sm:text-xl" />
                    <span className="whitespace-nowrap">End Conversation</span>
                  </button>
                </div>
              </div>

              {/* Tips Section */}
              <div className="p-8 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-4 text-center">How to get started</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                    <p className="text-slate-600">Click &ldquo;Start Conversation&rdquo; and allow microphone access</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                    <p className="text-slate-600">Ask about your workouts, progress, or get training tips</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                    <p className="text-slate-600">Speak naturally, try &ldquo;How&apos;s my progress?&rdquo; or &ldquo;What&apos;s next?&rdquo;</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">4</div>
                    <p className="text-slate-600">Click &ldquo;End Conversation&rdquo; when you&apos;re finished</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workout Plan Section */}
      <section className="pb-16">
        {workouts ? (
          
          <WorkoutPlanDisplay workoutData={workouts} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-slate-200">
              <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Loading Your Workout Plan</h3>
              <p className="text-slate-600">Preparing your personalized training program...</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}