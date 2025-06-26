"use client"
import NutritionalInfo from "@/app/components/meals/mealplan";
import { useEffect, useRef, useState } from "react";
import { Visualiser } from '@/app/components/visualiser/3d-visualiser';
import { genMealPlan } from "@/app/lib/helpers/frontend/generateMeal";
import { getMealPlan } from "@/app/lib/helpers/frontend/viewMealPlan";
import { startTalking, stopTalking } from "@/app/lib/helpers/frontend/aiSessionNutrition";

//Visualiser parameters
type VisualiserType = {
  startListening: () => void;
  stop: () => void;
};

export default function Calendar(){

    const startBtnRef = useRef<HTMLButtonElement>(null);
    const stopBtnRef = useRef<HTMLButtonElement>(null);
    const [mealPlan, setMealPlan] = useState(null);  
    const containerRef = useRef<HTMLDivElement | null>(null);
    const visualiserRef = useRef<VisualiserType | null>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);
    const [isTalking, setIsTalking] = useState(false);

    
    async function generateMealPlan(){
        const res = await genMealPlan();
        setMealPlan(res);
    }
    
    async function viewMealPlan(){
        const res = await getMealPlan()
        setMealPlan(res);
    }

    useEffect(() => {
        try {
          viewMealPlan()
        } catch (error) {
          console.log(error);
        }
      }, []);

      const handleStart = () => {
        visualiserRef.current?.startListening();
        setIsTalking(true);    // set talking mode on
        startTalking(orbRef.current, statusRef.current, mealPlan);
      };
    
      const handleStop = () => {
        visualiserRef.current?.stop();
        setIsTalking(false);   // set talking mode off
        stopTalking(orbRef.current, statusRef.current);
      };

            

    //Load in visualiser for ai interactions
    useEffect(() => {
      const vis = Visualiser(containerRef.current);
      if (vis) {
        visualiserRef.current = vis;
    }});


    return(
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
        <div className="mx-auto flex flex-col justify-center gap-10 items-center rounded-md p-10 ring-2 ring-blue-400/20 ring-inset max-w-7xl sm:px-6 lg:px-8">
            <div className=" pt-24 sm:pt-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                  <div className="text-center">
                      <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                        Nutritional Guidance And Meal Planning
                      </h2>
                      <p className="mt-4 text-lg/8 text-gray-300">
                        Below is your daily macros and meals for the week. If you require guidance please speak to your coach.
                      </p>
                  </div>
                  
                  <div className="flex justify-center pt-20">
                    {mealPlan === null &&  <button
                        onClick={() => generateMealPlan}
                        type="button"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Generate Nutritional Program
                    </button>} : {
                        mealPlan && <button
                        onClick={() => generateMealPlan}
                        type="button"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Regenerate Plan
                    </button>
                    }
                  </div>
                </div>
            </div>
            </div>
            {mealPlan ? (
              <NutritionalInfo mealPlan={mealPlan} />
              ) : (
              <p className="text-center text-gray-400">No meal plan loaded yet.</p>
            )} 
        </div>    
        </>
        
    )
}