import { Briefcase, Clock, DollarSign, Pencil, MapPin } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const PreferencesTab = ({ preferences, onEdit }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 500 }
    },
    hover: {
      scale: 1.2,
      color: "#0ea5e9",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-4"
    >
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
        className="bg-white rounded-md p-4 shadow-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Job Type Preferences</h3>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#e0f2fe" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit("jobType")}
            className="p-2 rounded-full"
          >
            <Pencil className="w-4 h-4" />
          </motion.button>
        </div>

        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div variants={iconVariants} whileHover="hover">
            <Briefcase className="h-5 w-5 text-sky-600" />
          </motion.div>
          <p>
            {preferences.job_type
              ? preferences.job_type.replace("_", " ")
              : "Not specified"}
          </p>
        </motion.div>

        <motion.div 
          className="flex items-center gap-3 mt-3"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div variants={iconVariants} whileHover="hover">
            <Clock className="h-5 w-5 text-sky-600" />
          </motion.div>
          <p>
            Available:{" "}
            {preferences.availability_status
              ? preferences.availability_status.replace(/_/g, " ")
              : "Not specified"}
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
        className="bg-white rounded-md p-4 shadow-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Salary Expectations</h3>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#e0f2fe" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit("salary")}
            className="p-2 rounded-full"
          >
            <Pencil className="w-4 h-4" />
          </motion.button>
        </div>

        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            variants={iconVariants} 
            whileHover="hover"
            animate={{
              y: [0, -3, 0],
              transition: {
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
                ease: "easeInOut"
              }
            }}
          >
            <DollarSign className="h-5 w-5 text-sky-600" />
          </motion.div>
          {preferences.expected_salary ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {preferences.expected_salary.currency}{" "}
              {preferences.expected_salary.min.toLocaleString()} -{" "}
              {preferences.expected_salary.max.toLocaleString()}
            </motion.p>
          ) : (
            <p>Not specified</p>
          )}
        </motion.div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
        className="bg-white rounded-md p-4 shadow-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Preferred Locations</h3>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#e0f2fe" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit("locations")}
            className="p-2 rounded-full"
          >
            <Pencil className="w-4 h-4" />
          </motion.button>
        </div>

        {preferences.preferred_locations &&
        preferences.preferred_locations.length > 0 ? (
          <motion.div 
            className="space-y-2"
            variants={containerVariants}
          >
            {preferences.preferred_locations.map((location, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-3"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div variants={iconVariants} whileHover="hover">
                  <MapPin className="h-4 w-4 text-sky-600" />
                </motion.div>
                <motion.p>
                  {location.city}, {location.state}, {location.country}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p 
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            No preferred locations specified
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PreferencesTab;