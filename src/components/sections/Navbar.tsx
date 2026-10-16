"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X as CloseIcon } from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

const left = navLinks.slice(0, 2);
const right = navLinks.slice(2);

export function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Highlight the section sitting in the middle of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const renderLink = (link: (typeof navLinks)[number]) => {
    const isActive = active === link.id;
    return (
      <li key={link.id} className="relative">
        <a
          href={link.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "px-1 py-1 font-sans text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors",
            isActive ? "text-white" : "text-white/70 hover:text-white",
          )}
        >
          {link.label}
        </a>
        {isActive && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-cyan to-magenta"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </li>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-3 transition-colors duration-300 md:mx-4",
          scrolled ? "rounded-b-2xl bg-ink/80 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-5xl items-start justify-between px-5 md:grid md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch md:px-0"
        >
          <a
            href="#home"
            className="py-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white md:hidden"
          >
            Home
          </a>

          <ul className="hidden items-center justify-end gap-14 pr-10 pt-3.5 md:flex">
            {left.map(renderLink)}
          </ul>

          {/* the dark trapezoid "notch" from the mockup */}
          <div
            aria-hidden="true"
            className="hidden h-9 w-44 bg-[#1b0b3d] md:block"
            style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 12% 100%)" }}
          />

          <ul className="hidden items-center justify-start gap-14 pl-10 pt-3.5 md:flex">
            {right.map(renderLink)}
          </ul>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="py-3.5 text-white md:hidden"
          >
            {open ? <CloseIcon size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col gap-1 rounded-b-2xl bg-ink/95 p-3 backdrop-blur-md md:hidden"
            >
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 font-sans text-xs font-medium uppercase tracking-[0.12em]",
                      active === link.id ? "bg-white/10 text-white" : "text-white/70",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
