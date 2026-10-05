import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ChartLineUp } from "@phosphor-icons/react/dist/ssr"

type Section = {
  id: string
  heading: string
  content: React.ReactNode
}

export function LegalLayout({
  eyebrow,
  title,
  lastUpdated,
  sections,
}: {
  eyebrow: string
  title: string
  lastUpdated: string
  sections: Section[]
}) {
  return (
    <main className="bg-dot-grid min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Back link + brand */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Subwatch
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
              <ChartLineUp className="size-3.5" weight="bold" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              Subwatch
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            {eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-semibold text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
          {/* Table of contents */}
          <nav className="hidden lg:block">
            <div className="sticky top-16 rounded-xl border border-border/60 bg-panel p-4">
              <p className="mb-3 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                On this page
              </p>
              <ul className="flex flex-col gap-2">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {i + 1}. {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Content */}
          <div className="rounded-xl border border-border/60 bg-panel p-6 md:p-10">
            <div className="flex flex-col gap-10">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-20">
                  <h2 className="text-base font-semibold text-foreground">
                    <span className="mr-2 text-muted-foreground">{i + 1}.</span>
                    {s.heading}
                  </h2>
                  <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                    {s.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* Contact footer */}
        <div className="mt-8 rounded-xl border border-border/60 bg-panel p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Questions about this policy? Reach us at{" "}
            <a
              href="mailto:support@subwatch.app"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              support@subwatch.app
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
