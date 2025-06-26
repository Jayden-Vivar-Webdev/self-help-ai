const NexiaLogo = () => {
  return (
    <svg width="160" height="40" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nexiaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      
      {/* Clean typography */}
      <text 
        x="0" 
        y="28" 
        fontFamily="'Inter', sans-serif" 
        fontSize="24" 
        fontWeight="600" 
        fill="url(#nexiaGradient)"
        letterSpacing="-0.3"
      >
        NEXIA
      </text>
      
      {/* Minimalist underline */}
      <path 
        d="M0,32 L70,32" 
        stroke="url(#nexiaGradient)" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Discrete AI Fitness indicator */}
      <text 
        x="80" 
        y="28" 
        fontFamily="'Inter', sans-serif" 
        fontSize="12" 
        fontWeight="500" 
        fill="#6B7280"
        letterSpacing="0.5"
      >
        AI FITNESS
      </text>
      
      {/* Abstract dot grid symbol */}
      <g transform="translate(130, 10)">
        <circle cx="0" cy="0" r="2" fill="#2563EB" />
        <circle cx="6" cy="0" r="2" fill="#7C3AED" />
        <circle cx="3" cy="6" r="2" fill="#2563EB" opacity="0.7" />
      </g>
    </svg>
  );
};

export default NexiaLogo;