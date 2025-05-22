"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for demonstration
const mockData = {
  anomalies: [
    {
      id: 1,
      type: "zero_sales",
      date: "2024-03-15",
      item: "Chicken Sandwich",
      message: "0 sold on 2024-03-15 (School Holiday)",
    },
    {
      id: 2,
      type: "high_waste",
      date: "2024-03-14",
      item: "Caesar Salad",
      message: "75% waste on 2024-03-14 (Unusual spike)",
    },
  ],
  heatmap: Array.from({ length: 7 }, (_, i) => ({
    date: `2024-03-${10 + i}`,
    items: Array.from({ length: 5 }, (_, j) => ({
      name: ["Chicken Sandwich", "Caesar Salad", "Pasta", "Soup", "Dessert"][j],
      waste: Math.random() * 100,
    })),
  })),
};

export default function ValidateStep() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedAnomaly, setSelectedAnomaly] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleContinue = async () => {
    setIsProcessing(true);
    try {
      // TODO: Implement actual validation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/wizard/step-3");
    } catch (error) {
      toast({
        title: "Error validating data",
        description: "Please check your data and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-cloud">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Stepper */}
        <div className="mb-12 flex items-center justify-center space-x-4">
          {["Upload", "Validate", "Train"].map((step, i) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  i <= 1
                    ? "bg-primary text-white"
                    : "border-2 border-neutral-mist text-neutral-steel"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  i <= 1 ? "text-accent" : "text-neutral-steel"
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
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Heat map */}
          <div className="card col-span-2 bg-white">
            <h1 className="mb-6 font-display text-2xl font-semibold text-accent">
              Data Validation
            </h1>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-neutral-steel">
                      Item
                    </th>
                    {mockData.heatmap.map((day) => (
                      <th
                        key={day.date}
                        className="px-4 py-2 text-center text-sm font-medium text-neutral-steel"
                      >
                        {day.date}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockData.heatmap[0].items.map((item) => (
                    <tr key={item.name}>
                      <td className="border-t border-neutral-mist px-4 py-2 text-sm">
                        {item.name}
                      </td>
                      {mockData.heatmap.map((day) => {
                        const cellItem = day.items.find(
                          (i) => i.name === item.name
                        );
                        const waste = cellItem?.waste || 0;
                        const isAnomaly = waste > 70 || waste === 0;
                        const isSelected =
                          selectedAnomaly !== null &&
                          mockData.anomalies[selectedAnomaly].item === item.name &&
                          mockData.anomalies[selectedAnomaly].date === day.date;

                        return (
                          <td
                            key={day.date}
                            className={`border-t border-neutral-mist px-4 py-2 text-center text-sm ${
                              isSelected
                                ? "bg-secondary/10"
                                : isAnomaly
                                ? "bg-destructive/10"
                                : ""
                            }`}
                          >
                            {waste.toFixed(1)}%
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Anomalies panel */}
          <div className="card bg-white">
            <h2 className="mb-4 font-display text-xl font-semibold text-accent">
              Anomalies
            </h2>

            <div className="space-y-4">
              {mockData.anomalies.map((anomaly, index) => (
                <div
                  key={anomaly.id}
                  className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                    selectedAnomaly === index
                      ? "border-secondary bg-secondary/5"
                      : "border-neutral-mist hover:border-primary"
                  }`}
                  onClick={() => setSelectedAnomaly(index)}
                >
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium text-accent">
                        {anomaly.item}
                      </p>
                      <p className="text-sm text-neutral-steel">
                        {anomaly.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleContinue}
              disabled={isProcessing}
              className="btn btn-primary mt-8 w-full"
            >
              {isProcessing ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Looks Good →"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 