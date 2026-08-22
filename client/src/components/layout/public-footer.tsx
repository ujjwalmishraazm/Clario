import Link from "next/link";
import { GitGraph, Sparkles } from "lucide-react";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

const accountLinks = [
  { label: "Sign in", href: "/login" },
  { label: "Get started", href: "/signup" },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Clario home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>

              <span className="font-semibold tracking-tight">
              Clario
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Turn videos into searchable knowledge with AI-powered
              transcription, summaries, insights, and conversational Q&A.
            </p>

            <a
              href="https://github.com/ujjwalmishraazm"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitGraph className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Product</h3>

            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Account</h3>

            <ul className="mt-4 space-y-3">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
  <div className="flex justify-center">
    <p className="cursor-default text-base font-medium tracking-tight text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:tracking-wide hover:text-primary">
     Ujjwal Mishra
    </p>
  </div>
</div>
      </div>
    </footer>
  );
}