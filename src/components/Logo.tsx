'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <svg 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:#3B82F6]" />
            <stop offset="40%" className="[stop-color:#8B5CF6]" />
            <stop offset="100%" className="[stop-color:#EC4899]" />
          </linearGradient>
          <filter id="logo-glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Glassmorphism background */}
        <rect 
          width="32" 
          height="32" 
          rx="10" 
          fill="url(#logo-grad)" 
          fillOpacity="0.15" 
          filter="url(#logo-glow)"
          className="dark:fill-opacity-25"
        />
        <rect 
          width="32" 
          height="32" 
          rx="10" 
          stroke="url(#logo-grad)" 
          strokeWidth="1.5" 
          fill="none" 
          strokeOpacity="0.4"
          className="dark:stroke-opacity-60"
        />
        
        {/* Chat bubble with enhanced glassmorphism */}
        <path 
          d="M6 12C6 9.23858 8.23858 7 11 7H21C23.7614 7 26 9.23858 26 12V16C26 18.7614 23.7614 21 21 21H15L10 25V21H11C8.23858 21 6 18.7614 6 16V12Z" 
          fill="url(#logo-grad)" 
          fillOpacity="0.9" 
          filter="url(#logo-glow)"
          className="dark:fill-opacity-95"
        />
        
        {/* AI dots with enhanced styling */}
        <circle cx="12" cy="14.5" r="1.8" fill="rgba(255,255,255,0.95)" className="dark:fill-slate-900"/>
        <circle cx="16" cy="14.5" r="1.8" fill="rgba(255,255,255,0.95)" className="dark:fill-slate-900"/>
        <circle cx="20" cy="14.5" r="1.8" fill="rgba(255,255,255,0.95)" className="dark:fill-slate-900"/>
        
        {/* Sparkle accent */}
        <path 
          d="M22 9L23 11L25 10L23 12L22 14L21 12L19 10L21 11Z" 
          fill="rgba(255,255,255,0.8)" 
          opacity="0.7"
          className="dark:fill-slate-400 dark:opacity-80"
        />
      </svg>
    </div>
  );
}
