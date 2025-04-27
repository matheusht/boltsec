"use client";

import { useState, useRef, useId, useEffect } from "react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import React from "react";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

const slideData: SlideData[] = [
  {
    title: "SAGUI AI",
    button: "View Case Study",
    src: "https://cdn.prod.website-files.com/662b316c8b82b058df121f76/6630804ed84dabd8adb3eca3_Section_%20Why%20Sierra2.webp",
  },
  {
    title: "ORIAGRO",
    button: "View Case Study",
    src: "https://cdn.prod.website-files.com/662b316c8b82b058df121f76/6630804ed84dabd8adb3eca3_Section_%20Why%20Sierra2.webp",
  },
  {
    title: "MARKETISA",
    button: "View Case Study",
    src: "https://cdn.prod.website-files.com/662b316c8b82b058df121f76/6630804ed84dabd8adb3eca3_Section_%20Why%20Sierra2.webp",
  },
  {
    title: "SEUMIMO",
    button: "View Case Study",
    src: "https://cdn.prod.website-files.com/662b316c8b82b058df121f76/6630804ed84dabd8adb3eca3_Section_%20Why%20Sierra2.webp",
  },
  {
    title: "WEARFY",
    button: "View Case Study",
    src: "https://cdn.prod.website-files.com/662b316c8b82b058df121f76/6630804ed84dabd8adb3eca3_Section_%20Why%20Sierra2.webp",
  },
];

type ControlType = "previous" | "next";
function CarouselControl({
  type,
  onClick,
}: {
  type: ControlType;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 rounded-full focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      onClick={onClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
}

const Slide: React.FC<{
  slide: SlideData;
  index: number;
  current: number;
  onClick: (i: number) => void;
}> = React.memo(({ slide, index, current, onClick }) => {
  const isCurrent = current === index;
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (slideRef.current) {
        slideRef.current.style.setProperty("--x", `${xRef.current}px`);
        slideRef.current.style.setProperty("--y", `${yRef.current}px`);
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!slideRef.current) return;
    const rect = slideRef.current.getBoundingClientRect();
    xRef.current = e.clientX - (rect.left + rect.width / 2);
    yRef.current = e.clientY - (rect.top + rect.height / 2);
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d] select-none">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white w-[70vmin] h-[70vmin] mx-[4vmin] z-10 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        onClick={() => onClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isCurrent
            ? "scale(1) rotateX(0deg)"
            : "scale(0.98) rotateX(8deg)",
          transformOrigin: "bottom",
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <div
          className="absolute inset-0 bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform: isCurrent
              ? "translate3d(calc(var(--x)/30), calc(var(--y)/30), 0)"
              : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover transition-opacity duration-300 select-none pointer-events-auto"
            src={slide.src}
            alt={slide.title}
            style={{ 
              opacity: isCurrent ? 1 : 0.5,
              userSelect: 'none',
              WebkitUserSelect: 'none',
              pointerEvents: 'none' 
            }}
            draggable="false"
          />
          {isCurrent && <div className="absolute inset-0 bg-black/30" />}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-500 ${
            isCurrent ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-lg font-sohne md:text-2xl lg:text-4xl font-semibold mb-4 select-none">
            {slide.title}
          </h2>
          <button className="px-4 py-2 bg-white text-black rounded-2xl shadow-sm hover:shadow-lg transition select-none">
            {slide.button}
          </button>
        </article>
      </li>
    </div>
  );
});

export function ClientCarousel() {
  const [current, setCurrent] = useState<number>(1);
  const [startX, setStartX] = useState<number>(1);
  const [isDragging, setIsDragging] = useState(false);
  const id = useId();
  const len = slideData.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    handleSwipe(endX - startX);
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const endX = e.clientX;
    handleSwipe(endX - startX);
    setIsDragging(false);
  };

  const handleSwipe = (deltaX: number) => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const swipeThreshold = containerWidth * 0.1;

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        setCurrent((c) => (c - 1 + len) % len);
      } else {
        setCurrent((c) => (c + 1) % len);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[70vmin] h-[70vmin] mx-auto select-none"
      aria-labelledby={`carousel-${id}`}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(-${(current * 100) / len}%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)}
      >
        {slideData.map((slide, i) => (
          <Slide
            key={i}
            slide={slide}
            index={i}
            current={current}
            onClick={setCurrent}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          onClick={() =>
            setCurrent((c) => (c - 1 + slideData.length) % slideData.length)
          }
        />
        <CarouselControl
          type="next"
          onClick={() => setCurrent((c) => (c + 1) % slideData.length)}
        />
      </div>
    </div>
  );
}