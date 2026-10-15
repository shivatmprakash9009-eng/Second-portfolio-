import { SplitHeading } from "@/components/ui/SplitHeading";
import { SkillsNetwork } from "@/components/sections/SkillsNetwork";
import { profile } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24 md:px-12">
      <div className="text-center">
        <SplitHeading text="About" />
        <div className="mx-auto mt-8 max-w-3xl space-y-4 font-display text-base leading-8 text-muted">
          {profile.aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <SkillsNetwork />
      </div>
    </section>
  );
}
