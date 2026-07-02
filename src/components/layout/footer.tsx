function Footer() {
  return (
    <footer data-header-theme="dark" className="border-t border-white/6 bg-[#0a0a0a]">
      <div className="mx-auto w-full max-w-[1920px] px-6 py-8 lg:px-10">
        <div className="flex flex-col items-center gap-3">
          <nav aria-label="Redes sociales" className="flex gap-6">
            <a
              href="https://linkedin.com/in/unluiscreativo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Luis García"
              className="text-sm text-white/50 transition-colors duration-150 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/unluiscreativo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Luis García"
              className="text-sm text-white/50 transition-colors duration-150 hover:text-white"
            >
              Instagram
            </a>
          </nav>
          <span className="text-xs text-white/30">© {new Date().getFullYear()} Luis García</span>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
