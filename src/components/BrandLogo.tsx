'use client';

import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const textStyles = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Geometric SVG Monogram */}
      <div className={`relative ${iconDimensions} shrink-0`}>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_16px_rgba(16,185,129,0.35)]"
        >
          {/* Frosted rounded container */}
          <rect
            width="44"
            height="44"
            rx="13"
            fill="#090E17"
            stroke="url(#brand_border_grad)"
            strokeWidth="1.5"
          />

          {/* Legal Dossier Fold Base */}
          <path
            d="M13 12C13 10.8954 13.8954 10 15 10H25.1716C25.702 10 26.2107 10.2107 26.5858 10.5858L30.4142 14.4142C30.7893 14.7893 31 15.298 31 15.8284V31C31 32.1046 30.1046 33 29 33H15C13.8954 33 13 32.1046 13 31V12Z"
            fill="url(#brand_fill_grad)"
            stroke="#10B981"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Corner Dossier Fold */}
          <path
            d="M25 10V14.5C25 15.0523 25.4477 15.5 26 15.5H30.5"
            stroke="#10B981"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Speech Dialogue Lines */}
          <path
            d="M18 19H25"
            stroke="#A3E635"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18 23H23"
            stroke="#A3E635"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Forensic Integrity Seal Dot */}
          <circle
            cx="27"
            cy="27"
            r="3"
            fill="#A3E635"
            className="animate-pulse"
          />

          <defs>
            <linearGradient
              id="brand_border_grad"
              x1="0"
              y1="0"
              x2="44"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="0.5" stopColor="#34D399" stopOpacity="0.4" />
              <stop offset="1" stopColor="#A3E635" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient
              id="brand_fill_grad"
              x1="13"
              y1="10"
              x2="31"
              y2="33"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10B981" stopOpacity="0.25" />
              <stop offset="1" stopColor="#064E3B" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight text-white ${textStyles}`}>
              Chat<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400">Docket</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635] animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};

