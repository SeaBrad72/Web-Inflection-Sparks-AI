"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Lead", href: "/lead", description: "Fractional Leadership & AI Strategy" },
      { label: "Build", href: "/build", description: "Products, AI Engineering & Development" },
      { label: "Transform", href: "/transform", description: "Org & Team Evolution" },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos/banner-light.png"
              alt="InflectionSparks.ai"
              width={330}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    aria-controls="services-dropdown"
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setServicesOpen(false);
                    }}
                    className="flex items-center gap-1 px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        id="services-dropdown"
                        role="menu"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-72 rounded-xl border border-border bg-surface-elevated p-2 shadow-2xl"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            role="menuitem"
                            className="block rounded-lg px-4 py-3 hover:bg-background transition-colors group"
                          >
                            <span className="text-sm font-medium text-foreground group-hover:text-teal-light transition-colors">
                              {child.label}
                            </span>
                            <span className="block text-xs text-muted-foreground mt-0.5">
                              {child.description}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <a
              href="https://calendly.com/inflectionsparksolutions/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-teal text-white text-sm font-medium hover:bg-teal-light transition-colors"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border-subtle bg-background overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="space-y-1">
                    <span className="block px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {link.label}
                    </span>
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-muted hover:text-foreground transition-colors"
                      >
                        {child.label}
                        <span className="block text-xs text-muted-foreground">{child.description}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 border-t border-border-subtle">
                <a
                  href="https://calendly.com/inflectionsparksolutions/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2.5 rounded-lg bg-teal text-white text-sm font-medium"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
