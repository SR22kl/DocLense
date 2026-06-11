import { steps } from "../app/data/data";
import { CheckCircle } from "lucide-react";
const Hiworks = () => {
  return (
    <>
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-4 max-w-md mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white border rounded-lg"
              >
                <div className="shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hiworks;
