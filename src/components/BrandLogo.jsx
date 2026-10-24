import React from 'react';

export default function BrandLogo({ size = 'md', className = '' }) {
  const isSm = size === 'sm';
  const iconDim = isSm ? 18 : 22;

  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Precision Geometric SVG mark */}
      <svg
        width={iconDim}
        height={iconDim}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 group-hover:rotate-90"
      >
        <path
          d="M4 8V4H8M16 4H20V8M20 16V20H16M8 20H4V16"
          stroke="#ff2d55"
          strokeWidth="1.75"
          strokeLinecap="square"
        />
        <rect x="10" y="10" width="4" height="4" fill="currentColor" className="text-neutral-900 dark:text-white" />
      </svg>

      <div className="flex items-center gap-2">
        <span className="font-semibold text-neutral-900 dark:text-white tracking-[0.22em] text-sm uppercase">
          SDLPC
        </span>
        <span className="w-1 h-1 rounded-full bg-[#ff2d55]" />
      </div>
    </div>
  );
}
