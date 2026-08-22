"use client";

import { PublicFooter } from "@/components/layout/public-footer";
import { PublicHeader } from "@/components/layout/public-header";
import { LandingIntro } from "@/components/landing/landing-intro";
import type { ReactNode } from "react";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingIntro />

      <PublicHeader />

      <main className="flex-1">{children}</main>

      <PublicFooter />
    </div>
  );
}