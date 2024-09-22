"use client";
import React from "react";
import { SparklesPreview } from "@/components/ui/sparkles"; // Ensure the correct path
import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo"; // Ensure the correct path

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-black">
      {/* Hero Section */}
      <SparklesPreview />
      <div className="text-center mt-10">
        <h2 className="text-4xl font-bold text-white">Join Now</h2>
        <p className="text-lg text-gray-400 mt-4">
          Transform your space with AI. Upload a room photo and receive design suggestions in seconds.
        </p>
        <button
          className="bg-yellow-500 text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition mt-6"
          onClick={() => (window.location.href = "/home")} // Redirects to /home page
        >
          Start Designing
        </button>
      </div>

      {/* Smaller Scroll Animation Section */}
      <section className="w-full max-w-6xl mt-20 mx-auto">
        <HeroScrollDemo /> {/* Add the HeroScrollDemo component here */}
      </section>
    </main>
  );
}
