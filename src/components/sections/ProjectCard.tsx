"use client";

import { useRef } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { GithubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data";

type Props = { project: Project; index: number };

export function ProjectCard({ project, index }: Props) {
  const root = useRef<HTMLElement>(null);
  const imageLeft = index % 2 === 0;

  // Even cards glide in from the left, odd cards from the right, scrubbed to scroll.
  useGSAP(
    () => {
      gsap.fromTo(
        root.current,
        { x: imageLeft ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 92%",
            end: "top 55%",
            scrub: 1,
          },
        },
      );
    },
    { scope: root, dependencies: [imageLeft] },
  );

  return (
    <article
      ref={root}
      className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-0"
    >
      <div
        className={cn(
          "glass relative aspect-[16/10] w-full overflow-hidden rounded-2xl lg:row-start-1",
          imageLeft
            ? "lg:col-span-7 lg:col-start-1"
            : "lg:col-span-7 lg:col-start-6",
        )}
      >
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 40rem, 100vw"
          className={cn(
            "object-cover",
            project.tint && "hue-rotate-[190deg] saturate-150",
          )}
        />
        {project.tint && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-neon/40 via-indigo/30 to-ink/60 mix-blend-color"
          />
        )}
      </div>

      <div
        className={cn(
          "relative z-10 lg:row-start-1 lg:mb-8",
          imageLeft
            ? "lg:col-span-6 lg:col-start-7"
            : "lg:col-span-6 lg:col-start-1",
        )}
      >
        <p className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-neon">
          Featured Project
        </p>
        <h3 className="mb-4 mt-1 font-display text-3xl font-semibold text-white md:text-4xl">
          {project.title}
        </h3>

        <div className="glass rounded-xl p-6 shadow-[0_20px_60px_-20px_rgba(127,0,255,0.45)]">
          <p className="font-display text-sm leading-7 text-muted">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="glass rounded-full px-3 py-1 font-sans text-[0.7rem] font-medium text-white/90"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-4 text-muted">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="transition-colors hover:text-white"
            >
              <GithubIcon />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live preview`}
              className="transition-colors hover:text-white"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
