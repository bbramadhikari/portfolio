import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl">
      <Hero />
      <Stats />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Certifications />
      <Education />
      <Contact />
    </div>
  );
}
