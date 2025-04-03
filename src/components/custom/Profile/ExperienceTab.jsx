import {
  Briefcase,
  Pencil,
  Plus,
  Calendar,
  Building,
  Clock,
  MapPin,
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ExperienceTab = ({ experiences = [], onAdd, onEdit }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
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
        damping: 12,
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      backgroundColor: "#0284c7", // sky-600
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const editButtonVariants = {
    initial: { scale: 1, opacity: 0 },
    hover: {
      scale: 1.1,
      rotate: 15,
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  const emptyStateVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const iconPulse = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="space-y-6 max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-gray-800">Work Experience</h3>
        <motion.button
          onClick={() => onAdd("experience")}
          className="bg-sky-500 text-white px-4 py-2 rounded-lg flex items-center shadow-md font-medium"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Experience
        </motion.button>
      </div>

      {experiences && experiences.length > 0 ? (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 relative shadow-sm border border-gray-100"
              variants={itemVariants}
              whileHover="hover"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              layout
            >
              {/* Edit Button */}
              <motion.button
                onClick={() => onEdit("experience", index)}
                className="absolute top-4 right-4 p-2 bg-sky-50 rounded-full text-sky-600 hover:bg-sky-100"
                variants={editButtonVariants}
                initial="initial"
                animate={hoveredItem === index ? "hover" : "initial"}
              >
                <Pencil className="w-4 h-4" />
              </motion.button>

              <div className="flex items-start gap-4">
                <motion.div
                  className="bg-sky-100 p-3 rounded-lg shrink-0"
                  whileHover={{
                    backgroundColor: "#bae6fd",
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  <Briefcase className="h-6 w-6 text-sky-600" />
                </motion.div>

                <div className="space-y-4 flex-1">
                  {/* Title and Company */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {exp.role || "Role not specified"}
                    </h4>
                    <div className="flex items-center mt-1 text-gray-600">
                      <Building className="h-4 w-4 text-sky-600 mr-2" />
                      <span className="font-medium">
                        {exp.company || "Company not specified"}
                      </span>
                    </div>
                  </div>

                  {/* Duration and Type */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 text-sky-600 mr-2" />
                      <span>
                        {exp.start_date
                          ? new Date(exp.start_date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "Start date not specified"}
                        {" – "}
                        {exp.current
                          ? "Present"
                          : exp.end_date
                          ? new Date(exp.end_date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })
                          : "End date not specified"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-sky-600 mr-2" />
                      <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium">
                        {exp.type || "Full Time"}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  {exp.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 text-sky-600 mr-2" />
                      <span>{exp.location}</span>
                    </div>
                  )}

                  {/* Description */}
                  {exp.description && (
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border-l-2 border-sky-300">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="bg-white rounded-lg p-8 text-center border border-dashed border-gray-300"
          variants={emptyStateVariants}
          whileHover="hover"
        >
          <motion.div
            className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4"
            variants={iconPulse}
            animate="animate"
          >
            <Briefcase className="h-8 w-8 text-sky-600" />
          </motion.div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            No Experience Added
          </h4>
          <p className="text-gray-600 mb-4">
            Add your work experience to help employers understand your
            background.
          </p>
          <motion.button
            onClick={() => onAdd("experience")}
            className="bg-sky-500 text-white px-4 py-2 rounded-lg inline-flex items-center shadow-md"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Your First Experience
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExperienceTab;
