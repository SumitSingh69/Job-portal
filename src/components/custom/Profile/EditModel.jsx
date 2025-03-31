import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EditModal = ({ isOpen, onClose, title, children }) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.95
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.1
      }
    },
    exit: { 
      y: 30, 
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
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
            className="bg-white rounded-lg w-full max-w-2xl max-h-screen overflow-y-auto"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-bold text-lg"
              >
                {title}
              </motion.h3>
              <motion.button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                whileHover={{ 
                  rotate: 90,
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </div>
            <motion.div 
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditModal;