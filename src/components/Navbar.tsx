
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
  
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleDropdownMouseEnter = (dropdownName: string) => {
    setActiveDropdown(dropdownName);
  };

  const handleDropdownMouseLeave = () => {
    setActiveDropdown(null);
  };
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-napptix-dark/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
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
            
            <nav className="hidden md:flex space-x-8 ml-auto">
              {/* Advertisers Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => handleDropdownMouseEnter('advertisers')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button className={`flex items-center text-white py-2 px-1 focus:outline-none ${
                  activeDropdown === 'advertisers' || location.pathname.includes('/advertisers') 
                    ? 'border-b-2 border-[#29dd3b]' 
                    : ''
                }`}>
                  Advertisers <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {activeDropdown === 'advertisers' && (
                  <div className="absolute top-full left-0 w-80 mt-2 bg-napptix-dark border border-napptix-grey/20 rounded-md shadow-lg overflow-hidden z-50">
                    <div className="p-4 bg-[#1A1F2C]">
                      <h3 className="text-white text-lg font-semibold uppercase tracking-wide">Advertiser Solution</h3>
                    </div>
                    <div className="p-6">
                      <Link to="/advertisers" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] mb-4">
                        Overview
                      </Link>
                      <Link to="/advertisers/case-studies" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] mb-4">
                        Case Studies
                      </Link>
                      
                      <div className="pt-2 border-t border-napptix-grey/20">
                        <h4 className="text-white text-lg font-semibold mb-3">Products</h4>
                        <div className="space-y-3 pl-2">
                          <Link to="/advertisers/products/wizora" onClick={scrollToTop} className="block text-gray-300 hover:text-white">
                            Wizora
                          </Link>
                          <Link to="/advertisers/products/questmap" onClick={scrollToTop} className="block text-gray-300 hover:text-white">
                            QuestMap
                          </Link>
                          <Link to="/advertisers/products/perfnxt" onClick={scrollToTop} className="block text-gray-300 hover:text-white">
                            PerfNXT
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Publishers Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => handleDropdownMouseEnter('publishers')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button className={`flex items-center text-white py-2 px-1 focus:outline-none ${
                  activeDropdown === 'publishers' || location.pathname.includes('/publishers') 
                    ? 'border-b-2 border-[#29dd3b]' 
                    : ''
                }`}>
                  Publishers <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {activeDropdown === 'publishers' && (
                  <div className="absolute top-full left-0 w-80 mt-2 bg-napptix-dark border border-napptix-grey/20 rounded-md shadow-lg overflow-hidden z-50">
                    <div className="p-4 bg-[#1A1F2C]">
                      <h3 className="text-white text-lg font-semibold uppercase tracking-wide">Publisher Solution</h3>
                    </div>
                    <div className="p-6">
                      <Link to="/publishers" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] mb-4">
                        Overview
                      </Link>
                      <Link to="/publishers/monetization" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5] mb-4">
                        Monetization
                      </Link>
                      <Link to="/publishers/analytics" onClick={scrollToTop} className="block text-xl font-semibold text-[#9b87f5]">
                        Analytics
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/about"
                onClick={scrollToTop}
                className={`text-white relative pb-1 ${
                  isActive('/about') ? 'after:scale-x-100' : 'after:scale-x-0'
                } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-left`}
              >
                About
              </Link>
              <Link 
                to="/contact"
                onClick={scrollToTop}
                className={`text-white relative pb-1 ${
                  isActive('/contact') ? 'after:scale-x-100' : 'after:scale-x-0'
                } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-left`}
              >
                Contact
              </Link>
            </nav>
            
            <button 
              className="md:hidden text-white ml-4 hover:text-[#29dd3b] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {mobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-napptix-dark z-40 md:hidden pt-20"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col space-y-6">
              <div className="flex flex-col space-y-2">
                <div className="text-white text-xl font-medium py-2">Advertisers</div>
                <Link 
                  to="/advertisers"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Overview
                </Link>
                <Link 
                  to="/advertisers/case-studies"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Case Studies
                </Link>
                <div className="text-white text-lg pl-4 py-1 font-medium">Products</div>
                <Link 
                  to="/advertisers/products/wizora"
                  className="text-white text-lg pl-8 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wizora
                </Link>
                <Link 
                  to="/advertisers/products/questmap"
                  className="text-white text-lg pl-8 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  QuestMap
                </Link>
                <Link 
                  to="/advertisers/products/perfnxt"
                  className="text-white text-lg pl-8 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  PerfNXT
                </Link>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="text-white text-xl font-medium py-2">Publishers</div>
                <Link 
                  to="/publishers"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Overview
                </Link>
                <Link 
                  to="/publishers/monetization"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Monetization
                </Link>
                <Link 
                  to="/publishers/analytics"
                  className="text-white text-lg pl-4 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Analytics
                </Link>
              </div>

              <Link 
                to="/about"
                className="text-white text-xl font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact"
                className="text-white text-xl font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
