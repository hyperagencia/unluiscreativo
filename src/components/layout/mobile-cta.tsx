import Link from "next/link"

import { Button } from "@/components/ui/button"

function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/6 bg-[#0a0a0a]/90 p-3 backdrop-blur-md md:hidden">
      <Button asChild variant="accent" className="w-full">
        <Link href="/contact">Contáctame</Link>
      </Button>
    </div>
  )
}

export { MobileCta }
