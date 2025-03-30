import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter, Sparkles, Briefcase } from 'lucide-react';

const JobPortalHero = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative min-h-[600px] bg-[url('/src/assets/hero.jpg')] bg-cover bg-center rounded-xl overflow-hidden">
      {/* Background effects layer */}
      <div className="absolute inset-0">
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-blue-900/30" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 bg-black/10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* 3D Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs with enhanced 3D movement */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              y: [0, 25, 0],
              x: [0, -10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"
          />
          
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              y: [0, 15, 0],
              x: [0, -5, 0],
              scale: [0.9, 1, 0.9],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/3 left-1/3 w-72 h-72 bg-cyan-400 rounded-full opacity-15 blur-3xl"
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 z-10">
        {/* Badge with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center bg-blue-800/40 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-blue-400/20 shadow-lg shadow-blue-500/10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-yellow-300 mr-2" size={16} />
            </motion.div>
            <span className="text-blue-100 font-medium">Over 50,000 jobs available</span>
          </motion.div>

          {/* Enhanced headline with 3D text effect */}
          <div className="perspective-[1000px]">
            <motion.h1
              initial={{ opacity: 0, rotateX: 20 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-xl"
            >
              Find Your{" "}
              <motion.span
                initial={{ backgroundPosition: "0 0" }}
                animate={{ backgroundPosition: "200% 0" }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-[length:200%_100%]"
              >
                Dream Job
              </motion.span>{" "}
              Today
            </motion.h1>
          </div>

          {/* Subtitle with subtle animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto font-light"
          >
            Connect with top employers and take the next step in your career journey
          </motion.p>
        </motion.div>

        {/* Search box with floating effect and enhanced UI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative group">
                <Search
                  className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                  size={20}
                />
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
                  type="text"
                  placeholder="Job title, skills, or company"
                  className="w-full pl-10 p-3 bg-white/80 backdrop-blur-sm border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <div className="flex-1 relative group">
                <MapPin
                  className="absolute left-3 top-3.5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                  size={20}
                />
                <motion.input
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" }}
                  type="text"
                  placeholder="Location"
                  className="w-full pl-10 p-3 bg-white/80 backdrop-blur-sm border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              {/* <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
              >
                <Filter size={20} className="text-gray-600" />
                <span className="text-gray-600 font-medium">Filters</span>
              </motion.button> */}
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.7)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Search size={20} />
                </motion.div>
                <span className="font-semibold">Search Jobs</span>
              </motion.button>
            </div>
            
            {/* Pill-shaped featured categories (optional) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-2 mt-4 justify-center"
            >
              <motion.span 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.4)" }}
                className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-blue-50 cursor-pointer hover:bg-blue-500/30 transition-all duration-300"
              >
                Remote
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.4)" }}
                className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-blue-50 cursor-pointer hover:bg-blue-500/30 transition-all duration-300"
              >
                Tech
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.4)" }}
                className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-blue-50 cursor-pointer hover:bg-blue-500/30 transition-all duration-300"
              >
                Healthcare
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.4)" }}
                className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-blue-50 cursor-pointer hover:bg-blue-500/30 transition-all duration-300"
              >
                Marketing
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.4)" }}
                className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-blue-50 cursor-pointer hover:bg-blue-500/30 transition-all duration-300"
              >
                Finance
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Floating briefcase icon (purely decorative) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute -bottom-6 -right-6 md:bottom-10 md:right-10 opacity-20"
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ 
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Briefcase size={120} className="text-blue-200" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobPortalHero;