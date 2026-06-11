import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Cta = () => {
  return (
    <>
      <section className="py-20 bg-linear-to-r from-blue-50 to-violet-50">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to analyze your documents?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of teams using DocuAI to work smarter with their
            documents.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="px-8 rounded-md text-md">
              Get Started Free
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>
    </>
  );
};

export default Cta;
