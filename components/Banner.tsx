import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Banner = () => {
  return (
    <>
      <section className="py-20 text-center">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered Document Analysis for{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Teams
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload, analyze, and collaborate on documents with your
            organization. Get instant AI insights and summaries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="px-8 rounded-md text-md">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="outline"
                className="px-8 rounded-md text-md"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
