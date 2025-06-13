import React from 'react';

export default function AboutContent() {
  return (
    <div className="bg-white py-16 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block">
            <span className="bg-yellow-300 text-black font-semibold px-2 py-1 text-sm">About</span>
            <span className="text-black font-semibold text-sm ml-1">us</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 leading-tight">
            On a mission to empower remote teams
          </h1>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl leading-relaxed">
            Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, 
            sit dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-12">
            {/* Our Mission */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our mission</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus 
                  enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent 
                  donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. 
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus 
                  enim. Mattis mauris semper sed amet vitae sed turpis id.
                </p>
                <p>
                  Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id 
                  et. Id blandit molestie auctor fermentum dignissim. Lacus diam tincidunt 
                  ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing 
                  egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h3 className="text-xl font-semibold text-gray-600 mb-8">The numbers</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">$150M</div>
                  <div className="text-gray-600">Raised</div>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">30K</div>
                  <div className="text-gray-600">Companies</div>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">1.5M</div>
                  <div className="text-gray-600">Deals Closed</div>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">200M</div>
                  <div className="text-gray-600">Leads Generated</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Photo Grid */}
          <div className="relative">
            {/* Top image - Team meeting */}
            <div className="mb-6">
              <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Team meeting with presentation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Bottom left - Women collaborating */}
              <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Women collaborating on project" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom right - Person working remotely */}
              <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616c9b5962b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Person working remotely with laptop" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-6">
              {/* Modern office space */}
              <div className="w-full h-52 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Modern office workspace" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
            <div className="absolute top-32 -left-3 w-3 h-3 bg-yellow-400 rounded-full opacity-60"></div>
            <div className="absolute bottom-20 -right-4 w-2 h-2 bg-pink-400 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  );
}