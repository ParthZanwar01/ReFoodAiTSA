"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement actual magic link authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Magic link sent!",
        description: "Check your email for the login link.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel - Hero image */}
      <div className="hidden w-1/2 bg-primary lg:block">
        <div className="relative h-full w-full">
          <Image
            src="/images/auth-hero.jpg"
            alt="Cafeteria line"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-[400px] px-8">
          <div className="mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.svg"
                alt="ReFood AI"
                width={120}
                height={40}
                className="mb-8"
              />
            </Link>
            <h1 className="font-display text-3xl font-semibold text-accent">
              Welcome back
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-neutral-steel"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@company.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Send magic link"
              )}
            </button>

            <p className="text-center text-sm text-neutral-steel">
              <Link
                href="/login/password"
                className="text-primary hover:underline"
              >
                Use password instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
} 