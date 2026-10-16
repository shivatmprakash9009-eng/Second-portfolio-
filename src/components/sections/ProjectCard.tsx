"use client";

import { useRef } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";
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

  const iconClass = "text-body/50 transition-colors hover:text-magenta";

  return (
    <article ref={root} className="relative grid grid-cols-1 lg:grid-cols-12">
      {/* image inside a dark purple frame */}
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden rounded-xl bg-card p-2 shadow-[0_30px_70px_-30px_rgba(27,11,61,0.7)] lg:row-start-1 lg:col-span-7",
          imageLeft ? "lg:col-start-1" : "lg:col-start-6",
        )}
      >
        <div className="relative size-full overflow-hidden rounded-lg">
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
              className="absolute inset-0 bg-gradient-to-br from-cyan/40 via-[#8f4bf0]/30 to-ink/60 mix-blend-color"
            />
          )}
        </div>
      </div>

      {/* title + dark text card, overlapping the image edge */}
      <div
        className={cn(
          "relative z-10 mt-5 lg:row-start-1 lg:mt-0 lg:flex lg:flex-col lg:justify-end lg:pb-8",
          imageLeft
            ? "lg:col-span-6 lg:col-start-7 lg:-ml-14"
            : "lg:col-span-6 lg:col-start-1 lg:-mr-14 lg:items-end lg:text-right",
        )}
      >
        <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-magenta">
          Featured Project
        </p>
        <h3 className="mb-4 mt-1 font-display text-3xl font-semibold tracking-[-0.01em] text-heading md:text-[2.5rem]">
          {project.title}
        </h3>

        <div
          className="max-w-lg rounded-xl p-6 text-left shadow-[0_24px_60px_-20px_rgba(27,11,61,0.8)] ring-1 ring-white/10"
          style={{ background: "linear-gradient(135deg, #1b0b3d 0%, #2a1160 100%)" }}
        >
          <p className="font-display text-[0.8rem] leading-[1.85] text-white/85">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-white/10 px-3 py-1 font-sans text-[0.68rem] font-medium text-white/90 ring-1 ring-white/10"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className={iconClass}
          >
            <GithubIcon width={18} height={18} />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live preview`}
            className={iconClass}
          >
            <ExternalLink size={18} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className={iconClass}
          >
            <XIcon width={17} height={17} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className={iconClass}
          >
            <LinkedinIcon width={17} height={17} />
          </a>
        </div>
      </div>
    </article>
  );
}
