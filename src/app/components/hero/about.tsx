import React from 'react';

export default function AboutHero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-8 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              We&apos;re changing the way people connect
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis 
              cupidatat mollit qute velit. Et labore commodo nulla aliqua proident 
              mollit ullamco exercitation tempor. Sint aliqua anim nulla sunt mollit id 
              pariatur in voluptate cillum. Eu voluptate tempor esse minim amet fugiat 
              veniam occaecat aliqua.
            </p>
          </div>

          {/* Right Photo Collage */}
          <div className="relative h-[600px] lg:h-[700px]">
            {/* Main large image - top right */}
            <div className="absolute top-0 right-0 w-48 h-64 lg:w-56 lg:h-72 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Person working alone - middle left */}
            <div className="absolute top-20 left-4 w-40 h-48 lg:w-44 lg:h-52 rounded-2xl overflow-hidden shadow-xl transform -rotate-2 hover:-rotate-6 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616c9b5962b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Person working" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Meeting room - bottom left */}
            <div className="absolute bottom-20 left-0 w-44 h-32 lg:w-48 lg:h-36 rounded-2xl overflow-hidden shadow-xl transform rotate-1 hover:rotate-3 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Meeting room" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Office space - bottom right */}
            <div className="absolute bottom-4 right-12 w-40 h-44 lg:w-44 lg:h-48 rounded-2xl overflow-hidden shadow-xl transform -rotate-3 hover:-rotate-6 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Modern office" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Person with plants - top center */}
            <div className="absolute top-32 right-24 w-36 h-40 lg:w-40 lg:h-44 rounded-2xl overflow-hidden shadow-lg transform rotate-6 hover:rotate-12 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                alt="Person with plants" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-10 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-32 right-4 w-3 h-3 bg-pink-400 rounded-full opacity-60 animate-pulse delay-300"></div>
            <div className="absolute top-48 left-12 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-pulse delay-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}