import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">

      <div className="container-narrow h-20 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" class="font-display text-4xl font-medium tracking-[0.15em] uppercase">
  Irani
</a>
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">

          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#reservation"
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm text-white transition hover:bg-neutral-700"
          >
            Reserve
          </a>

        </nav>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">

          <nav className="container-narrow py-5 flex flex-col gap-5">

            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-neutral-700"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#reservation"
              onClick={() => setOpen(false)}
              className="rounded-full bg-neutral-900 px-5 py-3 text-center text-sm text-white"
            >
              Reserve a Table
            </a>

          </nav>

        </div>
      )}

    </header>
  );
}