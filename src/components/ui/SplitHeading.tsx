"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

/**
 * Section heading (Josefin Sans semi-bold, cyan → purple gradient) that reveals
 * word by word from behind a mask at 80% of the viewport.
 */
export function SplitHeading({ text, className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      gsap.from(gsap.utils.toArray<HTMLElement>("[data-word]"), {
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
        aria-label={text}
        className={cn(
          "font-display text-5xl font-semibold tracking-[-0.02em] md:text-[4.125rem] md:leading-[1.1]",
          className,
        )}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            aria-hidden="true"
            className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom last:mr-0"
          >
            <span
              data-word
              className="text-gradient inline-block"
              style={{
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
