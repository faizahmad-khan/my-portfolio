export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/5 py-8 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left */}
        <p className="text-xs font-mono text-gray-600">
          • © 2026 FAIZ AHMAD KHAN
        </p>

        {/* Right */}
        <div className="flex gap-3">
          <button className="border border-white/10 text-gray-600 text-xs px-4 py-1.5 rounded-full hover:border-white/20 hover:text-gray-400 transition-all">
            Visitors
          </button>
          <button className="border border-white/10 text-gray-600 text-xs px-4 py-1.5 rounded-full hover:border-white/20 hover:text-gray-400 transition-all">
            Gallery
          </button>
          <button className="border border-white/10 text-gray-600 text-xs px-4 py-1.5 rounded-full hover:border-white/20 hover:text-gray-400 transition-all">
            Monitor
          </button>
        </div>
      </div>
    </footer>
  );
}
