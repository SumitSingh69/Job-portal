import {
  Calendar,
  FileText,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Upload,
  ChevronRight
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ProfileTab = ({ profile, onEdit }) => {
  const [hoveredSection, setHoveredSection] = useState(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const editButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1, 
      rotate: 15,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2,
      color: "#0284c7", // sky-600
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto ">
      <motion.div
        className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={0}
        whileHover="hover"
        onMouseEnter={() => setHoveredSection("profile")}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl text-gray-800">Personal Information</h3>
          <motion.button
            onClick={() => onEdit("profile")}
            className="p-2 bg-sky-50 rounded-full text-sky-600"
            variants={editButtonVariants}
            initial="initial"
            whileHover="hover"
            animate={hoveredSection === "profile" ? "hover" : "initial"}
          >
            <Pencil className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-gray-50 p-4 rounded-lg"
            whileHover={{ backgroundColor: "#e0f2fe" }} // sky-100
          >
            <p className="text-gray-500 text-sm mb-1">Gender</p>
            <p className="font-medium text-gray-800">{profile.gender || "Not specified"}</p>
          </motion.div>
          <motion.div 
            className="bg-gray-50 p-4 rounded-lg"
            whileHover={{ backgroundColor: "#e0f2fe" }} // sky-100
          >
            <p className="text-gray-500 text-sm mb-1">Date of Birth</p>
            <p className="font-medium text-gray-800 flex items-center">
              <motion.span
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
              >
                <Calendar className="w-4 h-4 mr-2 text-sky-500" />
              </motion.span>
              {profile.dob
                ? new Date(profile.dob).toLocaleDateString()
                : "Not specified"}
            </p>
          </motion.div>
          <motion.div 
            className="bg-gray-50 p-4 rounded-lg md:col-span-2"
            whileHover={{ backgroundColor: "#e0f2fe" }} // sky-100
          >
            <p className="text-gray-500 text-sm mb-2">Languages</p>
            <div className="flex flex-wrap gap-2">
              {profile.languages && profile.languages.length > 0 ? (
                profile.languages.map((lang, index) => (
                  <motion.span
                    key={index}
                    className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium"
                    whileHover={{ 
                      backgroundColor: "#0ea5e9", // sky-500
                      color: "white",
                      scale: 1.05
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { delay: index * 0.1 } 
                    }}
                  >
                    {lang}
                  </motion.span>
                ))
              ) : (
                <p className="text-gray-400 italic">No languages specified</p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={1}
        whileHover="hover"
        onMouseEnter={() => setHoveredSection("contact")}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl text-gray-800">Contact Information</h3>
          <motion.button
            onClick={() => onEdit("contact")}
            className="p-2 bg-sky-50 rounded-full text-sky-600"
            variants={editButtonVariants}
            initial="initial"
            whileHover="hover"
            animate={hoveredSection === "contact" ? "hover" : "initial"}
          >
            <Pencil className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="space-y-4">
          <motion.div 
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            whileHover={{ 
              backgroundColor: "#e0f2fe", // sky-100
              x: 5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <motion.div
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              className="bg-sky-100 p-2 rounded-full"
            >
              <Phone className="h-5 w-5 text-sky-600" />
            </motion.div>
            <p className="font-medium text-gray-800">{profile.user_id?.phonenumber || "No phone number"}</p>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            whileHover={{ 
              backgroundColor: "#e0f2fe", // sky-100
              x: 5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <motion.div
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              className="bg-sky-100 p-2 rounded-full"
            >
              <Mail className="h-5 w-5 text-sky-600" />
            </motion.div>
            <p className="font-medium text-gray-800">{profile.user_id?.email || "No email address"}</p>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            whileHover={{ 
              backgroundColor: "#e0f2fe", // sky-100
              x: 5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <motion.div
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              className="bg-sky-100 p-2 rounded-full"
            >
              <MapPin className="h-5 w-5 text-sky-600" />
            </motion.div>
            <p className="font-medium text-gray-800">
              {profile.location?.city && profile.location?.country
                ? `${profile.location.city}, ${profile.location.state}, ${profile.location.country}`
                : "No location specified"}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-100"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        whileHover="hover"
        onMouseEnter={() => setHoveredSection("resume")}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl text-gray-800">Resume</h3>
          <motion.button
            onClick={() => onEdit("resume")}
            className="p-2 bg-sky-50 rounded-full text-sky-600"
            variants={editButtonVariants}
            initial="initial"
            whileHover="hover"
            animate={hoveredSection === "resume" ? "hover" : "initial"}
          >
            <Pencil className="w-4 h-4" />
          </motion.button>
        </div>
        {profile.resume ? (
          <motion.div 
            className="flex items-center justify-between p-4 bg-sky-50 rounded-lg border border-sky-100"
            whileHover={{ 
              backgroundColor: "#bae6fd", // sky-200
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <div className="flex items-center">
              <motion.div
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
              >
                <FileText className="h-6 w-6 text-sky-600 mr-3" />
              </motion.div>
              <span className="font-medium">resume.pdf</span>
            </div>
            <motion.a
              href={profile.resume}
              className="flex items-center text-sky-600 hover:text-sky-800 font-medium px-3 py-1 rounded-md"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                backgroundColor: "#0284c7", // sky-600
                color: "white",
                scale: 1.05
              }}
            >
              View
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
              >
                <ChevronRight className="ml-1 h-4 w-4" />
              </motion.span>
            </motion.a>
          </motion.div>
        ) : (
          <motion.div
            className="border-2 border-dashed border-sky-300 p-8 rounded-lg text-center cursor-pointer"
            onClick={() => onEdit("resume")}
            whileHover={{ 
              borderColor: "#0ea5e9", // sky-500 
              backgroundColor: "#f0f9ff", // sky-50
              scale: 1.02
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              initial={{ y: 0 }}
              animate={{ 
                y: [0, -10, 0],
                transition: { 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                } 
              }}
            >
              <Upload className="h-12 w-12 text-sky-500 mx-auto mb-4" />
            </motion.div>
            <p className="text-gray-600 mb-4">
              Drop your resume here or click to upload
            </p>
            <motion.button 
              className="mt-2 bg-sky-500 text-white px-6 py-2 rounded-lg font-medium shadow-md"
              whileHover={{ 
                backgroundColor: "#0284c7", // sky-600
                scale: 1.05,
                boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Upload Resume
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileTab;