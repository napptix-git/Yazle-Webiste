
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Cities data
  const cities = [
    { 
      name: "Mumbai", 
      address: "123 Marine Drive, Mumbai, Maharashtra 400001, India",
      tag: "Asia"
    },
    { 
      name: "Dubai", 
      address: "456 Sheikh Zayed Road, Dubai, UAE",
      tag: "Middle East"
    },
    { 
      name: "Delhi", 
      address: "789 Connaught Place, New Delhi 110001, India",
      tag: "Asia"
    },
    { 
      name: "Singapore", 
      address: "10 Marina Boulevard, Singapore 018983",
      tag: "South East"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black font-manrope">
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-20 px-4">
        <div className="mb-16 w-full">
          {/* City names and addresses in large format */}
          <div className="space-y-12 mb-16">
            {cities.map((city, index) => (
              <div key={index} className="border-b border-gray-800 pb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <h2 className="text-5xl md:text-7xl font-syne font-bold text-white mb-4 md:mb-0">{city.name}</h2>
                  <p className="text-xl text-napptix-light-grey">{city.address}</p>
                </div>
              </div>
            ))}
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Global Presence</h2>
          
          {/* Map */}
          <div className="relative w-full h-[400px] bg-black rounded-xl overflow-hidden mb-8">
            <img 
              src="/lovable-uploads/05b91cc3-4a1e-4bfb-87d2-97dcf501ce33.png" 
              alt="Napptix Global Map" 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Region buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-10 mb-12">
            {["Worldwide", "Asia", "Middle East", "South East"].map((region) => (
              <button
                key={region}
                className="px-6 py-2 rounded-full text-lg transition-all bg-white/10 text-white hover:bg-white/20"
              >
                {region}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-napptix-light-grey space-y-6 max-w-2xl mx-auto text-lg">
          <p className="text-center">
            Have questions about our advertising solutions? Interested in partnering with us?
            Fill out the form below and our team will get back to you shortly.
          </p>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-white mb-2 text-lg">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="email" className="text-white mb-2 text-lg">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                  placeholder="Your email"
                  required
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="company" className="text-white mb-2 text-lg">Company</label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleChange}
                className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                placeholder="Your company"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="message" className="text-white mb-2 text-lg">Message</label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                placeholder="Your message"
                required
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="bg-napptix-purple hover:bg-napptix-purple/80 text-white font-bold py-3 px-8 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
          
          <div className="mt-12 bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Other Ways to Reach Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <p className="font-bold text-white text-lg">Email</p>
                <p className="text-lg">info@napptix.com</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-white text-lg">Phone</p>
                <p className="text-lg">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
