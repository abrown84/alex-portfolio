"use client";

import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Spotlight } from "@/components/effects/Spotlight";
import { KonamiCode } from "@/components/easter-eggs/KonamiCode";

export default function Home() {
  return (
    <>
      {/* Effects */}
      <CustomCursor />
      <ScrollProgress />
      <Spotlight className="fixed inset-0 z-[5]" size={600} />
      <KonamiCode />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
