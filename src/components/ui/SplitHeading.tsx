"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

/**
 * Section heading that reveals word by word from behind a mask when it
 * reaches 80% of the viewport. The cyan→magenta gradient runs continuously
 * across all words.
 */
export function SplitHeading({ text, className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const inner = gsap.utils.toArray<HTMLElement>("[data-word]");
      gsap.from(inner, {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <h2
        className={cn(
          "font-display text-5xl font-semibold tracking-tight md:text-6xl",
          className,
        )}
        aria-label={text}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            aria-hidden="true"
            className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom last:mr-0"
          >
            <span
              data-word
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #0cffff, #dc00d3)",
                backgroundSize: `${words.length * 100}% 100%`,
                backgroundPosition: `${
                  words.length > 1 ? (i / (words.length - 1)) * 100 : 0
                }% 0`,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
