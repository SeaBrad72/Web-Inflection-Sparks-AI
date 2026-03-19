import { notFound } from "next/navigation";

export const metadata = {
  title: "Sanity Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  if (process.env.ENABLE_STUDIO !== "true") notFound();
  return <>{children}</>;
}
