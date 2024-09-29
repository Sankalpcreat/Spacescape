"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/images/original1.jpg',
  '/images/original2.jpg',
  '/images/original3.jpg',
  '/images/generated1.jpg',
  '/images/generated2.webp',
  '/images/generated3.jpg',
];

export default function InfiniteScroll() {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef1.current && scrollRef2.current) {
        const scrollWidth = scrollRef1.current.scrollWidth;
        const clientWidth = scrollRef1.current.clientWidth;

        if (scrollRef1.current.scrollLeft >= scrollWidth - clientWidth) {
          scrollRef1.current.scrollLeft = 0;
        } else if (scrollRef1.current.scrollLeft <= 0) {
          scrollRef1.current.scrollLeft = scrollWidth - clientWidth;
        }

        if (scrollRef2.current.scrollLeft >= scrollWidth - clientWidth) {
          scrollRef2.current.scrollLeft = 0;
        } else if (scrollRef2.current.scrollLeft <= 0) {
          scrollRef2.current.scrollLeft = scrollWidth - clientWidth;
        }
      }
    };

    const interval = setInterval(() => {
      if (!isHovered && scrollRef1.current && scrollRef2.current) {
        scrollRef1.current.scrollLeft += 1;
        scrollRef2.current.scrollLeft -= 1;
      }
    }, 20);

    scrollRef1.current?.addEventListener('scroll', handleScroll);
    scrollRef2.current?.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      scrollRef1.current?.removeEventListener('scroll', handleScroll);
      scrollRef2.current?.removeEventListener('scroll', handleScroll);
    };
  }, [isHovered]);

  return (
    <div
      className="overflow-hidden py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollRef1}
        className="flex overflow-x-hidden mb-4"
      >
        {[...images, ...images].map((src, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] mx-2">
            <Image src={src} alt={`Scrolling image ${index + 1}`} width={300} height={200} className="rounded-lg" />
          </div>
        ))}
      </div>
      <div
        ref={scrollRef2}
        className="flex overflow-x-hidden"
      >
        {[...images, ...images].reverse().map((src, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] mx-2">
            <Image src={src} alt={`Scrolling image ${index + 1}`} width={300} height={200} className="rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
