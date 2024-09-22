// app/components/ui/hero-scroll-demo.tsx
"use client";
import React from "react";
import { ContainerScroll } from "./container-scroll-animation"; // Ensure the correct path
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Explore the Future of Interior Design <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                AI-Powered Transformations
              </span>
            </h1>
          </>
        }
      >
        {/* Corrected the image path */}
        <Image
          src="/images/generated2.webp" // Use leading slash, path relative to public folder
          alt="AI-Generated Room Design"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      <p className="mt-8 text-lg text-gray-400 text-center px-6">
        Harness the power of AI and immersive scroll animations to reimagine your living spaces. Upload your room photos and see them transformed into stunning designs, uniquely crafted to your style. Scroll through the magic of AI-driven room transformations and get inspired to bring your vision to life.
      </p>
    </div>
  );
}
