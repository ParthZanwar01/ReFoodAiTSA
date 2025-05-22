"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for demonstration
const mockData = {
  features: [
    {
      id: "weather",
      name: "Weather",
      description: "Include weather conditions in the forecast",
      enabled: true,
    },
    {
      id: "weekday",
      name: "Weekday",
      description: "Consider day of week patterns",
      enabled: true,
    },
    {
      id: "menuType",
      name: "Menu Type",
      description: "Account for special menu days",
      enabled: false,
    },
    {
      id: "eventFlag",
      name: "Events",
      description: "Include school/corporate events",
      enabled: false,
    },
  ],
  metrics: {
    mae: 12.5,
    mape: 8.2,
    r2: 0.89,
  },
  chartData: Array.from({ length: 30 }, (_, i) => ({
    date: `2024-03-${i + 1}`,
    forecast: Math.random() * 100,
    actual: Math.random() * 100,
  })),
  shapValues: [
    { feature: "Weather", impact: 0.35 },
    { feature: "Weekday", impact: 0.28 },
    { feature: "Menu Type", impact: 0.15 },
    { feature: "Events", impact: 0.12 },
  ],
};

export default function ForecastStudio() {
  const [selectedView, setSelectedView] = useState<"day" | "week" | "month">(
    "day"
  );
  const [features, setFeatures] = useState(mockData.features);

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, enabled: !f.enabled } : f
      )
    );
  };

  return (
    <div className="min-h-screen bg-neutral-cloud">
      <div className="container mx-auto px-4 py-8">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-4">
            {["Day", "Week", "Month"].map((view) => (
              <button
                key={view}
                onClick={() =>
                  setSelectedView(view.toLowerCase() as "day" | "week" | "month")
                }
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedView === view.toLowerCase()
                    ? "bg-primary text-white"
                    : "bg-white text-neutral-steel hover:bg-neutral-mist"
                }`}
              >
                {view}
              </button>
            ))}
          </div>
          <input
            type="date"
            className="input w-48"
            defaultValue="2024-03-20"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Left sidebar */}
          <div className="card bg-white">
            <h2 className="mb-4 font-display text-xl font-semibold text-accent">
              Features
            </h2>
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-start space-x-3"
                >
                  <input
                    type="checkbox"
                    id={feature.id}
                    checked={feature.enabled}
                    onChange={() => toggleFeature(feature.id)}
                    className="mt-1 h-4 w-4 rounded border-neutral-mist text-primary focus:ring-primary"
                  />
                  <div>
                    <label
                      htmlFor={feature.id}
                      className="flex items-center font-medium text-accent"
                    >
                      {feature.name}
                      <Info className="ml-1 h-4 w-4 text-neutral-steel" />
                    </label>
                    <p className="text-sm text-neutral-steel">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-2 space-y-8">
            {/* SHAP waterfall plot */}
            <div className="card bg-white">
              <h2 className="mb-4 font-display text-xl font-semibold text-accent">
                Feature Impact
              </h2>
              <div className="space-y-4">
                {mockData.shapValues.map((item) => (
                  <div key={item.feature}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-accent">
                        {item.feature}
                      </span>
                      <span className="text-sm text-neutral-steel">
                        {item.impact.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-mist">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${item.impact * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forecast chart */}
            <div className="card bg-white">
              <h2 className="mb-4 font-display text-xl font-semibold text-accent">
                Forecast vs Actual
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData.chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#E2E8F0"
                    />
                    <XAxis
                      dataKey="date"
                      stroke="#64748B"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      stroke="#64748B"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="#3DBA6F"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#F2B441"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="card bg-white">
            <h2 className="mb-4 font-display text-xl font-semibold text-accent">
              Model Metrics
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-neutral-cloud p-4">
                <p className="text-sm font-medium text-neutral-steel">MAE</p>
                <p className="text-2xl font-semibold text-accent">
                  {mockData.metrics.mae.toFixed(1)}
                </p>
              </div>
              <div className="rounded-lg bg-neutral-cloud p-4">
                <p className="text-sm font-medium text-neutral-steel">MAPE</p>
                <p className="text-2xl font-semibold text-accent">
                  {mockData.metrics.mape.toFixed(1)}%
                </p>
              </div>
              <div className="rounded-lg bg-neutral-cloud p-4">
                <p className="text-sm font-medium text-neutral-steel">R²</p>
                <p className="text-2xl font-semibold text-accent">
                  {mockData.metrics.r2.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 