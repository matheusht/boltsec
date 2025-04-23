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
    title: "Oriagro & Oriquimica",
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

  return (
    <li
      className="flex flex-1 flex-col items-center justify-center relative text-center text-white w-[70vmin] h-[70vmin] mx-[4vmin] z-10 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      onClick={() => onClick(index)}
      style={{
        transform: isCurrent
          ? "scale(1) rotateX(0deg)"
          : "scale(0.98) rotateX(8deg)",
        transformOrigin: "bottom",
      }}
    >
      <div className="absolute inset-0 bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-opacity duration-300">
        <img
          className="absolute inset-0 w-[120%] h-[120%] object-cover transition-opacity duration-300"
          src={slide.src}
          alt={slide.title}
          style={{ opacity: isCurrent ? 1 : 0.5 }}
        />
        {isCurrent && <div className="absolute inset-0 bg-black/30" />}
      </div>

      <article
        className={`relative p-[4vmin] transition-opacity duration-500 ${
          isCurrent ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold mb-4">
          {slide.title}
        </h2>
        <button className="px-4 py-2 bg-white text-black rounded-2xl shadow-sm hover:shadow-lg transition">
          {slide.button}
        </button>
      </article>
    </li>
  );
});

export function ClientCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const id = useId();
  const len = slideData.length;

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto"
      aria-labelledby={`carousel-${id}`}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${(current * 100) / len}%)`,
        }}
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
