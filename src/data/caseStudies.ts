export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  industry: string;
  logo: string;
  image: string;
  tier: 'featured' | 'secondary' | 'additional';
  metrics: {
    label: string;
    value: string;
  }[];
  slug: string;
}

export const caseStudies: CaseStudy[] = [
  // Featured Tier
  {
    id: "openai",
    title: "OpenAI",
    description: "Securing AI infrastructure at scale",
    longDescription: "How OpenAI implemented enterprise-grade security across their AI development pipeline.",
    challenge: "Securing complex AI infrastructure while maintaining rapid development velocity.",
    solution: "Implementation of comprehensive security protocols with AI-assisted monitoring.",
    testimonial: {
      quote: "Boltsec's security solutions have been instrumental in maintaining our security posture.",
      author: "John Smith",
      role: "Head of Security at OpenAI"
    },
    industry: "Artificial Intelligence",
    logo: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    tier: "featured",
    metrics: [
      { label: "Security incidents prevented", value: "99.9%" },
      { label: "Reduction in false positives", value: "85%" },
      { label: "Faster security assessments", value: "75%" }
    ],
    slug: "openai"
  },
  {
    id: "meta",
    title: "Meta",
    description: "Revolutionizing social media security",
    longDescription: "How Meta transformed their security testing pipeline with AI assistance.",
    challenge: "Scaling security testing across multiple platforms and products.",
    solution: "AI-powered security testing framework with automated vulnerability detection.",
    testimonial: {
      quote: "The AI-assisted approach has transformed our security testing capabilities.",
      author: "Jane Doe",
      role: "Security Director at Meta"
    },
    industry: "Social Media",
    logo: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
    image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
    tier: "featured",
    metrics: [
      { label: "Vulnerability detection rate", value: "92%" },
      { label: "Testing efficiency increase", value: "78%" },
      { label: "Cost reduction", value: "45%" }
    ],
    slug: "meta"
  },
  // Secondary Tier
  {
    id: "microsoft",
    title: "Microsoft",
    description: "Enterprise cloud security transformation",
    longDescription: "Microsoft's journey to enhance cloud infrastructure security.",
    challenge: "Securing vast cloud infrastructure while maintaining performance.",
    solution: "Implementation of AI-driven security monitoring and testing.",
    testimonial: {
      quote: "Boltsec has helped us maintain world-class security standards.",
      author: "Alice Johnson",
      role: "Cloud Security Lead"
    },
    industry: "Technology",
    logo: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    tier: "secondary",
    metrics: [
      { label: "Security coverage", value: "100%" },
      { label: "Response time improvement", value: "65%" },
      { label: "Cost efficiency", value: "40%" }
    ],
    slug: "microsoft"
  },
  // Additional Tier
  {
    id: "adobe",
    title: "Adobe",
    description: "Creative cloud security enhancement",
    longDescription: "Adobe's security transformation for creative cloud services.",
    challenge: "Securing creative cloud services across multiple platforms.",
    solution: "Comprehensive security testing and monitoring implementation.",
    testimonial: {
      quote: "Our security posture has significantly improved with Boltsec.",
      author: "Bob Wilson",
      role: "Security Manager"
    },
    industry: "Software",
    logo: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
    image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
    tier: "additional",
    metrics: [
      { label: "Security incidents reduced", value: "75%" },
      { label: "Testing coverage", value: "95%" },
      { label: "Response time", value: "50%" }
    ],
    slug: "adobe"
  }
];