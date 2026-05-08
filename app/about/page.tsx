import StarfieldBackground from "@/components/ui/StarfieldBackground";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "About — Faiz Ahmad Khan" };

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <StarfieldBackground />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <About />
        </div>
        <Footer />
      </div>
    </main>
  );
}
