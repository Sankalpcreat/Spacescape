"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const images = [
  { src: '/images/t1.png', label: 'Bedroom' },
  { src: '/images/t2.png', label: 'Living Room' },
  { src: '/images/t3.jpg', label: 'Dining Room' },
  { src: '/images/t4.png', label: 'Bathroom' },
  { src: '/images/t5.png', label: 'Office' },
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
      {/* First scrolling section */}
      <div
        ref={scrollRef1}
        className="flex overflow-x-hidden mb-4"
      >
        {[...images, ...images].map((item, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] mx-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            <div className="relative z-10">
              <div className="text-center mb-2 text-lg font-semibold text-gray-800">
                {item.label}
              </div>
              <Image
                src={item.src}
                alt={`Scrolling image ${index + 1}`}
                width={300}
                height={200}
                className="rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Second scrolling section */}
      <div
        ref={scrollRef2}
        className="flex overflow-x-hidden"
      >
        {[...images, ...images].reverse().map((item, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] mx-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            <div className="relative z-10">
              <div className="text-center mb-2 text-lg font-semibold text-gray-800">
                {item.label}
              </div>
              <Image
                src={item.src}
                alt={`Scrolling image ${index + 1}`}
                width={300}
                height={200}
                className="rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}