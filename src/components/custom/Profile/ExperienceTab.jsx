import { Briefcase, Pencil, Plus, Calendar, Building, Clock } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ExperienceTab = ({ experiences, onAdd, onEdit }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundColor: "#0284c7", // sky-600
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const editButtonVariants = {
    initial: { scale: 1, opacity: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 15,
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  const emptyStateVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
      transition: { 
        type: "spring",
        stiffness: 300
      }
    }
  };

  const iconPulse = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6 max-w-5xl mx-auto "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-6 b">
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
        experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="bg-white rounded-lg p-5 relative shadow-sm border border-gray-100"
            variants={itemVariants}
            whileHover="hover"
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            layout
          >
            <motion.button
              onClick={() => onEdit("experience", index)}
              className="absolute top-4 right-4 p-2 bg-sky-50 rounded-full text-sky-600 z-10"
              variants={editButtonVariants}
              initial="initial"
              animate={hoveredItem === index ? "hover" : "initial"}
            >
              <Pencil className="w-4 h-4" />
            </motion.button>

            <div className="flex items-start">
              <motion.div 
                className="bg-sky-100 p-3 rounded-lg mr-5 shrink-0"
                whileHover={{ 
                  backgroundColor: "#bae6fd", // sky-200
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Briefcase className="h-6 w-6 text-sky-600" />
              </motion.div>
              
              <div className="space-y-3 w-full">
                <div>
                  <motion.h4 
                    className="font-semibold text-lg text-gray-800"
                    whileHover={{ color: "#0284c7" }} // sky-600
                  >
                    {exp.role || "Role not specified"}
                  </motion.h4>
                  
                  <div className="flex items-center mt-1">
                    <Building className="h-4 w-4 text-sky-600 mr-1.5" />
                    <p className="text-gray-700 font-medium">
                      {exp.company || "Company not specified"}
                    </p>
                  </div>
                </div>
                
                <motion.div 
                  className="flex flex-wrap items-center gap-2 bg-gray-50 p-2 rounded-lg"
                  whileHover={{ backgroundColor: "#e0f2fe" }} // sky-100
                >
                  <Calendar className="h-4 w-4 text-sky-600" />
                  <p className="text-gray-600 text-sm">
                    {exp.start_date
                      ? new Date(exp.start_date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
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
                  </p>
                  
                  <div className="flex items-center ml-1">
                    <Clock className="h-4 w-4 text-sky-600 mr-1" />
                    <motion.span 
                      className="inline-flex bg-sky-100 text-sky-800 px-3 py-0.5 rounded-full text-xs font-medium"
                      whileHover={{ 
                        backgroundColor: "#0ea5e9", // sky-500
                        color: "white",
                        scale: 1.05 
                      }}
                    >
                      {exp.type || "Type not specified"}
                    </motion.span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-3 text-gray-700 bg-gray-50 p-3 rounded-lg border-l-2 border-sky-300"
                  initial={{ x: 0 }}
                  whileHover={{ 
                    x: 3, 
                    borderLeftColor: "#0ea5e9", // sky-500
                    backgroundColor: "#f0f9ff" // sky-50
                  }}
                >
                  {exp.description || "No description provided"}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <motion.div 
          className="bg-white rounded-lg p-8 text-center border-2 border-dashed border-sky-300 shadow-sm"
          variants={emptyStateVariants}
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            variants={iconPulse}
            initial="initial"
            animate="animate"
            className="mx-auto mb-4 bg-sky-50 p-4 rounded-full inline-block"
          >
            <Briefcase className="h-12 w-12 text-sky-500" />
          </motion.div>
          
          <p className="text-gray-600 mb-4 max-w-md mx-auto">
            Your professional journey starts here. Add your work experiences to showcase your career path and skills.
          </p>
          
          <motion.button
            onClick={() => onAdd("experience")}
            className="bg-sky-500 text-white px-6 py-2 rounded-lg font-medium shadow-md"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            Add Work Experience
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExperienceTab;