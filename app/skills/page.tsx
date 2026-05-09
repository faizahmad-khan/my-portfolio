import StarfieldBackground from "@/components/ui/StarfieldBackground";
import Navbar from "@/components/layout/Navbar";
import Skills from "@/components/sections/Skills";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Skills — Faiz Ahmad Khan" };

export default function SkillsPage() {
  return (
    <main className="relative min-h-screen">
      <StarfieldBackground />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <Skills />
        </div>
        <Footer />
      </div>
    </main>
  );
}
