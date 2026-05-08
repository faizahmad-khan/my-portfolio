import StarfieldBackground from "@/components/ui/StarfieldBackground";
import Navbar from "@/components/layout/Navbar";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Projects — Faiz Ahmad Khan" };

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen">
      <StarfieldBackground />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <Projects />
        </div>
        <Footer />
      </div>
    </main>
  );
}
