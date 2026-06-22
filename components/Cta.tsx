import Link from "next/link";
import { Button } from "./ui/button";

const Cta = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-blue-950 to-slate-950" />

        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl px-4">
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-12
            text-center
            backdrop-blur-sm
          "
        >
          {/* Decorative Glow */}
          <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            🚀 Start Today
          </div>

          {/* Heading */}
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            Ready to Transform Your
            <span className="block bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Document Workflow?
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Upload documents, generate AI-powered insights, and collaborate with
            your team—all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="
                  h-12
                  px-8
                  rounded-full
                  text-base
                  shadow-lg
                "
              >
                Start Free Trial
              </Button>
            </Link>

            <Link href="/sign-in">
              <Button
                size="lg"
                variant="outline"
                className="
                  h-12
                  px-8
                  rounded-full
                  text-base
                  border-white/20
                  bg-transparent
                  text-white
                  hover:bg-white/10
                "
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Trust Text */}
          <p className="mt-6 text-sm text-slate-400">
            No credit card required • Free plan available • Setup in under 2
            minutes
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div>
              <h3 className="text-3xl font-bold text-white">AI</h3>
              <p className="text-sm text-slate-400">Powered Analysis</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">Teams</h3>
              <p className="text-sm text-slate-400">Built for Collaboration</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">Fast</h3>
              <p className="text-sm text-slate-400">Instant Insights</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
