"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Rocket, Camera, Wand2, Stars } from "lucide-react";
import InfiniteScroll from "@/components/infinite-scroll";
import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo";
import Navbar from "@/components/navbar";

export default function LandingPage() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 text-slate-800">
      {/* Add the Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-16"> {/* Reduced padding on the bottom */}
        <div className="text-center mb-4"> {/* Reduced bottom margin */}
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-black"> {/* Bold and darkened text */}
            Space<span className="text-blue-600">Scape</span>
          </h1>
          <p className="text-xl text-black font-black"> {/* Bold and darkened text */}
            Redesign your space with cosmic intelligence
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="bg-blue-100 text-blue-800 text-sm py-2 px-4 rounded-full inline-block mb-4">
              Over <span className="text-blue-600 font-semibold">1 million</span> spaces transformed
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your AI-powered <br />
              <span className="text-blue-600">Interstellar Designer</span>
            </h2>
            <p className="text-slate-600 mb-6">
              Transform your living space into a cosmic oasis with our cutting-edge AI technology.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold">
              Start Your Transformation <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="md:w-1/2 lg:w-[60%] w-full relative ml-auto"> {/* Increased width for large screens and shifted to the right */}
  <div className="relative w-full h-auto rounded-lg overflow-hidden group bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
    <div className="relative w-full h-64 sm:h-80 md:h-[450px]"> {/* Responsive height for different screens */}
    <Image
      src="/images/original5.jpg"
      alt="Regular Earth room"
      fill
      className={`absolute inset-0 rounded-lg object-cover transition-opacity duration-500 ${showAfter ? 'opacity-0' : 'opacity-100'}`}
    />
    <Image
      src="/images/generated5.png"
      alt="Cosmic-themed room redesign"
      fill
      className={`absolute inset-0 rounded-lg object-cover transition-opacity duration-500 ${showAfter ? 'opacity-100' : 'opacity-0'}`}
    />
    </div>
    <div className="absolute top-2 left-2 bg-blue-600 text-white py-1 px-3 rounded-full text-sm font-semibold shadow">
      {showAfter ? 'After' : 'Before'}
    </div>
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-white rounded-full p-2 shadow-md">
      <span className="mr-2 text-sm font-medium text-slate-600">Before</span>
      <Switch
        checked={showAfter}
        onCheckedChange={setShowAfter}
        className="data-[state=checked]:bg-blue-600"
      />
      <span className="ml-2 text-sm font-medium text-slate-600">After</span>
    </div>
  </div>
</div>

        </div>
      </div>

      {/* Infinite Scroll Section */}
      <div className="mt-4"> {/* Reduced margin between Hero and Infinite Scroll */}
        <InfiniteScroll />
      </div>

      {/* Scroll Animation Section */}
      <section className="w-full max-w-6xl mt-20 mx-auto">
    <HeroScrollDemo />
  </section>

      {/* How It Works Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-slate-800">
          How SpaceScape Works
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { icon: Camera, title: "Capture", description: "Snap a photo of your current space" },
            { icon: Wand2, title: "Envision", description: "Select your desired cosmic theme" },
            { icon: Stars, title: "Transform", description: "Watch AI redesign your space instantly" },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center max-w-xs">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-slate-800">{step.title}</h3>
              <p className="text-slate-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
