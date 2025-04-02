
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Contact Us</h1>
        <div className="text-napptix-light-grey font-roboto-mono space-y-6 max-w-2xl mx-auto">
          <p className="text-center">
            Have questions about our advertising solutions? Interested in partnering with us?
            Fill out the form below and our team will get back to you shortly.
          </p>
          
          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                  placeholder="Your name"
                />
              </div>
              
              <div className="flex flex-col">
                <label htmlFor="email" className="text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                  placeholder="Your email"
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="company" className="text-white mb-2">Company</label>
              <input
                type="text"
                id="company"
                className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                placeholder="Your company"
              />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="message" className="text-white mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                className="bg-napptix-dark border border-napptix-grey/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#29dd3b]"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-napptix-purple hover:bg-napptix-purple/80 text-white font-bold py-3 px-8 rounded-full transition-all"
              >
                Send Message
              </button>
            </div>
          </form>
          
          <div className="mt-12 bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Other Ways to Reach Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <p className="font-bold text-white">Email</p>
                <p>info@napptix.com</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-white">Phone</p>
                <p>+1 (555) 123-4567</p>
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
