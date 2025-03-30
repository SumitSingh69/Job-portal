import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Mail, Phone, ExternalLink } from 'lucide-react';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const socialVariants = {
    hover: { scale: 1.2, rotate: 5 }
  };

  const linkVariants = {
    hover: { x: 5, color: '#60A5FA' }
  };

  return (
    <motion.footer 
      className="bg-gradient-to-br from-[#0C0717] to-[#121029] py-12 px-6 md:px-12 lg:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="font-bold text-white text-2xl relative inline-block">
                Naukri Marg
                <motion.div 
                  className="absolute h-1 w-16 bg-blue-500 -bottom-1 left-0 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </h1>
            </motion.div>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed opacity-90">
              Find your next job with Naukri Marg, connecting job seekers with top employers 
              across industries for meaningful career opportunities.
            </p>
            
            <div className="flex items-center space-x-5 pt-3">
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                className="bg-[#1A1530] p-3 rounded-full hover:bg-blue-900 transition-colors duration-300"
              >
                <Instagram className="text-white w-5 h-5" />
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                className="bg-[#1A1530] p-3 rounded-full hover:bg-blue-900 transition-colors duration-300"
              >
                <Linkedin className="text-white w-5 h-5" />
              </motion.a>
              
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                className="bg-[#1A1530] p-3 rounded-full hover:bg-blue-900 transition-colors duration-300"
              >
                <Twitter className="text-white w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h2 className="font-semibold text-white text-xl relative inline-block">
              Quick Links
              <motion.div 
                className="absolute h-1 w-12 bg-blue-500 -bottom-1 left-0 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </h2>
            
            <div className="flex flex-col space-y-3 pt-2">
              <motion.a 
                href="#" 
                className="text-slate-300 flex items-center gap-2 w-fit hover:text-blue-400 transition-colors duration-300"
                variants={linkVariants}
                whileHover="hover"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Privacy Policy</span>
              </motion.a>
              
              <motion.a 
                href="#" 
                className="text-slate-300 flex items-center gap-2 w-fit hover:text-blue-400 transition-colors duration-300"
                variants={linkVariants}
                whileHover="hover"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Terms & Conditions</span>
              </motion.a>
              
              <motion.a 
                href="#" 
                className="text-slate-300 flex items-center gap-2 w-fit hover:text-blue-400 transition-colors duration-300"
                variants={linkVariants}
                whileHover="hover"
              >
                <ExternalLink className="w-4 h-4" />
                <span>FAQ</span>
              </motion.a>
              
              <motion.div variants={linkVariants} whileHover="hover">
                <Link 
                  to="/contact" 
                  className="text-slate-300 flex items-center gap-2 w-fit hover:text-blue-400 transition-colors duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h2 className="font-semibold text-white text-xl relative inline-block">
              Contact Us
              <motion.div 
                className="absolute h-1 w-12 bg-blue-500 -bottom-1 left-0 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.7, duration: 0.8 }}
              />
            </h2>
            
            <div className="space-y-4 pt-2">
              <motion.div 
                className="flex items-center gap-3 text-slate-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="bg-[#1A1530] p-2 rounded-lg group-hover:bg-blue-900 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <span className="group-hover:text-blue-400 transition-colors duration-300">
                  info@naukrimarg.com
                </span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 text-slate-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="bg-[#1A1530] p-2 rounded-lg group-hover:bg-blue-900 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <span className="group-hover:text-blue-400 transition-colors duration-300">
                  +123 456 7890
                </span>
              </motion.div>
              
              <motion.a
                href="#"
                className="inline-flex items-center mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get in Touch</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Copyright */}
        <motion.div 
          className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-slate-400"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} Naukri Marg. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;