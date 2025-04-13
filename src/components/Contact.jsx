import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Instagram, Twitter, Linkedin, Send, Briefcase, Users, Globe } from 'lucide-react';
import useAxios from '@/hooks/useAxios';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    subject:'',
    message: ''
  });
  
  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  const axios = useAxios();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form submitted:', formState);
      const response = await axios.post('/contact/create', formState);
      console.log(response);

    } catch (error) {
      console.log(error)
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  const inputFieldVariants = {
    initial: { scale: 1 },
    focus: { scale: 1.01, transition: { duration: 0.2 } },
    hover: { scale: 1.01, transition: { duration: 0.2 } },
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 min-h-screen p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
      {/* Subtle background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Main card */}
      <motion.div 
        className="bg-white/10 backdrop-blur-md rounded-2xl w-full max-w-5xl overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - Company Information */}
          <motion.div 
            className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white p-8 md:p-10 rounded-l-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="bg-white/10 p-3 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Briefcase className="w-6 h-6 text-blue-300" />
                </motion.div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
                  JobConnect
                </h1>
              </div>
              <p className="text-blue-200 mb-8">Your premier destination for professional opportunities and career advancement</p>
            </motion.div>
            
            <motion.h2 
              className="text-2xl font-semibold mb-8"
              variants={itemVariants}
            >
              <span className="text-blue-300 mr-2">•</span> Contact Information
            </motion.h2>
            
            <div className="space-y-6">
              <motion.div 
                variants={itemVariants} 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="bg-white/10 p-3 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-300 text-sm">Visit Us</p>
                  <p className="group-hover:text-blue-300 transition-colors">
                    123 Innovation Hub, Tech District
                    <br />New Delhi, 110001, India
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="bg-white/10 p-3 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-300 text-sm">Email Us</p>
                  <p className="group-hover:text-blue-300 transition-colors">contact@jobconnect.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="bg-white/10 p-3 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-300 text-sm">Call Us</p>
                  <p className="group-hover:text-blue-300 transition-colors">+91 98765 43210</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="bg-white/10 p-3 rounded-lg">
                  <Globe className="w-5 h-5 text-blue-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-300 text-sm">Hours</p>
                  <p className="group-hover:text-blue-300 transition-colors">
                    Monday - Friday: 9am - 6pm
                    <br />Weekends: 10am - 2pm
                  </p>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-12"
            >
              <p className="text-gray-300 mb-4">Connect With Us</p>
              <div className="flex space-x-4">
                {[Linkedin, Twitter, Instagram].map((Icon, index) => (
                  <motion.a 
                    key={index}
                    href="#" 
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="bg-white/10 p-3 rounded-full hover:bg-blue-500/30 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right side - Contact Form */}
          <motion.div 
            className="bg-white rounded-r-xl p-8 md:p-12"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              backgroundImage: "linear-gradient(145deg, #ffffff, #f8faff)",
              boxShadow: "inset 1px 1px 5px rgba(0, 0, 0, 0.05)"
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-3 relative">
                Get in Touch
                <motion.div 
                  className="absolute h-1 w-20 bg-blue-600 -bottom-2 left-0 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </h2>
              <p className="text-gray-600">We'd love to hear from you. Let us know how we can help.</p>
            </motion.div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: "fullName", label: "Your Name", type: "text", placeholder: "John Doe", delay: 0.4 },
                { name: "subject", label: "Subject", type: "text", placeholder: "subject", delay: 0.6},
                { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", delay: 0.8}
              ].map((field) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: field.delay, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <motion.input
                    type={field.type}
                    name={field.name}
                    value={formState[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full p-4 bg-blue-50 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    style={{ boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.05)" }}
                    variants={inputFieldVariants}
                    initial="initial"
                    whileHover="hover"
                    whileFocus="focus"
                  />
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <motion.textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="w-full p-4 bg-blue-50 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  style={{ boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.05)" }}
                  variants={inputFieldVariants}
                  initial="initial"
                  whileHover="hover"
                  whileFocus="focus"
                />
              </motion.div>
              
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.button
                  type="submit"
                  className="group relative w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="relative flex items-center gap-2">
                    Send Message
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        repeat: Infinity,
                        repeatType: "loop", 
                        duration: 1.5,
                        repeatDelay: 1 
                      }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>
            </form>
            
            <motion.div 
              className="mt-10 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">
                Join our network of <span className="font-semibold text-blue-700">5000+</span> professionals and <span className="font-semibold text-blue-700">1200+</span> companies
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;