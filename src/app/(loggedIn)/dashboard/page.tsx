'use client';

import { useEffect, useRef, useState } from 'react';
import WorkoutPlanDisplay from '@/app/components/workouts/viewWorkouts'
import { Visualiser } from '@/app/components/visualiser/3d-visualiser';
import { retrieveWorkout } from '@/app/lib/helpers/frontend/requestWorkouts';
import { startTalking, stopTalking } from '@/app/lib/helpers/frontend/aiSessionStart';
import {WorkoutHistory} from '@/app/lib/types/workouts/workoutHistory'

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
  const [workouts, setWorkout] = useState<WorkoutHistory | null>();
  const orbRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [isTalking, setIsTalking] = useState(false);
  
  
  //Load in visualiser for ai interactions
  useEffect(() => {
    const vis = Visualiser(containerRef.current);
    if (vis) {
      visualiserRef.current = vis;
  }});

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
    <>
    <section className='pb-10'>
      
      <div className="p-10 rounded-lg flex items-center justify-center transition-all duration-300 flex items-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Nexian Personal Assistant</h1>
          <p className="text-indigo-200">Talk naturally with your AI assistant</p>
        </div>

        {/* orbRef */}
        <div className="flex justify-center my-8">
          <div id="orb" ref={orbRef} className="relative">
          <div ref={containerRef} className='h-[20rem] w-[20rem]'></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            ref={startBtnRef}
            onClick={handleStart}
            disabled={isTalking}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium rounded-full shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            Start Talking
          </button>
          <button
            ref={stopBtnRef}
            onClick={handleStop}
            disabled={!isTalking}
            className="px-6 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 opacity-70"

          >
            Stop Talking
          </button>
        </div>

        {/* statusRef */}
        <div id="status" ref={statusRef} className="text-center text-indigo-200 mt-4 italic">
          Ready to connect...
        </div>
        

      </div>

      </div>
    </section>

    {workouts ? (
      <WorkoutPlanDisplay workoutData={workouts} />
    ) : (
      <div>Loading...</div>
    )}
    </>
  );
}
