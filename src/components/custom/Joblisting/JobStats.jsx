import React from "react";
import { motion } from "framer-motion";

const JobStats = ({ totalJobs }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap justify-between items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="text-gray-600">
        Found{" "}
        <span className="font-semibold text-gray-900">
          {totalJobs}
        </span>{" "}
        jobs
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <select className="border-none bg-transparent text-gray-800 font-medium focus:outline-none">
          <option>Most recent</option>
          <option>Highest salary</option>
          <option>Most relevant</option>
        </select>
      </div>
    </motion.div>
  );
};

export default JobStats;