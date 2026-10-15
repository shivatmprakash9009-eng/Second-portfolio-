"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const W = 800;
const H = 560;
const CORE = { x: 400, y: 410 };
const CORE_R = 62;

// Two rows of floating tech nodes above the core (5 + 4).
const positions: { x: number; y: number }[] = [
  { x: 160, y: 70 },
  { x: 280, y: 70 },
  { x: 400, y: 70 },
  { x: 520, y: 70 },
  { x: 640, y: 70 },
  { x: 220, y: 170 },
  { x: 340, y: 170 },
  { x: 460, y: 170 },
  { x: 580, y: 170 },
];

function linePath(x: number, y: number) {
  const endY = CORE.y - CORE_R;
  return `M ${x} ${y} C ${x} ${y + 150}, ${CORE.x} ${endY - 150}, ${CORE.x} ${endY}`;
}

function ellipsePath(rx: number, ry: number) {
  return `M ${CORE.x - rx} ${CORE.y} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
}

export function SkillsNetwork() {
  return (
    <div
      className="relative mx-auto w-full max-w-3xl"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label={`Skills: ${skills.map((s) => s.label).join(", ")}`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="core-grad" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#e100ff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7f00ff" stopOpacity="0.55" />
          </radialGradient>
          <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0cffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#dc00d3" stopOpacity="0.55" />
          </linearGradient>
          <filter id="core-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        {/* orbits with travelling dots */}
        <g transform={`rotate(-14 ${CORE.x} ${CORE.y})`}>
          <path
            d={ellipsePath(300, 92)}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.18"
          />
          <circle r="5" fill="#0cffff">
            <animateMotion dur="18s" repeatCount="indefinite" path={ellipsePath(300, 92)} />
          </circle>
        </g>
        <g transform={`rotate(10 ${CORE.x} ${CORE.y})`}>
          <path
            d={ellipsePath(235, 74)}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.22"
          />
          <circle r="4" fill="#dc00d3">
            <animateMotion dur="12s" repeatCount="indefinite" path={ellipsePath(235, 74)} />
          </circle>
        </g>

        {/* connecting lines */}
        {positions.map((p, i) => (
          <path
            key={i}
            d={linePath(p.x, p.y + 24)}
            fill="none"
            stroke="url(#line-grad)"
            strokeWidth="1"
            strokeDasharray="4 6"
            className="line-flow"
          />
        ))}

        {/* core orb */}
        <circle
          cx={CORE.x}
          cy={CORE.y}
          r={CORE_R + 14}
          fill="#e100ff"
          opacity="0.55"
          filter="url(#core-glow)"
        />
        <circle cx={CORE.x} cy={CORE.y} r={CORE_R} fill="url(#core-grad)" />
        <circle
          cx={CORE.x}
          cy={CORE.y}
          r={CORE_R}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.5"
        />
        <text
          x={CORE.x}
          y={CORE.y + 20}
          textAnchor="middle"
          fontSize="64"
          fontWeight="300"
          fill="#ffffff"
          fontFamily="serif"
        >
          Σ
        </text>
      </svg>

      {skills.map((skill, i) => {
        const p = positions[i];
        return (
          <div
            key={skill.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 3 + (i % 4) * 0.7,
                delay: (i * 0.37) % 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              title={skill.label}
              className="glass flex size-9 items-center justify-center rounded-full font-sans text-[0.6rem] font-bold sm:size-12 sm:text-xs md:size-14 md:text-sm"
              style={{
                color: skill.color,
                boxShadow: `0 0 18px ${skill.color}33`,
              }}
            >
              {skill.short}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
