import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";
import { profile, socials } from "@/lib/data";

const icons = {
  GitHub: GithubIcon,
  "Twitter / X": XIcon,
  LinkedIn: LinkedinIcon,
} as const;

export function Footer() {
  return (
    <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-8 md:px-12">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 sm:flex-row">
        <p className="font-sans text-xs text-body">
          © 2026 {profile.name}. All rights reserved.
        </p>
        <ul className="flex items-center gap-4">
          {socials.map((s) => {
            const Icon = icons[s.label];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-body/70 transition-colors hover:text-magenta"
                >
                  <Icon width={18} height={18} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
