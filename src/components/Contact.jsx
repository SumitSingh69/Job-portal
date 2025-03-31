import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Instagram, Twitter, Linkedin, ArrowRight, Send, Briefcase, Users, Globe } from 'lucide-react';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isHovered, setIsHovered] = useState(false);
  
  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formState);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.8
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
  
  const formFieldVariants = {
    focus: { scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.98 }
  };
  
  const floatingBubbleVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 min-h-screen p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ top: '10%', left: '5%' }}
      />
      
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-indigo-500/10 blur-xl"
        animate={{
          x: [0, -70, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ bottom: '5%', right: '10%' }}
      />
      
      {/* Floating 3D elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          style={{
            width: Math.random() * 50 + 30,
            height: Math.random() * 50 + 30,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0
          }}
          variants={floatingBubbleVariants}
          animate="animate"
          transition={{
            delay: i * 0.2,
            duration: 3 + Math.random() * 2
          }}
        />
      ))}
      
      {/* Main card with 3D effect */}
      <motion.div 
        className="bg-white/10 backdrop-blur-md rounded-2xl w-full max-w-5xl overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)"
        }}
      >
        {/* 3D card effect with perspective */}
        <motion.div
          className="w-full h-full"
          whileHover={{ 
            rotateY: isHovered ? 5 : 0, 
            rotateX: isHovered ? -5 : 0,
            transition: { duration: 0.5 }
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          style={{ perspective: "1000px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 backdrop-blur-sm">
            {/* Left side - Company Information */}
            <motion.div 
              className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white p-8 rounded-l-xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                boxShadow: "inset -10px 0 30px rgba(0, 0, 0, 0.2)"
              }}
            >
              <motion.div variants={itemVariants} className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="bg-white/10 p-3 rounded-xl"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <Briefcase className="w-6 h-6 text-blue-300" />
                  </motion.div>
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
                    JobConnect
                  </h1>
                </div>
                <p className="text-blue-200 mb-8">Your premier destination for professional opportunities and career advancement</p>
              </motion.div>
              
              <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
                <span className="text-blue-300">•</span> Contact Information
              </h2>
              
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="flex items-center space-x-4 group">
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
                
                <motion.div variants={itemVariants} className="flex items-center space-x-4 group">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-300 text-sm">Email Us</p>
                    <p className="group-hover:text-blue-300 transition-colors">contact@jobconnect.com</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-center space-x-4 group">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-300 text-sm">Call Us</p>
                    <p className="group-hover:text-blue-300 transition-colors">+91 98765 43210</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-center space-x-4 group">
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
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 p-3 rounded-full hover:bg-blue-500/30 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 p-3 rounded-full hover:bg-blue-500/30 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/10 p-3 rounded-full hover:bg-blue-500/30 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right side - Contact Form with 3D effects */}
            <motion.div 
              className="bg-white rounded-r-xl p-8 md:p-12 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                backgroundImage: "linear-gradient(145deg, #ffffff, #f8faff)",
                boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div className="mb-10">
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
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  whileFocus={formFieldVariants.focus}
                  whileTap={formFieldVariants.tap}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full p-4 bg-blue-50 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      style={{ boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.05)" }}
                    />
                    <motion.div 
                      className="absolute inset-0 border border-blue-300 rounded-lg pointer-events-none"
                      variants={{
                        focus: { opacity: 1, scale: 1.02 },
                        blur: { opacity: 0, scale: 1 }
                      }}
                      initial="blur"
                      whileFocus="focus"
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  whileFocus={formFieldVariants.focus}
                  whileTap={formFieldVariants.tap}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full p-4 bg-blue-50 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    style={{ boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.05)" }}
                  />
                </motion.div>
                
                <motion.div
                  whileFocus={formFieldVariants.focus}
                  whileTap={formFieldVariants.tap}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="w-full p-4 bg-blue-50 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    style={{ boxShadow: "inset 2px 2px 5px rgba(0, 0, 0, 0.05)" }}
                  />
                </motion.div>
                
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    type="submit"
                    className="group relative w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl overflow-hidden"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(37, 99, 235, 0.5)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="relative flex items-center gap-2">
                      Send Message
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ 
                          repeat: Infinity,
                          repeatType: "mirror", 
                          duration: 1,
                          repeatDelay: 0.5 
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
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
      </motion.div>
    </div>
  );
};

export default ContactPage;