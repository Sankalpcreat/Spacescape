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
            <h1 className="text-4xl font-semibold text-black">
              Explore the Future of Interior Design <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-black">
                AI-Powered Transformations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="/images/generated2.webp"
          alt="AI-Generated Room Design"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      <p className=" text-lg text-black text-center px-6"> {/* Changed text color to black */}
        Harness the power of AI and immersive scroll animations to reimagine your living spaces. Upload your room photos and see them transformed into stunning designs, uniquely crafted to your style. Scroll through the magic of AI-driven room transformations and get inspired to bring your vision to life.
      </p>
    </div>
  );
}
