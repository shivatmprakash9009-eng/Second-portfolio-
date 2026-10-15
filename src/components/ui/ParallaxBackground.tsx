"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const blobs = [
  { className: "left-[-10%] top-[5%] size-[42rem] bg-indigo/40", depth: 1 },
  { className: "right-[-12%] top-[30%] size-[38rem] bg-magenta/30", depth: 1.6 },
  { className: "left-[20%] bottom-[-15%] size-[36rem] bg-neon/20", depth: 0.7 },
];

export function ParallaxBackground() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const scrollLayers = gsap.utils.toArray<HTMLElement>("[data-scroll]");
      const mouseLayers = gsap.utils.toArray<HTMLElement>("[data-blob]");

      // parallelY: slow vertical drift tied to page scroll
      scrollLayers.forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 1);
        gsap.to(layer, {
          y: -160 * depth,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      });

      // parallelX / parallelY: differential offsets from cursor position
      const movers = mouseLayers.map((layer) => ({
        depth: Number(layer.dataset.depth ?? 1),
        x: gsap.quickTo(layer, "xPercent", { duration: 1.2, ease: "power3.out" }),
        y: gsap.quickTo(layer, "yPercent", { duration: 1.2, ease: "power3.out" }),
      }));

      const onMove = (e: MouseEvent) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        movers.forEach((m) => {
          m.x(mouseX * 20 * m.depth);
          m.y(mouseY * 20 * m.depth);
        });
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {blobs.map((b, i) => (
        <div key={i} data-scroll data-depth={b.depth} className="absolute inset-0">
          <div
            data-blob
            data-depth={b.depth}
            className={`absolute rounded-full blur-[120px] ${b.className}`}
          />
        </div>
      ))}
    </div>
  );
}
