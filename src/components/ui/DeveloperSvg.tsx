"use client";

import React from "react";

export function DeveloperSvg({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full flex items-center justify-center p-4 bg-[var(--card)] rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[320px] transition-all duration-300"
      >
        {/* Style sheet for premium GPU-accelerated micro-animations */}
        <style>{`
          /* Keyboard typing animation */
          @keyframes typing-hands {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          .animate-hand-left {
            animation: typing-hands 0.8s ease-in-out infinite;
          }
          .animate-hand-right {
            animation: typing-hands 0.8s ease-in-out infinite 0.4s;
          }

          /* Coffee steam animation */
          @keyframes steam {
            0% { transform: translateY(0) scaleX(1); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-12px) scaleX(1.3); opacity: 0; }
          }
          .animate-steam-1 {
            animation: steam 2.5s ease-in-out infinite;
            transform-origin: bottom center;
          }
          .animate-steam-2 {
            animation: steam 2.5s ease-in-out infinite 1.25s;
            transform-origin: bottom center;
          }

          /* Code line scroll */
          @keyframes code-scroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(-20px); }
          }
          .animate-code {
            animation: code-scroll 8s linear infinite;
          }

          /* Cursor blink */
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-cursor {
            animation: blink 1s step-end infinite;
          }

          /* Developer subtle breathing */
          @keyframes breathe {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-1.5px); }
          }
          .animate-body {
            animation: breathe 4s ease-in-out infinite;
          }

          /* Laptop Screen Glow */
          @keyframes screen-glow {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.25; }
          }
          .animate-glow {
            animation: screen-glow 3s ease-in-out infinite;
          }

          /* Tiny floating particles */
          @keyframes float-particle {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
            50% { transform: translateY(-8px) translateX(4px); opacity: 0.4; }
          }
          .animate-particle-1 {
            animation: float-particle 5s ease-in-out infinite;
          }
          .animate-particle-2 {
            animation: float-particle 6s ease-in-out infinite 2s;
          }
        `}</style>

        {/* Ambient screen glow */}
        <path
          d="M 125 155 L 275 155 L 300 280 L 100 280 Z"
          fill="var(--primary)"
          className="animate-glow transition-colors duration-300"
          style={{ mixBlendMode: "screen" }}
        />

        {/* Background Desk line */}
        <line
          x1="40"
          y1="310"
          x2="360"
          y2="310"
          stroke="var(--border-color)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Floating Particles */}
        <circle cx="90" cy="140" r="2.5" fill="var(--primary)" className="animate-particle-1" />
        <circle cx="310" cy="110" r="2" fill="var(--primary)" className="animate-particle-2" />
        <circle cx="280" cy="220" r="1.5" fill="var(--primary)" className="animate-particle-1" />

        {/* THE DEVELOPER (Subtle Breathing group) */}
        <g className="animate-body" style={{ transformOrigin: "200px 310px" }}>
          {/* Head & Hair */}
          <path
            d="M 185 100 C 185 85, 215 85, 215 100 C 215 112, 185 112, 185 100 Z"
            stroke="var(--text-secondary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 182 96 C 185 80, 215 80, 218 96"
            stroke="var(--primary)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Neck */}
          <line
            x1="200"
            y1="112"
            x2="200"
            y2="122"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />

          {/* Body/Shoulders */}
          <path
            d="M 160 155 C 160 128, 240 128, 240 155"
            stroke="var(--text-secondary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          
          {/* Shirt Accent */}
          <path
            d="M 194 125 L 200 135 L 206 125"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Left Arm & Hand Typing */}
          <path
            d="M 165 155 L 155 220 L 180 230"
            stroke="var(--text-secondary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Hand Left */}
          <g className="animate-hand-left" style={{ transformOrigin: "180px 230px" }}>
            <path
              d="M 180 230 C 184 226, 192 226, 196 230"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* Right Arm & Hand Typing */}
          <path
            d="M 235 155 L 245 220 L 220 230"
            stroke="var(--text-secondary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Hand Right */}
          <g className="animate-hand-right" style={{ transformOrigin: "220px 230px" }}>
            <path
              d="M 220 230 C 216 226, 208 226, 204 230"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* LAPTOP / WORKSTATION */}
        {/* Screen Bezel */}
        <rect
          x="130"
          y="160"
          width="140"
          height="90"
          rx="6"
          stroke="var(--text-secondary)"
          strokeWidth="3"
          fill="var(--card)"
        />
        {/* Inner Screen */}
        <rect
          x="136"
          y="166"
          width="128"
          height="78"
          rx="3"
          stroke="var(--border-color)"
          strokeWidth="1.5"
          fill="var(--background)"
          opacity="0.9"
        />

        {/* Code Scrolling Lines inside Screen */}
        <g style={{ clipPath: "url(#screen-clip)" }}>
          <clipPath id="screen-clip">
            <rect x="138" y="168" width="124" height="74" rx="2" />
          </clipPath>
          
          <g className="animate-code">
            {/* Mock code lines using stroke-dasharray styling */}
            <line x1="145" y1="180" x2="220" y2="180" stroke="var(--primary)" strokeWidth="2" strokeDasharray="15, 8, 20, 5" strokeLinecap="round" />
            <line x1="145" y1="190" x2="240" y2="190" stroke="var(--text-secondary)" strokeWidth="2" strokeDasharray="30, 10, 10, 5" strokeLinecap="round" />
            <line x1="155" y1="200" x2="210" y2="200" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="12, 5, 15, 5" strokeLinecap="round" />
            <line x1="155" y1="210" x2="230" y2="210" stroke="var(--primary)" strokeWidth="2" strokeDasharray="25, 8, 12, 5" strokeLinecap="round" />
            <line x1="145" y1="220" x2="190" y2="220" stroke="var(--text-secondary)" strokeWidth="2" strokeDasharray="10, 5, 20, 5" strokeLinecap="round" />
            <line x1="145" y1="230" x2="225" y2="230" stroke="var(--primary)" strokeWidth="2" strokeDasharray="18, 5, 25, 5" strokeLinecap="round" />
            <line x1="155" y1="240" x2="200" y2="240" stroke="var(--border-color)" strokeWidth="2" strokeDasharray="15, 5, 10, 5" strokeLinecap="round" />
            <line x1="145" y1="250" x2="235" y2="250" stroke="var(--text-secondary)" strokeWidth="2" strokeDasharray="25, 8, 15, 5" strokeLinecap="round" />
          </g>

          {/* Glowing Cursor on Screen */}
          <rect
            x="202"
            y="218"
            width="5"
            height="10"
            fill="var(--primary)"
            className="animate-cursor transition-colors"
          />
        </g>

        {/* Laptop Hinge & Keyboard Base */}
        <path
          d="M 110 270 L 290 270 L 310 282 L 90 282 Z"
          stroke="var(--text-secondary)"
          strokeWidth="3"
          strokeLinejoin="round"
          fill="var(--card)"
        />
        {/* Trackpad outline */}
        <line
          x1="185"
          y1="278"
          x2="215"
          y2="278"
          stroke="var(--border-color)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* COFFEE MUG (Warm addition) */}
        <g style={{ transform: "translate(20px, 0)" }}>
          {/* Mug Cup */}
          <rect
            x="300"
            y="275"
            width="18"
            height="22"
            rx="3"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            fill="var(--card)"
          />
          {/* Mug Handle */}
          <path
            d="M 318 280 C 323 280, 323 292, 318 292"
            stroke="var(--text-secondary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Mug Content lines */}
          <line
            x1="303"
            y1="279"
            x2="315"
            y2="279"
            stroke="var(--primary)"
            strokeWidth="1"
            opacity="0.8"
          />

          {/* Steaming Coffee waves */}
          <path
            d="M 305 268 Q 307 262, 305 258"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-steam-1"
          />
          <path
            d="M 311 266 Q 313 260, 311 256"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-steam-2"
          />
        </g>
      </svg>
    </div>
  );
}
