import { features } from "../app/data/data";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const Features = () => {
  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-sm rounded-md hover:-translate-y-1.5 duration-300 ease-in-out"
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg mb-4">
                    <div className="text-blue-600">
                      {<feature.icon className="w-8 h-8" />}
                    </div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
