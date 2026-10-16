import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { RecentWork } from "@/components/sections/RecentWork";
import { ParallaxBackground } from "@/components/ui/ParallaxBackground";

export default function Home() {
  return (
    <>
      <ParallaxBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <RecentWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
