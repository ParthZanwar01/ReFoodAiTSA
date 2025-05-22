import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Lottie from "lottie-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center bg-gradient-to-br from-primary to-[#43C88C]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left side - Text content */}
            <div className="flex flex-col justify-center space-y-8">
              <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
                Forecast. Donate. Save.
              </h1>
              <div className="space-y-4 text-lg text-white/90">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <p>Predict tomorrow's food waste with AI</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <p>Optimize donation routes automatically</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <p>Track impact in real-time</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/demo"
                  className="btn btn-ghost rounded-full border-2 border-white px-8 py-3 text-white hover:bg-white/10"
                >
                  Try Demo
                </Link>
                <Link
                  href="/login"
                  className="btn rounded-full bg-white px-8 py-3 text-primary hover:bg-white/90"
                >
                  Sign In
                </Link>
              </div>
            </div>
            {/* Right side - Animation */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg">
                {/* Placeholder for Lottie animation */}
                <div className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Bar */}
      <section className="border-b border-neutral-mist bg-white py-12">
        <div className="container mx-auto px-4">
          <p className="mb-8 text-center text-sm font-medium text-neutral-steel">
            Trusted by leading organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {/* Placeholder for partner logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 w-32 rounded bg-neutral-mist"
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-neutral-cloud py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center font-display text-4xl font-bold text-accent">
            How ReFood AI Works
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Upload",
                description: "Import your historical production and sales data",
              },
              {
                title: "Predict",
                description: "AI forecasts tomorrow's surplus with 90% accuracy",
              },
              {
                title: "Optimize",
                description: "Smart routing matches surplus with local partners",
              },
              {
                title: "Track",
                description: "Real-time monitoring of pickups and impact",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="card group relative overflow-hidden bg-white transition-all hover:shadow-lg"
              >
                <div className="absolute -right-4 -top-4 text-6xl font-bold text-primary/10">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-accent">
                  {step.title}
                </h3>
                <p className="text-neutral-steel">{step.description}</p>
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 