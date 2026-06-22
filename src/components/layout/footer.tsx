import Link from "next/link"

function Footer() {
  return (
    <footer data-header-theme="dark" className="border-t border-white/6">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row lg:px-10">
        <span>© {new Date().getFullYear()} Luis García</span>
        <div className="flex gap-6">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
