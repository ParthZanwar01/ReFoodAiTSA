"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Fork } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function TrainStep() {
  const router = useRouter();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (progress >= 100) {
      setIsComplete(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });

      // Add mock training logs
      setLogs((prev) => [
        ...prev,
        `[INFO] Iteration ${Math.floor(progress / 5)}: Loss = ${(
          Math.random() * 0.1
        ).toFixed(4)}`,
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, [progress]);

  const handleContinue = () => {
    router.push("/forecast");
  };

  return (
    <div className="min-h-screen bg-neutral-cloud">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        {/* Stepper */}
        <div className="mb-12 flex items-center justify-center space-x-4">
          {["Upload", "Validate", "Train"].map((step, i) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  i <= 2
                    ? "bg-primary text-white"
                    : "border-2 border-neutral-mist text-neutral-steel"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  i <= 2 ? "text-accent" : "text-neutral-steel"
                }`}
              >
                {step}
              </span>
              {i < 2 && (
                <div className="mx-4 h-0.5 w-12 bg-neutral-mist" />
              )}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="card bg-white">
          <h1 className="mb-6 font-display text-2xl font-semibold text-accent">
            Training Your Model
          </h1>

          {/* Progress gauge */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative h-48 w-48">
              <svg
                className="h-full w-full -rotate-90 transform"
                viewBox="0 0 100 100"
              >
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3DBA6F"
                  strokeWidth="8"
                  strokeDasharray={`${progress * 2.83} 283`}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                {isComplete ? (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                ) : (
                  <Fork className="h-12 w-12 animate-spin text-primary" />
                )}
              </div>
            </div>
            <p className="mt-4 text-lg font-medium text-accent">
              {isComplete ? "Training Complete!" : `${Math.round(progress)}%`}
            </p>
          </div>

          {/* Training log */}
          <div className="mb-8 rounded-lg border border-neutral-mist bg-neutral-cloud p-4">
            <h3 className="mb-2 font-medium text-accent">Training Log</h3>
            <div className="h-32 overflow-y-auto font-mono text-sm">
              {logs.map((log, i) => (
                <div key={i} className="text-neutral-steel">
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={!isComplete}
            className="btn btn-primary w-full"
          >
            Go to Forecast Studio
          </button>
        </div>
      </div>
    </div>
  );
} 