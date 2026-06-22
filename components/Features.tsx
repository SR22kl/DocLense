import { features } from "../app/data/data";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const Features = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 ">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            ✨ Powerful Features
          </div>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Everything Your Team Needs
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Analyze documents faster, collaborate seamlessly, and unlock
            AI-powered insights across your organization.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="
                group
                relative
                overflow-hidden
                border
                rounded-lg
                bg-background/70
                backdrop-blur-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                hover:shadow-blue-500/10
              "
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <CardHeader className="relative z-10">
                {/* Icon */}
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                  <feature.icon className="h-7 w-7" />
                </div>

                <CardTitle className="text-xl">
                  {feature.title}
                </CardTitle>

                <CardDescription className="mt-2 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
