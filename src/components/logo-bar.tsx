"use client";

import { motion } from "framer-motion";

const clients = [
  "BMW",
  "Sony",
  "Paramount",
  "Universal Music Group",
  "Whitepages",
  "Matrix Medical",
  "Technicolor",
  "Deluxe",
  "Qwest",
];

export default function LogoBar() {
  return (
    <section className="relative py-12 border-b border-border-subtle/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-[0.2em] mb-6 text-center">
            Trusted by engineering teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {clients.map((client, i) => (
              <motion.span
                key={client}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="font-mono text-sm sm:text-base text-muted-foreground/60 tracking-wide select-none"
              >
                {client}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
