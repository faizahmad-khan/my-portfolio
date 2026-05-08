import StarfieldBackground from "@/components/ui/StarfieldBackground";
import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Contact — Faiz Ahmad Khan" };

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <StarfieldBackground />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <Contact />
        </div>
        <Footer />
      </div>
    </main>
  );
}
