import React, { useState } from 'react';
import { caseStudies } from '../data/caseStudies';
import CaseStudyCard from './CaseStudyCard';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';

const CaseStudyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === caseStudies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? caseStudies.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {caseStudies.map((study, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <CaseStudyCard {...study} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-[#1D1F2F] text-white hover:bg-[#2D2F3F] transition-colors"
          aria-label="Previous case study"
        >
          <IconArrowNarrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-[#1D1F2F] text-white hover:bg-[#2D2F3F] transition-colors"
          aria-label="Next case study"
        >
          <IconArrowNarrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CaseStudyCarousel;