import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StartVibes — Dari ide ke SaaS yang siap dibangun",
  description: "Rancang alur SaaS dengan discovery, dokumen, dan handoff yang rapi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
