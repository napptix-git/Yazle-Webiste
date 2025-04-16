import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface CaseStudyData {
  title: string;
  industry: string;
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  fullDescription?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

const caseStudies: Record<string, CaseStudyData> = {
  'gamerush-energy': {
    title: "GameRush Energy",
    industry: "Energy Drinks",
    image: "https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    challenge: "Needed to reach Gen Z gamers with authentic brand integration",
    solution: "Implemented in-game branded power-ups in top mobile racing games",
    results: [
      "50% increase in brand recall among 18-24 demographic",
      "2.3M unique impressions in first month",
      "37% sales lift in target markets"
    ],
    fullDescription: "GameRush Energy partnered with Napptix to revolutionize their approach to gaming audience engagement. By integrating their brand naturally within popular mobile racing games, they created an authentic connection with their target demographic while driving measurable business results.",
    metrics: [
      { label: "Campaign Duration", value: "3 months" },
      { label: "Target Markets", value: "12 countries" },
      { label: "Total Impressions", value: "8.7M" },
      { label: "User Engagement Rate", value: "42%" }
    ]
  },
  'techgiant-mobile': {
    title: "TechGiant Mobile",
    industry: "Smartphones",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    challenge: "Launch new smartphone model to tech-savvy gaming audience",
    solution: "Created virtual product showcases within popular open-world games",
    results: [
      "200% higher click-through rate vs. traditional digital ads",
      "85% of engaged users visited product landing page",
      "42% increase in pre-orders attributed to campaign"
    ],
    fullDescription: "TechGiant Mobile sought to break through the noise of traditional smartphone launches by meeting their target audience where they already were - in popular open-world games. The innovative approach not only captured attention but drove remarkable conversion rates.",
    metrics: [
      { label: "Virtual Showcases", value: "15 games" },
      { label: "User Interactions", value: "1.2M" },
      { label: "Avg. Engagement Time", value: "4.5 mins" },
      { label: "Brand Lift", value: "+65%" }
    ]
  }
  // ... Other case studies can be added similarly
};

const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const caseStudy = slug ? caseStudies[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center">
            <h1 className="text-4xl text-white mb-4">Case Study Not Found</h1>
            <Button onClick={() => navigate('/advertisers/case-studies')}>
              Back to Case Studies
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <Button 
          variant="ghost" 
          className="mb-8 text-white hover:text-[#29dd3b] transition-colors"
          onClick={() => navigate('/advertisers/case-studies')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Case Studies
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <img 
              src={caseStudy.image}
              alt={caseStudy.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {caseStudy.title}
              </h1>
              <p className="text-[#29dd3b] text-xl">{caseStudy.industry}</p>
            </div>
          </div>

          {caseStudy.fullDescription && (
            <div className="mb-12">
              <p className="text-napptix-light-grey text-xl leading-relaxed">
                {caseStudy.fullDescription}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-napptix-dark rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Challenge</h2>
              <p className="text-napptix-light-grey">{caseStudy.challenge}</p>
            </div>
            <div className="bg-napptix-dark rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Solution</h2>
              <p className="text-napptix-light-grey">{caseStudy.solution}</p>
            </div>
          </div>

          {caseStudy.metrics && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Key Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {caseStudy.metrics.map((metric, index) => (
                  <div key={index} className="bg-napptix-dark rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-[#29dd3b] mb-2">{metric.value}</div>
                    <div className="text-napptix-light-grey">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-napptix-dark rounded-xl p-6 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Results</h2>
            <ul className="list-disc pl-5 space-y-2">
              {caseStudy.results.map((result, index) => (
                <li key={index} className="text-napptix-light-grey">{result}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CaseStudyDetailPage;
