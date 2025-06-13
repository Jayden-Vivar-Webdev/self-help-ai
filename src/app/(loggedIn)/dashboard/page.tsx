'use client';

import { useEffect, useRef } from 'react';
import { session } from '@/app/lib/voiceAgent';
import FeedSection
 from '@/app/components/feed/feed';
export default function VoiceAgent() {
  const startBtnRef = useRef<HTMLButtonElement>(null);
  const stopBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const orb = document.getElementById('orb');
    const status = document.getElementById('status');
    const startBtn = startBtnRef.current;
    const stopBtn = stopBtnRef.current;

    const startTalking = async () => {
      orb?.classList.add('active');
      status!.textContent = 'Connecting...';
      startBtn!.disabled = true;
    
      try {
        const res = await fetch('/api/openai/session', { method: 'POST' });
        const data = await res.json();
    
        if (data?.clientSecret) {
          await session.connect({
            apiKey: data.clientSecret,
          });
          console.log('Connected to session.');
          status!.textContent = 'Connected. Speak now...';
          stopBtn!.disabled = false;
        } else {
          console.error('No client secret returned:', data);
          status!.textContent = 'Failed to retrieve session key.';
          startBtn!.disabled = false;
        }
      } catch (err) {
        console.error('Connection failed:', err);
        status!.textContent = 'Failed to connect.';
        startBtn!.disabled = false;
      }
    };
    

    const stopTalking = async () => {
      orb?.classList.remove('active');
      status!.textContent = 'Disconnecting...';

      try {
        await session.close();
        console.log('Disconnected from session.');
        status!.textContent = 'Stopped.';
      } catch (err) {
        console.error('Failed to disconnect:', err);
        status!.textContent = 'Error during disconnect.';
      }

      stopBtn!.disabled = true;
      startBtn!.disabled = false;
    };

    startBtn?.addEventListener('click', startTalking);
    stopBtn?.addEventListener('click', stopTalking);

    return () => {
      startBtn?.removeEventListener('click', startTalking);
      stopBtn?.removeEventListener('click', stopTalking);
    };
  }, []);

  return (
    <>
    <section className='pb-10'>
      <div className="p-10 border-gray-300 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-500 shadow-xl shadow-blue-500/30 transition-all duration-300 flex items-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Voice AI Agent</h1>
          <p className="text-indigo-200">Talk naturally with your AI assistant</p>
        </div>

        {/* Orb */}
        <div className="flex justify-center my-8">
          <div id="orb" className="relative">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 shadow-xl shadow-blue-500/30 transition-all duration-300 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-white opacity-10 animate-pulse"></div>
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 shadow-inner"></div>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-200 to-blue-300 shadow-inner"></div>
              <div className="absolute inset-0 rounded-full bg-cyan-300 opacity-0 transition-opacity duration-300" id="orb-glow"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white opacity-70 animate-float1"></div>
              <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-200 opacity-70 animate-float2"></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-white opacity-70 animate-float3"></div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            ref={startBtnRef}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white font-medium rounded-full shadow-lg hover:shadow-green-500/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          >
            Start Talking
          </button>
          <button
            ref={stopBtnRef}
            className="px-6 py-3 bg-gradient-to-r from-red-400 to-pink-500 text-white font-medium rounded-full shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 opacity-70"
            disabled
          >
            Stop Talking
          </button>
        </div>

        {/* Status */}
        <div id="status" className="text-center text-indigo-200 mt-4 italic">
          Ready to connect...
        </div>
      </div>
      
      </div>
    </section>
    <div className='grid grid-cols-1 2xl:grid-cols-3 gap-4'>
      <div className='p-10'>
        <h2 className='text-xl font-bold mb-2'>Goal 1: Build A successful business</h2>
        <FeedSection />
      </div>
      <div className='p-10'>
        <h2 className='text-xl font-bold mb-2'>Goal 2: Learn spanish</h2>
        <FeedSection />
      </div>
      <div className='p-10'>
        <h2 className='text-xl font-bold mb-2'>Goal 3: Compete at the olympics</h2>
        <FeedSection />
      </div>
    </div>

      
    

    </>
  );
}
