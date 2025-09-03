'use client';

import React, { useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

const SpotlightTextMask: React.FC = () => {
  const svgRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={svgRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsHovered(!isHovered);
        }
      }}
      className="relative inline-block cursor-pointer select-none"
    >
      <svg
        width="700"
        height="118"
        viewBox="0 0 1403 235"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-700"
        style={{
          mask: isHovered
            ? `radial-gradient(circle 220px at ${position.x}px ${position.y}px, black 0%, black 40%, transparent 80%)`
            : 'radial-gradient(circle 0px at 0px 0px, black, transparent)',
          WebkitMask: isHovered
            ? `radial-gradient(circle 220px at ${position.x}px ${position.y}px, black 0%, black 40%, transparent 80%)`
            : 'radial-gradient(circle 0px at 0px 0px, black, transparent)',
        }}
      >
        <defs>
          <linearGradient id="gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="50%" stopColor="#764ba2" />
            <stop offset="100%" stopColor="#f093fb" />
          </linearGradient>
        </defs>
        <path
          d="M155.217 71.6864H104.338V230.207H52.5759V71.6864H1.69655V26.1009H155.217V71.6864ZM334.015 122.272V230.207H284.312V134.33C284.312 114.037 279.018 108.155 260.196 108.155C244.609 108.155 235.786 114.037 232.256 126.683V230.207H182.848V6.69022H232.256V89.6265C240.491 76.392 257.255 68.4513 281.665 68.4513C319.31 68.4513 334.015 84.6268 334.015 122.272ZM371.059 26.395C371.059 3.16103 374.588 1.39641 398.411 1.39641C422.821 1.98462 424.291 2.57282 425.468 26.395C424.291 50.8053 422.821 51.6876 398.411 52.2758C373.706 51.6876 371.941 50.8053 371.059 26.395ZM373.412 230.207V71.3923H423.115V230.207H373.412ZM614.677 122.272V230.207H564.974V134.33C564.974 113.449 559.974 108.155 540.857 108.155C525.27 108.155 516.447 113.449 512.918 125.213V230.207H463.509V71.3923H512.918V89.0383C521.153 76.0979 538.505 68.4513 562.327 68.4513C599.972 68.4513 614.677 84.6268 614.677 122.272ZM808.476 230.207H748.774L711.717 165.21H704.659V230.207H655.25V6.69022H704.659V127.271H714.07L749.95 71.3923H806.417L754.362 145.506L808.476 230.207ZM967.2 163.152L867.206 169.034C869.558 186.68 882.793 194.914 906.615 194.914C916.32 194.914 926.614 193.738 937.201 191.385C947.789 189.032 955.73 186.386 960.73 183.739V221.089C950.436 227.854 924.849 233.148 896.91 233.148C845.736 233.148 817.797 214.031 817.797 150.799C817.797 87.2737 845.148 68.4513 898.968 68.4513C953.671 68.4513 968.964 92.5675 968.964 139.33C968.964 148.153 968.376 156.093 967.2 163.152ZM867.206 135.212L924.261 130.801C924.261 114.331 918.673 105.214 898.968 105.214C876.617 105.214 868.382 112.86 867.206 135.212ZM1099.03 68.4513L1097.85 112.566H1093.44C1071.97 112.566 1054.62 121.683 1051.38 143.741V230.207H1001.68V71.3923H1051.38V99.3319C1059.91 75.8038 1074.62 68.4513 1095.79 68.4513H1099.03ZM1255.35 183.739H1175.65L1159.77 230.207H1105.66L1181.24 26.1009H1251.24L1326.23 230.207H1270.94L1255.35 183.739ZM1190.06 141.388H1241.24L1217.71 71.0982H1214.18L1190.06 141.388ZM1349.3 26.1009H1401.35V230.207H1349.3V26.1009Z"
          fill="transparent"
          stroke="url(#gradient-2)"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};
export default SpotlightTextMask;
