import { Phone, MapPin } from "lucide-react";
import InstagramGlyph from "./InstagramGlyph";
import { site, navLinks } from "../lib/site";
import Sunburst from "./Sunburst";

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-charcoal pt-20 pb-10 text-cream/70">
      <Sunburst className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 opacity-[0.05]" stroke="#B9924F" />
      <div className="container-narrow grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl text-cream">
            Irani <span className="text-gold">Restaurant</span>
          </p>
          <p className="mt-3 max-w-xs text-sm">Parassala, Kerala</p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-colors"
          >
            <InstagramGlyph size={17} />
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest2 text-cream/40 mb-5">Quick Links</p>
          <ul className="space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="hover:text-gold transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest2 text-cream/40 mb-5">Contact</p>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-2">
              <Phone size={15} className="mt-0.5 shrink-0 text-gold" />
              <a href={site.phoneTel} className="hover:text-gold transition-colors">{site.phoneDisplay}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
              <span>{site.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-narrow mt-16 border-t border-cream/10 pt-6 text-xs text-cream/40">
        © {year} Irani Restaurant. All rights reserved.
      </div>
    </footer>
  );
}
