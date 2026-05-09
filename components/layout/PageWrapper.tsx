import StarfieldBackground from "@/components/ui/StarfieldBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen">
      <StarfieldBackground />
      <div className="relative z-10">
        <Navbar />
        {children}
        <Footer />
      </div>
    </main>
  );
}