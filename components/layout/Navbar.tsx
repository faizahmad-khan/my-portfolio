"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X as CloseIcon, ExternalLink } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "HOME", href: "/", sectionId: null },
    { label: "PROJECTS", href: "/projects", sectionId: "projects" },
    { label: "SKILLS", href: "/skills", sectionId: "skills" },
    { label: "ABOUT", href: "/about", sectionId: "about" },
    { label: "EXPERIENCE", href: "/experience", sectionId: "experience" },
    { label: "BLOG", href: "/blog", sectionId: "blog" },
    { label: "CONTACT", href: "/contact", sectionId: "contact" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center">
      <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 max-w-3xl w-full mx-4">

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isHome = pathname === "/";

            const handleClick = (e: React.MouseEvent) => {
              // On homepage, smooth scroll to section instead of navigating
              if (isHome && link.sectionId) {
                e.preventDefault();
                document.getElementById(link.sectionId)
                  ?.scrollIntoView({ behavior: "smooth" });
                return;
              }
              // On homepage, HOME link scrolls to top
              if (isHome && !link.sectionId) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
              }
            };

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={handleClick}
                className={
                  isActive
                    ? "text-cyan-400 text-xs uppercase tracking-wider font-medium"
                    : "text-gray-400 text-xs uppercase tracking-wider hover:text-white transition-colors"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Resume Button */}
        <a
          href="/resume.pdf"
          className="hidden md:flex items-center gap-2 border border-cyan-400/50 text-cyan-400 text-xs px-4 py-1.5 rounded-full hover:bg-cyan-400/10 transition-all whitespace-nowrap"
        >
          Resume <ExternalLink size={12} />
        </a>

        <div className="md:hidden ml-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full mt-2 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHome = pathname === "/";

              const handleClick = (e: React.MouseEvent) => {
                // On homepage, smooth scroll to section instead of navigating
                if (isHome && link.sectionId) {
                  e.preventDefault();
                  document.getElementById(link.sectionId)
                    ?.scrollIntoView({ behavior: "smooth" });
                  return;
                }
                // On homepage, HOME link scrolls to top
                if (isHome && !link.sectionId) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  return;
                }
              };

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={handleClick}
                  className={
                    isActive
                      ? "text-cyan-400 text-xs uppercase tracking-wider font-medium"
                      : "text-gray-400 text-xs uppercase tracking-wider hover:text-white transition-colors"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="border-t border-white/10 pt-3 mt-3">
              <a
                href="/resume.pdf"
                className="flex items-center gap-2 text-cyan-400 text-xs"
              >
                Resume <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
