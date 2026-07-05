import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative">
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Experience />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}