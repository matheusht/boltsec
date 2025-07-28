import React from 'react';
import type { CaseStudy } from '../data/caseStudies';

interface TieredCaseStudiesProps {
  caseStudies: CaseStudy[];
}

export const TieredCaseStudies: React.FC<TieredCaseStudiesProps> = ({ caseStudies }) => {
  const featured = caseStudies.filter(study => study.tier === 'featured');
  const secondary = caseStudies.filter(study => study.tier === 'secondary');
  const additional = caseStudies.filter(study => study.tier === 'additional');

  return (
    <div className="space-y-24">
      <section>
        <h2 className="text-3xl font-bold text-white mb-12">Featured Clients</h2>
        <div className="grid grid-cols-1 gap-12">
          {featured.map(study => (
            <a
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="group bg-[#1D1F2F] rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-6">
                    <img src={study.logo} alt={study.title} className="h-12 w-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{study.title}</h3>
                  <p className="text-gray-400 mb-6">{study.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {study.metrics.slice(0, 3).map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{metric.value}</div>
                        <div className="text-xs text-gray-400 mt-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-blue-400 group-hover:text-blue-300">
                    View Case Study →
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-8">More Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {secondary.map(study => (
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
                <div className="flex items-center mb-4">
                  <img src={study.logo} alt={study.title} className="h-8 w-auto" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{study.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{study.description}</p>
                <div className="text-blue-400 group-hover:text-blue-300">
                  Learn More →
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-6">Also Trusted By</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {additional.map(study => (
            <a
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="group bg-[#1D1F2F] rounded-lg p-4 hover:bg-[#2D2F3F] transition-colors"
            >
              <div className="flex items-center justify-center h-16">
                <img src={study.logo} alt={study.title} className="h-8 w-auto opacity-75 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};