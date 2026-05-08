import StarfieldBackground from "@/components/ui/StarfieldBackground";
import Navbar from "@/components/layout/Navbar";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Experience — Faiz Ahmad Khan" };

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen">
      <StarfieldBackground />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <Experience />
        </div>
        <Footer />
      </div>
    </main>
  );
}
