import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";

const JobSearchHeader = ({ 
  searchTitle, 
  setSearchTitle, 
  searchLocation, 
  setSearchLocation, 
  handleSearch 
}) => {
  return (
    <motion.div
      className="bg-blue-700 text-white p-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Find Your Dream Design Job
        </motion.h1>
        <motion.div
          className="bg-white rounded-xl shadow-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px] flex items-center gap-2 border-r border-gray-200 pr-4 md:pr-4">
              <Search className="text-gray-400" />
              <input
                type="text"
                placeholder="Search job titles or keywords"
                className="w-full outline-none text-gray-800"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-[200px] flex items-center gap-2 border-r border-gray-200 pr-4">
              <MapPin className="text-gray-400" />
              <input
                type="text"
                placeholder="City or location"
                className="w-full outline-none text-gray-900 bg-transparent"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <motion.button
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={handleSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search Jobs
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JobSearchHeader;