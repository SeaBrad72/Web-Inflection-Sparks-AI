import type { ReactNode } from "react";

export interface SectionProps {
  id?: string;
  children: ReactNode;
}

export function Section({ id, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-border-subtle py-16 sm:py-20">
      {children}
    </section>
  );
}

export interface WrapProps {
  children: ReactNode;
}

export function Wrap({ children }: WrapProps) {
  return <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>;
}

export interface EyebrowProps {
  children: ReactNode;
}

export function Eyebrow({ children }: EyebrowProps) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal-light mb-3.5 font-medium">
      {children}
    </p>
  );
}

export interface H2Props {
  children: ReactNode;
}

export function H2({ children }: H2Props) {
  return (
    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.12] max-w-[20ch]">
      {children}
    </h2>
  );
}

export interface LeadProps {
  children: ReactNode;
}

export function Lead({ children }: LeadProps) {
  return (
    <p className="mt-5 text-[17.5px] text-muted max-w-[720px] leading-relaxed">
      {children}
    </p>
  );
}

export interface CardProps {
  title: ReactNode;
  children: ReactNode;
  accent?: boolean;
}

export function Card({ title, children, accent = false }: CardProps) {
  return (
    <div
      className={
        accent
          ? "rounded-xl border border-teal/35 bg-gradient-to-b from-teal/[0.06] to-transparent p-6"
          : "rounded-xl border border-border bg-surface p-6"
      }
    >
      <h3 className="text-lg font-semibold tracking-tight mb-2.5">{title}</h3>
      {children}
    </div>
  );
}

export interface CalloutProps {
  tone?: "green" | "orange";
  children: ReactNode;
}

export function Callout({ tone = "green", children }: CalloutProps) {
  return (
    <div
      className={
        tone === "orange"
          ? "border-l-[3px] border-orange bg-gradient-to-r from-orange/[0.07] to-transparent px-6 py-5 rounded-r-xl max-w-[720px]"
          : "border-l-[3px] border-teal bg-gradient-to-r from-teal/[0.07] to-transparent px-6 py-5 rounded-r-xl max-w-[720px]"
      }
    >
      {children}
    </div>
  );
}

export interface KbdProps {
  children: ReactNode;
}

export function Kbd({ children }: KbdProps) {
  return (
    <code className="font-mono text-[0.88em] text-foreground/85 bg-white/5 px-1.5 py-0.5 rounded border border-border-subtle">
      {children}
    </code>
  );
}
