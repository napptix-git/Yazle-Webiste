import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Update type to include both main menu and submenu states
type HoveredItemType = 'mobile-menu' | { 
  type: 'mobile-advertisers' | 'mobile-developers' | 'advertisers' | 'developers' | null 
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<HoveredItemType>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleMouseEnter = (item: HoveredItemType) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
    setTimeoutId(id);
  };
  
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/50 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link to="/" onClick={scrollToTop} className="text-white font-bold text-2xl mr-4">
            <div className="h-20 md:h-24 lg:h-24">
              <img 
                src="/lovable-uploads/8354ca7f-1dcf-4c35-bc7d-7fb04f9c9254.png" 
                alt="Napptix" 
                className="h-full w-auto object-contain" 
              />
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-8 ml-auto items-center">
            {/* Advertisers Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter({ type: 'advertisers' })}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center text-white font-medium py-2 px-1 focus:outline-none hover:text-[#29dd3b] transition-colors uppercase">
                ADVERTISERS <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <AnimatePresence>
                {hoveredItem?.type === 'advertisers' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-[300px] mt-2 bg-black/95 border border-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <div className="p-4">
                      <p className="text-gray-400 text-sm font-semibold mb-2 uppercase">Our Solutions</p>
                      <div className="space-y-3">
                        <Link to="/advertisers/wizora" onClick={scrollToTop} className="flex items-center space-x-4 px-3 py-2 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                          <div className="bg-gray-800 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9M3 8l7 4 7-4m-7 4v12" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200 uppercase">Wizora</p>
                            <p className="text-xs text-gray-400">Interactive ad platform</p>
                          </div>
                        </Link>
                        <Link to="/advertisers/case-studies" onClick={scrollToTop} className="flex items-center space-x-4 px-3 py-2 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                          <div className="bg-gray-800 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l-4-4 4-4m8 8l4-4-4-4M4 12h16" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200 uppercase">Case Studies</p>
                            <p className="text-xs text-gray-400">Success stories</p>
                          </div>
                        </Link>
                        <Link to="/advertisers/ad-gallery" onClick={scrollToTop} className="flex items-center space-x-4 px-3 py-2 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                          <div className="bg-gray-800 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l-4-4 4-4m8 8l4-4-4-4M4 12h16" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200 uppercase">Ad Gallery</p>
                            <p className="text-xs text-gray-400">Explore ad formats</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Developers Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter({ type: 'developers' })}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center text-white font-medium py-2 px-1 focus:outline-none hover:text-[#29dd3b] transition-colors uppercase">
                DEVELOPERS <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <AnimatePresence>
                {hoveredItem?.type === 'developers' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-[300px] mt-2 bg-black/95 border border-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <div className="p-4">
                      <p className="text-gray-400 text-sm font-semibold mb-2 uppercase">For Game Developers</p>
                      <div className="space-y-3">
                        <Link to="/developers" onClick={scrollToTop} className="flex items-center space-x-4 px-3 py-2 rounded-lg transition duration-200 transform hover:scale-105 hover:shadow-md hover:bg-gray-800">
                          <div className="bg-gray-800 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9M3 8l7 4 7-4m-7 4v12" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-200 uppercase">Overview</p>
                            <p className="text-xs text-gray-400">Discover solutions</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About and Contact Links */}
            <div className="space-x-8 flex items-center">
              <Link 
                to="/about"
                onClick={scrollToTop}
                className="text-white font-medium py-2 px-1 hover:text-[#29dd3b] transition-colors"
              >
                ABOUT US
              </Link>

              <Link 
                to="/contact"
                className="text-[#29dd3b] font-medium py-2 px-6 border-2 border-[#29dd3b] rounded-full hover:bg-[#29dd3b] hover:text-black transition-all duration-300"
              >
                LET'S TALK
              </Link>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-white"
              onClick={() => setHoveredItem(hoveredItem === 'mobile-menu' ? null : 'mobile-menu')}
            >
              {hoveredItem === 'mobile-menu' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {hoveredItem === 'mobile-menu' && (
        <div className="md:hidden bg-black shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div>
              <button 
                onClick={() => {
                  // Fixed type error by using a type guard
                  if (hoveredItem === 'mobile-advertisers') {
                    setHoveredItem('mobile-menu');
                  } else {
                    setHoveredItem('mobile-advertisers');
                  }
                }}
                className="flex justify-between items-center w-full py-2 text-white font-medium"
              >
                ADVERTISERS
                <ChevronDown className={`transition-transform ${hoveredItem === 'mobile-advertisers' ? 'rotate-180' : ''}`} />
              </button>
              {hoveredItem === 'mobile-advertisers' && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link to="/advertisers/wizora" onClick={scrollToTop} className="block py-2 text-gray-300">Wizora</Link>
                  <Link to="/advertisers/case-studies" onClick={scrollToTop} className="block py-2 text-gray-300">Case Studies</Link>
                  <Link to="/advertisers/ad-gallery" onClick={scrollToTop} className="block py-2 text-gray-300">Ad Gallery</Link>
                </div>
              )}
            </div>
            
            <div>
              <button 
                onClick={() => {
                  // Fixed type error by using a type guard
                  if (hoveredItem === 'mobile-developers') {
                    setHoveredItem('mobile-menu');
                  } else {
                    setHoveredItem('mobile-developers');
                  }
                }}
                className="flex justify-between items-center w-full py-2 text-white font-medium"
              >
                DEVELOPERS
                <ChevronDown className={`transition-transform ${hoveredItem === 'mobile-developers' ? 'rotate-180' : ''}`} />
              </button>
              {hoveredItem === 'mobile-developers' && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link to="/developers" onClick={scrollToTop} className="block py-2 text-gray-300">Overview</Link>
                </div>
              )}
            </div>
            
            <Link to="/about" onClick={scrollToTop} className="block py-2 text-white font-medium">
              ABOUT US
            </Link>
            
            <Link to="/contact" onClick={scrollToTop} className="block py-2 text-white font-medium">
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
