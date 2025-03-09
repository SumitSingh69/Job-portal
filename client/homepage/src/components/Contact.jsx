import React from 'react';
import { MapPin, Mail, Phone, Instagram, Twitter, Linkedin } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-sky-600 min-h-screen p-8 flex items-center justify-center">
      {/* Main card container with shadow effect */}
      <div className="absolute w-32 h-32 rounded-full bg-white/10 -top-10 -right-10"></div>
      <div className="absolute w-32 h-32 rounded-full bg-white/10 -top-10 -left-10"></div>
      <div className="absolute w-24 h-24 rounded-full bg-white/10 bottom-10 -left-10"></div>
      <div className="absolute w-16 h-16 rounded-full bg-white/10 top-1/2 right-10"></div>
      <div className="absolute w-16 h-16 rounded-full bg-white/10 top-1/5 left-28"></div>
      <div className="absolute w-16 h-16 rounded-full bg-white/10 top-1/4 right-24"></div>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-8 relative">
      <div className="absolute w-32 h-32 rounded-full bg-white/10 -top-10 -right-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Contact Information */}
          <div className="bg-blue-900 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-8">Contact Us</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p>23, abbh absh India</p>
                  <p>123456 India</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <p>onlinejobportal@gmail.com</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-gray-400" />
                <p>mike.chemardin</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-gray-400" />
                <p>+91 1234567890</p>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-8">
                <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          
          {/* Right side - Contact Form */}
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
            <p className="text-gray-500 mb-8">Feel free to drop us a line below!</p>
            
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400"
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Type your message here..."
                  rows={4}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400"
                />
              </div>
             

<button
  type="submit"
  class="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-sky-500 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-blue-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
>
  Send
  <span class="w-8 h-8 flex justify-end items-center group-hover:translate-x-3 group-hover:bg-gray-50 text-black ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 transform">
    &#8594; 
  </span>
</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;