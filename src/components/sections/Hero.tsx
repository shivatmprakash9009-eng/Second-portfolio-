"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { images, profile } from "@/lib/data";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  // Cursor position, normalised to -1..1, drives the ring/image offset.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const ringX = useTransform(smx, [-1, 1], [-18, 18]);
  const ringY = useTransform(smy, [-1, 1], [-18, 18]);
  const imgX = useTransform(smx, [-1, 1], [8, -8]);
  const imgY = useTransform(smy, [-1, 1], [8, -8]);

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
        .from("[data-hero-art]", { scale: 0.92, opacity: 0, duration: 1.1 }, 0.2);
    },
    { scope: root },
  );

  return (
    <section
      id="home"
      ref={root}
      onMouseMove={onMove}
      className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-32 md:px-12 lg:grid-cols-2"
    >
      <div>
        <h1
          data-hero-in
          className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl"
        >
          Hi, I&apos;m {profile.name}
        </h1>
        <p
          data-hero-in
          className="text-gradient mt-3 font-display text-3xl font-semibold md:text-4xl"
        >
          {profile.role}
        </p>
        <p
          data-hero-in
          className="mt-6 max-w-xl font-display text-base leading-8 text-muted"
        >
          {profile.heroParagraph}
        </p>
        <div data-hero-in className="mt-8">
          <MagneticButton href="#contact">Contact</MagneticButton>
        </div>
      </div>

      <div data-hero-art className="relative mx-auto w-full max-w-md">
        <div className="relative aspect-square">
          {/* animated magenta / cyan aura */}
          <div
            aria-hidden="true"
            className="absolute inset-[-8%] animate-pulse-glow rounded-full bg-gradient-to-br from-electric/70 via-indigo/50 to-neon/60 blur-3xl"
          />

          {/* rotating ring that shifts with the cursor */}
          <motion.div
            aria-hidden="true"
            style={{ x: ringX, y: ringY }}
            className="absolute inset-[-5%]"
          >
            <div
              className="size-full animate-spin-slow rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #0cffff, #7f00ff, #dc00d3, #0cffff)",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
              }}
            />
          </motion.div>

          <motion.div
            style={{ x: imgX, y: imgY }}
            className="absolute inset-0 overflow-hidden rounded-[42%_58%_55%_45%/45%_40%_60%_55%] ring-1 ring-white/20"
          >
            <Image
              src={images.hero}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-electric/10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
