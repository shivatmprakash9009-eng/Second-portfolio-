"use client";

import { motion } from "framer-motion";
import { logos } from "@/lib/logos";

/**
 * Skills cluster from the mockup: two rows of real brand logos whose lines
 * converge into the glowing Σ core, with orbit rings and small logos
 * travelling around it.
 */

const W = 800;
const H = 580;
const CORE = { x: 400, y: 450 };
const CORE_R = 58;

type Item = { key: string; label: string };

const row1: Item[] = [
  { key: "figma", label: "Figma" },
  { key: "react", label: "React" },
  { key: "css", label: "CSS3" },
  { key: "nodedotjs", label: "Node.js" },
  { key: "nextdotjs", label: "Next.js" },
  { key: "javascript", label: "JavaScript" },
  { key: "html5", label: "HTML5" },
];

const row2: Item[] = [
  { key: "xd", label: "Adobe XD" },
  { key: "sass", label: "Sass" },
  { key: "git", label: "Git" },
  { key: "ai", label: "Adobe Illustrator" },
  { key: "gsap", label: "GSAP" },
  { key: "tailwindcss", label: "Tailwind CSS" },
];

const GAP = 78;
const placed = [
  ...row1.map((it, i) => ({ ...it, x: CORE.x + (i - 3) * GAP, y: 62 })),
  ...row2.map((it, i) => ({ ...it, x: CORE.x + (i - 2.5) * GAP, y: 148 })),
];

const orbits = [
  { rx: 340, ry: 112, rot: -7, items: ["typescript", "github"], dur: 26 },
  { rx: 272, ry: 90, rot: 11, items: ["framer", "vercel"], dur: 20 },
  { rx: 204, ry: 66, rot: -19, items: ["vite", "redux"], dur: 15 },
];

function ellipsePath(rx: number, ry: number) {
  return `M ${CORE.x - rx} ${CORE.y} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
}

function linePath(x: number, y: number) {
  const startY = y + 28;
  const endY = CORE.y - CORE_R + 6;
  const mid = (startY + endY) / 2;
  return `M ${x} ${startY} C ${x} ${mid}, ${CORE.x} ${mid - 40}, ${CORE.x} ${endY}`;
}

/** Real logo glyph (24×24 box) or the Adobe-style badge for XD / Illustrator. */
function Glyph({ id, size }: { id: string; size: number | string }) {
  if (id === "xd" || id === "ai") {
    const isXd = id === "xd";
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="1.5"
          y="1.5"
          width="21"
          height="21"
          rx="4.5"
          fill={isXd ? "#470137" : "#330000"}
          stroke={isXd ? "#FF61F6" : "#FF9A00"}
          strokeWidth="1.2"
        />
        <text
          x="12"
          y="15.6"
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="700"
          fontFamily="Arial, Helvetica, sans-serif"
          fill={isXd ? "#FF61F6" : "#FF9A00"}
        >
          {isXd ? "Xd" : "Ai"}
        </text>
      </svg>
    );
  }
  const logo = logos[id];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d={logo.path} fill={logo.color} />
    </svg>
  );
}

export function SkillsNetwork() {
  const all = [...row1, ...row2].map((s) => s.label).join(", ");

  return (
    <div
      className="relative mx-auto w-full max-w-4xl"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label={`Skills: ${all}`}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <radialGradient id="core-grad" cx="50%" cy="38%" r="68%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#f3c4ff" />
            <stop offset="65%" stopColor="#c58bff" />
            <stop offset="100%" stopColor="#7be8ff" />
          </radialGradient>
          <linearGradient id="line-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b0b3d" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#dc00d3" stopOpacity="0.6" />
          </linearGradient>
          <filter id="core-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>

        {/* orbit rings with small logos travelling along them */}
        {orbits.map((o, oi) => (
          <g key={oi} transform={`rotate(${o.rot} ${CORE.x} ${CORE.y})`}>
            <path
              d={ellipsePath(o.rx, o.ry)}
              fill="none"
              stroke="#6b3fd4"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            {o.items.map((key, ii) => {
              const logo = logos[key];
              return (
                <g key={key}>
                  <animateMotion
                    dur={`${o.dur}s`}
                    begin={`-${(o.dur / o.items.length) * ii}s`}
                    repeatCount="indefinite"
                    path={ellipsePath(o.rx, o.ry)}
                  />
                  <g transform={`rotate(${-o.rot})`}>
                    <circle r="13" fill="#1b0b3d" stroke="#ffffff" strokeOpacity="0.25" />
                    <path
                      d={logo.path}
                      fill={logo.color}
                      transform="translate(-7 -7) scale(0.583)"
                    />
                  </g>
                </g>
              );
            })}
          </g>
        ))}

        {/* connecting lines */}
        {placed.map((p) => (
          <path
            key={p.key}
            d={linePath(p.x, p.y)}
            fill="none"
            stroke="url(#line-grad)"
            strokeWidth="1"
            strokeDasharray="3 5"
            className="line-flow"
          />
        ))}

        {/* glowing core */}
        <circle
          cx={CORE.x}
          cy={CORE.y}
          r={CORE_R + 16}
          fill="#d86bff"
          opacity="0.6"
          filter="url(#core-glow)"
        />
        <circle cx={CORE.x} cy={CORE.y} r={CORE_R} fill="url(#core-grad)" />
        <circle
          cx={CORE.x}
          cy={CORE.y}
          r={CORE_R}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.7"
        />
        <path
          d={`M ${CORE.x - 18} ${CORE.y - 26} H ${CORE.x + 20} L ${CORE.x - 4} ${CORE.y} L ${CORE.x + 21} ${CORE.y + 27} H ${CORE.x - 20}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {placed.map((p, i) => (
        <div
          key={p.key}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 3 + (i % 5) * 0.6,
              delay: (i * 0.37) % 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            title={p.label}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#1b0b3d] shadow-[0_8px_22px_-6px_rgba(27,11,61,0.7)] sm:size-12 md:size-14"
          >
            <span className="flex size-[58%] items-center justify-center">
              <Glyph id={p.key} size="100%" />
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
