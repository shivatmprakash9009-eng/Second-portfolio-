"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { images, profile } from "@/lib/data";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  // Cursor position normalised to -1..1 drives the ring / subject offsets.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const ringX = useTransform(smx, [-1, 1], [-16, 16]);
  const ringY = useTransform(smy, [-1, 1], [-16, 16]);
  const imgX = useTransform(smx, [-1, 1], [8, -8]);
  const imgY = useTransform(smy, [-1, 1], [6, -6]);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
        .from("[data-hero-in]", { y: 40, opacity: 0, stagger: 0.12 })
        .from("[data-hero-art]", { scale: 0.93, opacity: 0, duration: 1.1 }, 0.2);
    },
    { scope: root },
  );

  return (
    <section id="home" className="px-3 pt-3 md:px-4">
      <div
        ref={root}
        onMouseMove={onMove}
        className="relative isolate overflow-hidden rounded-[1.75rem]"
        style={{
          background: [
            "radial-gradient(60% 70% at 78% 28%, rgba(206, 76, 255, 0.95) 0%, rgba(126, 52, 220, 0.75) 38%, rgba(44, 14, 96, 0) 75%)",
            "radial-gradient(45% 55% at 12% 0%, rgba(120, 60, 210, 0.55) 0%, rgba(120, 60, 210, 0) 70%)",
            "linear-gradient(180deg, #4a1c8e 0%, #2b0f5c 55%, #12062b 100%)",
          ].join(", "),
        }}
      >
        <div className="mx-auto grid min-h-[44rem] max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-14 pt-32 md:px-14 lg:min-h-[48rem] lg:grid-cols-2">
          <div className="relative z-10">
            <h1
              data-hero-in
              className="font-display text-5xl font-bold leading-[1.02] tracking-[-0.005em] text-white md:text-7xl xl:text-[5.625rem]"
            >
              Hi, I&apos;m {profile.name}
            </h1>
            <p
              data-hero-in
              className="text-gradient mt-4 font-display text-3xl font-semibold md:text-[2.6rem]"
            >
              {profile.role}
            </p>
            <p
              data-hero-in
              className="mt-6 max-w-md font-display text-[0.95rem] leading-[1.85] text-white/80"
            >
              {profile.heroParagraph}
            </p>
            <div data-hero-in className="mt-8">
              <MagneticButton href="#contact">Contact</MagneticButton>
            </div>
          </div>

          <div data-hero-art className="relative mx-auto w-full max-w-lg lg:max-w-xl">
            <div className="relative aspect-[4/4.6]">
              {/* animated magenta / cyan aura */}
              <div
                aria-hidden="true"
                className="absolute inset-[4%] animate-pulse-glow rounded-full bg-gradient-to-br from-magenta/70 via-[#8f4bf0]/50 to-cyan/50 blur-3xl"
              />

              {/* slowly rotating ring that shifts with the cursor */}
              <motion.div
                aria-hidden="true"
                style={{ x: ringX, y: ringY }}
                className="absolute inset-[2%]"
              >
                <div
                  className="size-full animate-spin-slow rounded-full opacity-80"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #0cffff, #8f4bf0, #dc00d3, #0cffff)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                  }}
                />
              </motion.div>

              {/* subject: bottom-anchored, fades into the dark stage like the mockup */}
              <motion.div
                style={{ x: imgX, y: imgY }}
                className="absolute inset-x-[6%] bottom-0 top-[4%] overflow-hidden rounded-[46%_54%_8%_8%/38%_38%_8%_8%] ring-1 ring-white/25"
              >
                <Image
                  src={images.hero}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 32rem, 90vw"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#12062b] via-transparent to-magenta/10"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
