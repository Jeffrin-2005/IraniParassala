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
        <a
          href="#home"
          className="font-display text-4xl font-medium tracking-[0.15em] uppercase"
        >
          Irani
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">

          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-950"
            >
              {link.name}
            </a>
          ))}

          {/* Reserve */}
          <a
            href="/reserve"
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          >
            Reserve
          </a>

        </nav>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-neutral-200 bg-white md:hidden">

          <nav className="container-narrow flex flex-col gap-5 py-5">

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

            {/* Mobile Reserve */}
            <a
              href="/reserve"
              onClick={() => setOpen(false)}
              className="rounded-full bg-neutral-900 px-5 py-3 text-center text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
            >
              Reserve a Table
            </a>

          </nav>

        </div>
      )}

    </header>
  );
}