import React, { useState } from 'react';
import type { CaseStudy } from '../data/caseStudies';

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
  itemsPerPage?: number;
}

export const CaseStudyGrid: React.FC<CaseStudyGridProps> = ({ 
  caseStudies,
  itemsPerPage = 9
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(caseStudies.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCaseStudies = caseStudies.slice(startIndex, endIndex);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentCaseStudies.map((study) => (
          <a
            key={study.id}
            href={`/case-studies/${study.slug}`}
            className="group bg-[#1D1F2F] rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400 mb-4">
                {study.industry}
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">{study.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-2">{study.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {study.metrics.slice(0, 3).map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{metric.value}</div>
                    <div className="text-xs text-gray-400 mt-1 line-clamp-2">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center text-blue-400 group-hover:text-blue-300">
                View Case Study
                <svg className="ml-2 w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M6.66667 3.33333L12 8L6.66667 12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-[#1D1F2F] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2D2F3F] transition-colors"
          >
            Previous
          </button>
          <span className="text-white mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-[#1D1F2F] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2D2F3F] transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};