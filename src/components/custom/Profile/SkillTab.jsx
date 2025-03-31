import { Award, Pencil, Plus } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const SkillsTab = ({ skills, certifications, onEdit, onAdd }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 500 }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#e0f2fe",
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
        className="bg-white rounded-md p-4 shadow-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Skills</h3>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#e0f2fe" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit("skills")}
            className="p-2 rounded-full"
          >
            <Pencil className="w-4 h-4" />
          </motion.button>
        </div>

        <motion.div 
          className="flex flex-wrap gap-2"
          variants={containerVariants}
        >
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <motion.span
                key={index}
                variants={skillVariants}
                whileHover="hover"
                className="bg-sky-100 text-sky-800 px-3 py-1.5 rounded-full text-sm"
                layout
              >
                {skill}
              </motion.span>
            ))
          ) : (
            <motion.p 
              variants={itemVariants}
              className="text-gray-500"
            >
              No skills added yet
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Certifications</h3>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#0284c7" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAdd("certification")}
            className="bg-sky-500 text-white px-3 py-2 rounded-md transition flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Certification
          </motion.button>
        </div>

        {certifications && certifications.length > 0 ? (
          <motion.div
            variants={containerVariants}
            className="space-y-3"
          >
            {certifications.map((cert, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                className="bg-white rounded-md p-4 relative group shadow-sm"
                layout
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  whileHover={{ scale: 1.1, backgroundColor: "#e0f2fe" }}
                  animate={{ opacity: 0 }}
                  variants={{}}
                  onClick={() => onEdit("certification", index)}
                  className="absolute top-4 right-4 p-2 group-hover:opacity-100 hover:bg-sky-50 rounded-full transition"
                >
                  <Pencil className="w-4 h-4" />
                </motion.button>

                <div className="flex items-start">
                  <motion.div 
                    whileHover={{ rotate: 5 }}
                    className="bg-sky-100 p-3 rounded-md mr-4"
                  >
                    <Award className="h-6 w-6 text-sky-600" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      {cert.name || "Certification not specified"}
                    </h4>
                    <p className="text-gray-700">
                      {cert.issuing_organization || "Organization not specified"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Issued:{" "}
                      {cert.issue_date
                        ? new Date(cert.issue_date).toLocaleDateString()
                        : "Not specified"}
                      {cert.expiry_date &&
                        ` · Expires: ${new Date(
                          cert.expiry_date
                        ).toLocaleDateString()}`}
                    </p>
                    {cert.credential_id && (
                      <p className="text-sm mt-1">
                        Credential ID: {cert.credential_id}
                      </p>
                    )}
                    {cert.credential_url && (
                      <motion.a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:underline text-sm block mt-1"
                        whileHover={{ x: 2 }}
                      >
                        View Credential
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            variants={itemVariants}
            whileHover={{ borderColor: "#38bdf8" }}
            className="bg-white rounded-md p-6 text-center border-2 border-dashed border-sky-300"
          >
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                transition: { 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }
              }}
            >
              <Award className="h-10 w-10 text-sky-300 mx-auto mb-2" />
            </motion.div>
            <p className="text-gray-500 mb-3">No certifications added yet</p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#0284c7" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAdd("certification")}
              className="bg-sky-500 text-white px-4 py-2 rounded-md transition"
            >
              Add Certification
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SkillsTab;