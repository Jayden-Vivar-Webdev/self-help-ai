'use client'

import BentoGrid from "./components/bento/bento"
import Features from "./components/content/whitebg-features"
import FaqSection from "./components/faq/faq"
import Stats from "./components/stats/stats"

const statsData = [
  { id: '1', name: 'Users', value: '1000', unit: 'per month' },
  { id: '2', name: 'Programs Generated', value: '2500', unit:'+' },
  { id: '3', name: 'Sessions Completed', value: '5000', unit:'Workouts' },
]


export default function HomePage() {

  return (
    <>
    <div
      className="
        relative
        bg-[url('/images/fitness.png')] bg-no-repeat bg-cover bg-center
        md:bg-cover md:bg-start
        lg:bg-cover
        
      "
    >
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70" />  
    
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative primary-bg rounded-full px-3 py-1 text-sm/6 text-white ring-1 ring-white/30 hover:ring-blue-900/20">
              Announcing our next generation self help AI.  {''}  
              <a href="#" className="font-semibold text-gray">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Nexian Your guide to success.
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-200 sm:text-xl/8">
            Nexians are your dedicated, knowledgeable fitness companions here to motivate, guide, and support you every step of your health journey. They help you set realistic goals, celebrate your progress, and learn from every challenge to keep you moving forward with confidence and purpose.

            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md primary-bg px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          
        </div>
      </div>
    </div>

    <Stats stats={statsData}/>
    <BentoGrid />
    <Features />
    <FaqSection />
    </>
  )
}
