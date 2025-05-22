"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";

export default function UploadStep() {
  const router = useRouter();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const handleContinue = async () => {
    if (files.length === 0) {
      toast({
        title: "No file selected",
        description: "Please upload a data file to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // TODO: Implement actual file processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/wizard/step-2");
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "Please try again with a different file.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
                  i === 0
                    ? "bg-primary text-white"
                    : "border-2 border-neutral-mist text-neutral-steel"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  i === 0 ? "text-accent" : "text-neutral-steel"
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
            Upload Your Data
          </h1>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`mb-8 flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-neutral-mist hover:border-primary"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mb-4 h-8 w-8 text-neutral-steel" />
            <p className="text-center text-sm text-neutral-steel">
              {isDragActive
                ? "Drop your file here"
                : "Drag and drop your CSV or Excel file here"}
            </p>
            <p className="mt-2 text-xs text-neutral-steel">
              or click to browse files
            </p>
          </div>

          {/* File preview */}
          {files.length > 0 && (
            <div className="mb-8 rounded-lg border border-neutral-mist p-4">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{files[0].name}</p>
                  <p className="text-sm text-neutral-steel">
                    {(files[0].size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Required columns */}
          <div className="mb-8 rounded-lg border border-neutral-mist p-4">
            <h3 className="mb-3 font-medium text-accent">Required Columns</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-neutral-steel">
              <div>• Item</div>
              <div>• Qty Prepped</div>
              <div>• Qty Sold</div>
              <div>• Date</div>
              <div>• WeatherOpt</div>
            </div>
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={isProcessing || files.length === 0}
            className="btn btn-primary w-full"
          >
            {isProcessing ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 