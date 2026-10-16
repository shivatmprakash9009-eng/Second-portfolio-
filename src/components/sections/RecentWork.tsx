import { ProjectCard } from "@/components/sections/ProjectCard";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { projects } from "@/lib/data";

export function RecentWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl overflow-x-clip px-6 py-24 md:px-12">
      <div className="text-center">
        <SplitHeading text="Recent Work" />
        <p className="mt-3 font-display text-base text-magenta">
          A collection of projects I&apos;ve worked on.
        </p>
      </div>

      <div className="mt-20 flex flex-col gap-24 md:gap-32">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
