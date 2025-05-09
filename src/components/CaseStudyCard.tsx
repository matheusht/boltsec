import React from 'react';

interface CaseStudyCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ title, description, image, slug }) => {
  return (
    <a 
      href={`/case-studies/${slug}`}
      className="group block bg-[#1D1F2F] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-8">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
        <div className="mt-4 inline-flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
          View Case Study
          <svg className="ml-2 w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.66667 3.33333L12 8L6.66667 12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </a>
  );
};

export default CaseStudyCard;