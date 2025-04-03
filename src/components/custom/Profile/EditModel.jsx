import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import useAxios from "@/hooks/useAxios";

const EditModal = ({
  isOpen,
  onClose,
  title,
  children,
  type,
  data,
  onUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axios = useAxios();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = "/job-seeker/update";
      let requestData = formData;

      // Special handling for different update types
      if (formData.type === "experience") {
        endpoint = `/job-seeker/experience/${formData.index}`;
        requestData = formData.data;
      } else if (formData.type === "add_experience") {
        endpoint = "/job-seeker/experience";
        requestData = formData.data;
      } else if (formData.type === "education") {
        endpoint = `/job-seeker/education/${formData.index}`;
        requestData = formData.data;
      } else if (formData.type === "add_education") {
        endpoint = "/job-seeker/education";
        requestData = formData.data;
      } else if (formData.type === "certification") {
        endpoint = `/job-seeker/certification/${formData.index}`;
        requestData = formData.data;
      } else if (formData.type === "add_certification") {
        endpoint = "/job-seeker/certification";
        requestData = formData.data;
      }

      const response = await axios.patch(endpoint, requestData);

      if (response.data) {
        onUpdate(response.data);
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const modalVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.1,
      },
    },
    exit: {
      y: 30,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-bold text-lg text-gray-800"
              >
                {title}
              </motion.h3>
              <motion.button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                whileHover={{
                  rotate: 90,
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              {React.cloneElement(children, {
                onSubmit: handleSubmit,
                loading,
                initialData: data,
                onClose,
                editModal: {
                  type,
                  index:
                    type === "education" ||
                    type === "experience" ||
                    type === "certification"
                      ? data?.index
                      : null,
                },
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditModal;
