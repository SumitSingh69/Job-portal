import { GraduationCap, Pencil, Plus, Calendar, Award, BookOpen } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EducationTab = ({ education, onAdd, onEdit }) => {
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

  const iconVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.2,
      backgroundColor: "#bae6fd", // sky-200
      transition: { type: "spring", stiffness: 300 }
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

  return (
    <motion.div 
      className="space-y-6 max-w-5xl mx-auto py-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-gray-800">Education</h3>
        <motion.button
          onClick={() => onAdd("education")}
          className="bg-sky-500 text-white px-4 py-2 rounded-lg flex items-center shadow-md font-medium"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Education
        </motion.button>
      </div>

      {education && education.length > 0 ? (
        education.map((edu, index) => (
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
              onClick={() => onEdit("education", index)}
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
                variants={iconVariants}
                whileHover="hover"
                initial="initial"
                animate={hoveredItem === index ? "animate" : "initial"}
              >
                <GraduationCap className="h-6 w-6 text-sky-600" />
              </motion.div>
              
              <div className="space-y-3 w-full">
                <div className="border-b border-gray-100 pb-3">
                  <motion.h4 
                    className="font-semibold text-lg text-gray-800"
                    whileHover={{ color: "#0284c7" }} // sky-600
                  >
                    {edu.institution || "Institution not specified"}
                  </motion.h4>
                  
                  <div className="flex items-center mt-1">
                    <BookOpen className="h-4 w-4 text-sky-600 mr-1.5" />
                    <motion.p 
                      className="text-gray-700 font-medium"
                      whileHover={{ color: "#0284c7" }} // sky-600
                    >
                      {edu.level
                        ? edu.level.replace("_", " ")
                        : "Level not specified"}
                      {edu.field_of_study ? ` in ${edu.field_of_study}` : ""}
                    </motion.p>
                  </div>
                </div>
                
                <motion.div 
                  className="flex flex-wrap items-center gap-2 bg-gray-50 p-2 rounded-lg"
                  whileHover={{ backgroundColor: "#e0f2fe" }} // sky-100
                >
                  <Calendar className="h-4 w-4 text-sky-600" />
                  <p className="text-gray-600 text-sm">
                    {edu.start_date
                      ? new Date(edu.start_date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "Start date not specified"}
                    {" – "}
                    {edu.current
                      ? "Present"
                      : edu.end_date
                      ? new Date(edu.end_date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "End date not specified"}
                  </p>
                </motion.div>
                
                {edu.grade && (
                  <motion.div 
                    className="flex items-center gap-2 mt-2"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ 
                      opacity: 1,
                      x: 3,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Award className="h-4 w-4 text-sky-600" />
                    <motion.span 
                      className="inline-flex bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium"
                      whileHover={{ 
                        backgroundColor: "#0ea5e9", // sky-500
                        color: "white",
                        scale: 1.05 
                      }}
                    >
                      Grade: {edu.grade}
                    </motion.span>
                  </motion.div>
                )}
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
            variants={iconVariants}
            initial="initial"
            animate="animate"
            className="mx-auto mb-4 bg-sky-50 p-4 rounded-full inline-block"
          >
            <GraduationCap className="h-12 w-12 text-sky-500" />
          </motion.div>
          
          <p className="text-gray-600 mb-4 max-w-md mx-auto">
            Showcase your academic achievements and educational background to highlight your qualifications.
          </p>
          
          <motion.button
            onClick={() => onAdd("education")}
            className="bg-sky-500 text-white px-6 py-2 rounded-lg font-medium shadow-md"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            Add Education
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EducationTab;