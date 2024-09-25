"use client";

import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"; // Assuming you have a Carousel component
import ClientLayout from '../components/ClientLayout';
import { SparklesCore } from "@/components/ui/sparkles";
type ProjectContentProps = {
  original: string;  // Define the type of 'original' based on your data
  generated: string; // Define the type of 'generated' based on your data
};

// Component for showing Original and AI-generated design within a card
const ProjectContent: React.FC<ProjectContentProps> = ({ original, generated }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="relative">
        <h4 className="text-md font-semibold mb-2 text-white">Original Design</h4>
        <Image
          src={original}
          alt="Original"
          width={600}
          height={400}
          className="rounded-md"
        />
      </div>
      <div className="relative">
        <h4 className="text-md font-semibold mb-2 text-white">AI-Generated Design</h4>
        <Image
          src={generated}
          alt="Generated"
          width={600}
          height={400}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  // Data array containing project details
  const projects = [
    {
      id: 1,
      title: "Living Room Design",
      original: "/images/original1.jpg",
      generated: "/images/generated1.jpg",
      description: "Our AI transformed this living room into a modern space.",
    },
    {
      id: 2,
      title: "Bedroom Design",
      original: "/images/original2.jpg",
      generated: "/images/generated2.jpg",
      description: "A cozy bedroom was redesigned with minimalist aesthetics.",
    },
    {
      id: 3,
      title: "Dining Room Design",
      original: "/images/original3.jpg",
      generated: "/images/generated3.jpg",
      description: "This dining room got a fresh look with our AI's touch.",
    },
    {
      id: 4,
      title: "Office Design",
      original: "/images/original4.jpg",
      generated: "/images/generated4.jpg",
      description: "We transformed this office into a sleek modern workspace.",
    },
  ];

  const cards = projects.map((project, index) => (
    <Card
      key={project.id}
      card={{
        category: "Interior Design",
        title: project.title,
        content: <ProjectContent original={project.original} generated={project.generated} />,
        src: project.generated, // For card cover image
        // description: project.description,
      }}
      index={index}
    />
  ));

  return (
    <ClientLayout>
      {/* Add SparklesCore for the sparkling effect */}
    

      <div className="w-full h-full py-20 relative z-10">
        <h2 className="max-w-7xl pl-4 mx-auto text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          AI-Generated Interior Designs
        </h2>
        <Carousel items={cards} />
      </div>
    </ClientLayout>
  );
}