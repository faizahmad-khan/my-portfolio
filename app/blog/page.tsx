import Navbar from "@/components/layout/Navbar";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Blog — Faiz Ahmad Khan" };

export default function BlogPage() {
  return (
    <main className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <Blog defaultShowAll />
        </div>
        <Footer />
      </div>
    </main>
  );
}
