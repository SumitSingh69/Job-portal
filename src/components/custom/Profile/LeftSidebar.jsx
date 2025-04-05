import CircularProgress from "@/components/CircularProgress";
import { Mail, Pencil, Phone } from "lucide-react";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

// Animation variants
const sidebarVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  hover: {
    y: -5,
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.3 },
  },
};

const profileImageVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.3,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

const iconButtonVariants = {
  hover: {
    scale: 1.2,
    rotate: 15,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.1 },
  },
};

const progressVariants = {
  initial: { rotate: -90 },
  animate: {
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.6,
    },
  },
};

const listItemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  hover: {
    x: 5,
    transition: { duration: 0.2 },
  },
};

const textFadeVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2 },
  },
};

const contactItemVariants = {
  initial: { opacity: 0, y: 5 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  hover: {
    backgroundColor: "rgba(186, 230, 253, 0.4)",
    borderRadius: "0.375rem",
    transition: { duration: 0.2 },
  },
};

const LeftSidebar = ({ profile, progressTracker }) => {
  console.log(profile);
  // Check if profile exists and has the expected structure
  if (!profile) {
    return <div>Loading profile...</div>;
  }

  // Determine current work experience for "role" and "company"
  const currentWork =
    profile.work_experience?.find((exp) => exp.current) ||
    profile.work_experience?.[0] ||
    {};

  // Format salary from expected_salary
  const formattedSalary = profile.expected_salary
    ? `${profile.expected_salary.currency} ${profile.expected_salary.min}-${profile.expected_salary.max}`
    : "Not specified";

  return (
    <motion.div
      className="w-full lg:h-screen text-black p-3 sm:p-5 bg-sky-50"
      variants={sidebarVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="w-full rounded-md p-4 sm:p-6 border border-gray-200 bg-white shadow-sm"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-col items-center md:w-1/3">
            <motion.div
              className="h-16 w-16 sm:h-20 sm:w-20 bg-blue-200 rounded-full overflow-hidden mb-3 relative group"
              variants={profileImageVariants}
              whileHover="hover"
            >
              <img
                className="object-cover h-full w-full"
                src={profile.photo || "/api/placeholder/80/80"}
                alt=""
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  variants={iconButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Pencil className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="text-center mb-4"
              variants={textFadeVariants}
            >
              <div className="flex items-center justify-center">
                <h2 className="font-bold text-lg sm:text-xl">
                  {profile.user_id?.firstName || "User"}
                </h2>
              </div>
              <motion.h5
                className="text-gray-700 text-sm sm:text-base"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentWork.role || "Role not specified"}
              </motion.h5>
              <motion.p
                className="text-gray-600 text-xs sm:text-sm"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {currentWork.company || "Company not specified"}
              </motion.p>
            </motion.div>
          </div>

          <div className="md:w-2/3 w-full">
            <motion.hr
              className="w-full border-t my-2 sm:my-4 md:hidden"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />

            <div className="hidden md:block text-center md:text-left mb-3">
              <motion.p
                className="text-gray-500 text-sm"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {currentWork.start_date
                  ? new Date(currentWork.start_date).toLocaleDateString(
                      "en-US",
                      { month: "long", year: "numeric" }
                    )
                  : ""}
                {" - "}
                {currentWork.current
                  ? "Present"
                  : currentWork.end_date
                  ? new Date(currentWork.end_date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </motion.p>
              <motion.p
                className="text-gray-500 text-sm"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {profile.location?.city}, {profile.location?.country}
              </motion.p>
            </div>

            <div className="w-full flex justify-between items-center px-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <p className="text-gray-500 text-xs sm:text-sm">Total exp</p>
                <h5 className="font-semibold text-sm sm:text-base">
                  {profile.years_of_experience || 0} yrs
                </h5>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <p className="text-gray-500 text-xs sm:text-sm">Salary</p>
                <h5 className="font-semibold text-sm sm:text-base">
                  {formattedSalary}
                </h5>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center"
              >
                <div className="flex items-center">
                  <span className="text-green-500 bg-green-500 h-2 w-2 rounded-full animate-pulse inline-block mr-1 sm:mr-2"></span>
                  <h5 className="font-semibold text-sm sm:text-base">active</h5>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          className="mt-4 sm:mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-medium text-sm sm:text-base mb-2">
            Contact Info
          </h3>

          <motion.div
            className="flex items-center gap-2 p-2 hover:bg-sky-100 rounded transition-colors"
            variants={contactItemVariants}
            whileHover="hover"
          >
            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
            <p className="text-gray-700 text-xs sm:text-sm">
              {profile.user_id?.email || "Email not available"}
            </p>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 p-2 hover:bg-sky-100 rounded transition-colors"
            variants={contactItemVariants}
            whileHover="hover"
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
            <p className="text-gray-700 text-xs sm:text-sm">
              {profile.phone || "Phone not available"}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-4 sm:mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-medium text-sm sm:text-base mb-2">
            Profile Completion
          </h3>
          <div className="flex items-center">
            <motion.div
              className="w-16 h-16 sm:w-20 sm:h-20 relative mr-3"
              variants={progressVariants}
            >
              <CircularProgress
                percentage={progressTracker}
                color="#0EA5E9"
                size={80}
                strokeWidth={8}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sky-500 font-bold text-sm sm:text-lg">
                  {progressTracker || 65}%
                </span>
              </div>
            </motion.div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm mb-1">
                Complete your profile to increase your chances of getting hired.
              </p>
              <motion.button
                className="text-sky-500 hover:text-sky-600 text-xs sm:text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See what's missing
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LeftSidebar;
