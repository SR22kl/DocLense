
import { steps } from "../app/data/data";

const Hiworks = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            🚀 Simple Workflow
          </div>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            How DocLense Works
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Start analyzing documents in minutes. No complicated setup
            required.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-border md:block" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative flex items-start gap-6"
              >
                {/* Step Number */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  {index + 1}
                </div>

                {/* Step Card */}
                <div
                  className="
                    flex-1
                    rounded-2xl
                    border
                    bg-background/70
                    p-6
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:shadow-xl
                  "
                >
                  <h3 className="mb-2 text-lg font-semibold">
                    Step {index + 1}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-muted-foreground">
            Ready to analyze your first document?
          </p>

          <button
            className="
              rounded-lg
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              px-6
              py-3
              font-medium
              text-white
              shadow-lg
              transition-transform
              hover:scale-105
            "
          >
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hiworks;

