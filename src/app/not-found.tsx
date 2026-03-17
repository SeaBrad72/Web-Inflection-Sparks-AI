import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold font-mono text-gradient-teal mb-4">404</p>
        <h1 className="text-2xl font-bold mb-3">Page not found</h1>
        <p className="text-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-lg bg-teal text-white text-sm font-medium hover:bg-teal-light transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-lg border border-border text-sm text-muted hover:text-foreground hover:border-muted-foreground transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
