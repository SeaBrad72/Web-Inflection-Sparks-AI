"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SparkGlyph from "./spark-glyph";

type NavChild = {
  label: string;
  href: string;
  description: string;
  /** Optional product mark shown beside the label. */
  icon?: ReactNode;
};
type NavLink = { label: string; href: string; children?: NavChild[] };

const navLinks: NavLink[] = [
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Lead", href: "/lead", description: "Fractional Leadership & AI Strategy" },
      { label: "Build", href: "/build", description: "Products, AI Engineering & Development" },
      { label: "Transform", href: "/transform", description: "Org & Team Evolution" },
    ],
  },
  {
    label: "Products",
    href: "#products",
    children: [
      {
        label: "Sparkwright",
        href: "/sparkwright",
        description: "The agentic SDLC kit",
        icon: <SparkGlyph className="h-4 w-4" gradientId="nav-spark-gradient" />,
      },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // How the currently-open menu was opened: hovering in (pointer) only
  // closes on mouseleave; opening it explicitly (click, or keyboard
  // activation of the trigger button, which fires the same click handler)
  // means mouseleave must NOT close it — only another click, Escape, or
  // focus leaving the menu should.
  const [openMethod, setOpenMethod] = useState<"pointer" | "explicit" | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // Deterministic guard (no timer): set true for a given label the instant
  // THAT dropdown is closed explicitly (click or Escape) so a pointer still
  // hovering its trigger doesn't immediately reopen it via onMouseEnter.
  // Scoped per-label (not a single shared boolean) so closing one dropdown
  // — including via Escape, which may fire with no pointer over any
  // trigger at all — can never suppress a hover-open on a DIFFERENT
  // dropdown. Cleared for a label the moment the pointer actually leaves
  // that label's own wrapper.
  const suppressReopenRef = useRef<Record<string, boolean>>({});

  function closeMenu(
    label: string,
    options?: { returnFocus?: boolean; armSuppression?: boolean }
  ) {
    setOpenMenu((current) => (current === label ? null : current));
    setOpenMethod(null);
    // Only arm the reopen guard when the close happened while a pointer was,
    // by construction, over the trigger (the click-to-close path). Escape
    // can fire with no pointer anywhere near the trigger, so arming it there
    // would silently block the very next hover of that same label until an
    // unrelated mouseleave cleared it — a confusing glitch with no
    // protective purpose, since there is nothing hovering to suppress.
    if (options?.armSuppression) {
      suppressReopenRef.current[label] = true;
    }
    if (options?.returnFocus) {
      triggerRefs.current[label]?.focus();
    }
  }

  function toggleMenu(label: string) {
    if (openMenu === label) {
      closeMenu(label, { armSuppression: true });
    } else {
      setOpenMenu(label);
      setOpenMethod("explicit");
    }
  }

  function handleTriggerMouseEnter(label: string) {
    if (suppressReopenRef.current[label]) return;
    setOpenMenu(label);
    setOpenMethod("pointer");
  }

  function handleTriggerMouseLeave(label: string) {
    suppressReopenRef.current[label] = false;
    if (openMenu === label && openMethod === "pointer") {
      setOpenMenu(null);
      setOpenMethod(null);
    }
  }

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
                  onMouseEnter={() => handleTriggerMouseEnter(link.label)}
                  onMouseLeave={() => handleTriggerMouseLeave(link.label)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape" && openMenu === link.label) {
                      e.stopPropagation();
                      closeMenu(link.label, { returnFocus: true });
                    }
                  }}
                  onBlur={(e) => {
                    // Tabbing (or otherwise moving focus) out of the trigger
                    // and the whole open panel closes the menu — covers the
                    // "focus leaving the menu" close path for
                    // explicitly-opened menus, without a general state
                    // machine.
                    if (
                      openMenu === link.label &&
                      !e.currentTarget.contains(e.relatedTarget as Node | null)
                    ) {
                      setOpenMenu(null);
                      setOpenMethod(null);
                    }
                  }}
                >
                  <button
                    ref={(el) => {
                      triggerRefs.current[link.label] = el;
                    }}
                    aria-haspopup="true"
                    aria-expanded={openMenu === link.label}
                    aria-controls={`${link.label.toLowerCase()}-dropdown`}
                    onClick={() => toggleMenu(link.label)}
                    className="flex items-center gap-1 px-4 py-2 text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <AnimatePresence>
                    {openMenu === link.label && (
                      <motion.div
                        id={`${link.label.toLowerCase()}-dropdown`}
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
                            <span className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-teal-light transition-colors">
                              {child.icon}
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
              href="https://calendly.com/inflectionsparks/30min"
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
                        <span className="flex items-center gap-2">
                          {child.icon}
                          {child.label}
                        </span>
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
                  href="https://calendly.com/inflectionsparks/30min"
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
