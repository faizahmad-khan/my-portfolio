"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X as CloseIcon, ExternalLink } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleNavLinkClick = (e: React.MouseEvent, link: (typeof navLinks)[number]) => {
    const isHome = pathname === "/";

    if (isHome && link.sectionId) {
      e.preventDefault();
      document.getElementById(link.sectionId)?.scrollIntoView({ behavior: "smooth" });
    }

    if (isHome && !link.sectionId) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center" style={{ zIndex: 100 }}>
      <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 flex items-center justify-between md:justify-start gap-4 md:gap-8 max-w-3xl w-full mx-3 md:mx-4">

        <Link
          href="/"
          onClick={(e) => handleNavLinkClick(e, navLinks[0])}
          className="md:hidden flex items-center gap-2 text-white text-sm font-semibold tracking-[0.25em]"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/40 text-cyan-400 text-[10px] tracking-[0.2em]">
            FK
          </span>
          <span>FAIZ</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link)}
                className={
                  isActive
                    ? "text-cyan-400 text-[10px] lg:text-xs uppercase tracking-wider font-medium"
                    : "text-gray-400 text-[10px] lg:text-xs uppercase tracking-wider hover:text-white transition-colors"
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

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link)}
                  className={
                    isActive
                      ? "py-3 px-4 text-sm text-cyan-400 border-b border-white/5 uppercase tracking-wider font-medium last:border-b-0"
                      : "py-3 px-4 text-sm text-gray-300 border-b border-white/5 uppercase tracking-wider hover:text-white transition-colors last:border-b-0"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3">
              <a
                href="/resume.pdf"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full text-center py-3 px-4 rounded-xl border border-cyan-400/50 text-cyan-400 text-sm hover:bg-cyan-400/10 transition-all"
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
