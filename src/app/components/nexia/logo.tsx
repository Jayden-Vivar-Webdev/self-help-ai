const NexiaLogo = () => {
  return (
    <svg 
      width="180" 
      height="44" 
      viewBox="0 0 180 44" 
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300 hover:scale-105"
    >
      <defs>
        {/* Primary brand gradient */}
        <linearGradient id="nexiaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        
        {/* Secondary accent gradient */}
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        
        {/* Subtle glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Main logo text */}
      <text
        x="8"
        y="30"
        fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="url(#nexiaGradient)"
        letterSpacing="-0.5"
        className="select-none"
      >
        NEXIA
      </text>
      
      {/* Professional underline with gradient */}
      <path
        d="M8,34 L82,34"
        stroke="url(#nexiaGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* AI FITNESS tagline */}
      <text
        x="90"
        y="26"
        fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="rgba(71, 85, 105, 0.8)"
        letterSpacing="1.2"
        className="select-none"
      >
        AI FITNESS
      </text>
      
      {/* Professional geometric symbol */}
      <g transform="translate(148, 12)">
        {/* Outer ring */}
        <circle 
          cx="10" 
          cy="10" 
          r="8" 
          fill="none" 
          stroke="url(#nexiaGradient)" 
          strokeWidth="2"
          opacity="0.6"
        />
        
        {/* Inner elements - representing AI/data points */}
        <circle cx="10" cy="6" r="1.5" fill="#3b82f6" />
        <circle cx="14" cy="10" r="1.5" fill="#06b6d4" />
        <circle cx="10" cy="14" r="1.5" fill="#10b981" />
        <circle cx="6" cy="10" r="1.5" fill="#3b82f6" opacity="0.7" />
        
        {/* Center dot */}
        <circle cx="10" cy="10" r="1" fill="#475569" opacity="0.9" />
        
        {/* Connecting lines for network effect */}
        <g stroke="rgba(71, 85, 105, 0.4)" strokeWidth="0.5">
          <line x1="10" y1="6" x2="10" y2="10" />
          <line x1="14" y1="10" x2="10" y2="10" />
          <line x1="10" y1="14" x2="10" y2="10" />
          <line x1="6" y1="10" x2="10" y2="10" />
        </g>
      </g>
      
      {/* Subtle background glow */}
      <rect 
        x="0" 
        y="0" 
        width="180" 
        height="44" 
        fill="url(#nexiaGradient)" 
        opacity="0.02" 
        rx="8"
      />
    </svg>
  );
};

export default NexiaLogo;