import Banner from "@/components/Banner";
import Cta from "@/components/Cta";
import Features from "@/components/Features";
import { features, steps } from "../data/data";
import { CheckCircle } from "lucide-react";
import Hiworks from "@/components/Hiworks";

export default function Home() {
  return (
    <>
      {/* Banner */}
      <Banner />

      {/* Features */}
      <Features />

      {/* How it works */}
      <Hiworks />

      {/* CTA */}
      <Cta />
    </>
  );
}
