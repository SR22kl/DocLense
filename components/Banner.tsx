import Link from "next/link";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

const Banner = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-blue-600" />
            Powered by Gemini AI
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Transform Documents Into
            <span className="block bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Actionable Insights
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Upload PDFs, contracts, reports, and research papers. Get AI-powered
            summaries, key insights, and collaborative analysis for your entire
            organization in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="h-12 rounded-md px-8 text-base shadow-lg"
              >
                Start Free Trial
              </Button>
            </Link>

            <Link href="/sign-in">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-md px-8 text-base"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Trust Text */}
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required • Free plan available
          </p>

          {/* Dashboard Preview */}
          <div className="mt-16">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-background shadow-2xl">
              <div className="border-b bg-muted/50 px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
              </div>

              <div className="grid grid-cols-12 min-h-112.5">
                {/* Sidebar */}
                <div className="col-span-3 border-r bg-muted/30 p-4">
                  <div className="mb-4 h-8 w-full rounded bg-muted" />
                  <div className="mb-2 h-4 w-3/4 rounded bg-muted" />
                  <div className="mb-2 h-4 w-full rounded bg-muted" />
                  <div className="mb-2 h-4 w-2/3 rounded bg-muted" />
                </div>

                {/* Main Content */}
                <div className="col-span-9 p-6">
                  <div className="mb-6 h-8 w-1/2 rounded bg-muted" />

                  <div className="mb-4 rounded-xl border p-4">
                    <div className="mb-3 h-4 w-1/3 rounded bg-muted" />
                    <div className="mb-2 h-3 w-full rounded bg-muted" />
                    <div className="mb-2 h-3 w-5/6 rounded bg-muted" />
                    <div className="h-3 w-4/6 rounded bg-muted" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border p-4">
                      <div className="mb-3 h-4 w-1/2 rounded bg-muted" />
                      <div className="h-24 rounded bg-muted" />
                    </div>

                    <div className="rounded-xl border p-4">
                      <div className="mb-3 h-4 w-1/2 rounded bg-muted" />
                      <div className="h-24 rounded bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            <div>
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-muted-foreground">Documents Analyzed</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">95%</h3>
              <p className="text-muted-foreground">Time Saved</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-muted-foreground">Teams Using DocLense</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
