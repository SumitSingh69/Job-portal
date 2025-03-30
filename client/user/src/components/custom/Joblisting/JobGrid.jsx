import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import JobCard from "./JobCard";
import { ChevronUp, Sparkles } from "lucide-react";

const JobGrid = ({ jobs, loading = false }) => {
  const [showSkeleton, setShowSkeleton] = useState(loading);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.075,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  useEffect (() => {
    if (loading) {
      setShowSkeleton(true); 
    } else {
      const timer = setTimeout(() => {
        setShowSkeleton(false); 
      }, 2000);

      return () => clearTimeout(timer);  
    }
  }, [loading]);

  if (showSkeleton) {
    return <JobGridSkeleton />;
  }


  const getFeaturedJobs = () => {
    if (!jobs.length) return [];
    return [jobs[0]];
  };

  const featuredJobs = getFeaturedJobs();

  return (
    <div className="space-y-8">
      {/* Featured Job Section (if any) */}
      {featuredJobs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-yellow-500 h-5 w-5" />
            <h2 className="text-lg font-semibold text-gray-900">
              Featured Opportunity
            </h2>
          </div>

          <motion.div
            whileHover={{
              y: -4,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md border border-indigo-100"
          >
            <JobCard
              key={featuredJobs[0]._id}
              job={featuredJobs[0]}
              featured={true}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Regular Jobs Grid */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Available Positions
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-800"
          >
            <span>Most relevant</span>
            <ChevronUp className="h-4 w-4" />
          </motion.button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {jobs
            .filter((job) => !featuredJobs.includes(job))
            .map((job) => (
              <motion.div key={job._id} variants={itemVariants}>
                <motion.div
                  whileHover={{
                    y: -4,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <JobCard job={job} />
                </motion.div>
              </motion.div>
            ))}
        </motion.div>
      </div>

      {/* Empty state placeholder for demonstration */}
      {jobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.3,
            }}
            className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gray-100 rounded-full"
          >
            <div className="text-gray-400">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </motion.div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No jobs found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search criteria
          </p>
        </motion.div>
      )}
    </div>
  );
};

export const JobGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md overflow-hidden h-full"
        >
          <div className="p-5 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3">
                <div className="rounded-lg w-12 h-12 bg-gray-200 flex-shrink-0"></div>
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-36"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 bg-gray-200 rounded-full w-16"
                ></div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-gray-100 mt-6 pt-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-gray-200 rounded-full"
                  ></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobGrid;
