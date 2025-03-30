import CircularProgress from '@/components/CircularProgress'
import { Mail, Pencil, Phone } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

// Animation variants
const sidebarVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
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
      damping: 20
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.3 }
  }
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
      delay: 0.3
    } 
  },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3 } 
  }
};

const iconButtonVariants = {
  hover: { 
    scale: 1.2, 
    rotate: 15,
    transition: { duration: 0.2 } 
  },
  tap: { 
    scale: 0.9,
    transition: { duration: 0.1 } 
  }
};

const progressVariants = {
  initial: { rotate: -90 },
  animate: { 
    rotate: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20,
      delay: 0.6 
    } 
  }
};

const listItemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 } 
  },
  hover: { 
    x: 5,
    transition: { duration: 0.2 } 
  }
};

const textFadeVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2 }
  }
};

const contactItemVariants = {
  initial: { opacity: 0, y: 5 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 } 
  },
  hover: { 
    backgroundColor: "rgba(186, 230, 253, 0.4)", // Light blue background
    borderRadius: "0.375rem", // rounded-md
    transition: { duration: 0.2 }
  }
};

const LeftSidebar = ({profile}) => {
  return (
    <motion.div 
      className="w-full h-screen text-black p-5 bg-sky-50"
      variants={sidebarVariants}
      initial="initial"
      animate="animate"
    >
        <motion.div 
          className="w-full rounded-md p-6 border border-gray-200 bg-white shadow-sm"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex flex-col items-center">
            <motion.div 
              className="h-20 w-20 bg-blue-200 rounded-full overflow-hidden mb-4 relative group"
              variants={profileImageVariants}
              whileHover="hover"
            >
              <img
                className="object-cover h-full w-full"
                src={profile.photo}
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
                  <Pencil className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="text-center mb-4"
              variants={textFadeVariants}
            >
              <div className="flex items-center justify-center">
                <h2 className="font-bold text-xl">{profile.name}</h2>
                <motion.button 
                  className="ml-2 p-1 hover:bg-sky-50 rounded-full"
                  variants={iconButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Pencil className="w-3 h-3" />
                </motion.button>
              </div>
              <motion.h5 
                className="text-gray-700"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {profile.role}
              </motion.h5>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {profile.company}
              </motion.p>
              <motion.p 
                className="text-gray-500 text-sm"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                March 2024 - Present
              </motion.p>
              <motion.p 
                className="text-gray-500 text-sm"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {profile.location?.city}, {profile.location?.country}
              </motion.p>
            </motion.div>
            <motion.hr 
              className="w-full border-t my-4"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />

            <div className="w-full flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-500 text-sm">Total exp</p>
                <h5 className="font-semibold">
                  {profile.years_of_experience} yrs
                </h5>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-500 text-sm">Salary</p>
                <h5 className="font-semibold">{profile.salary}</h5>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-500 text-sm">Notice Period</p>
                <h5 className="font-semibold">{profile.notice_period}</h5>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="w-full bg-white rounded-md mt-2 p-4 border border-gray-200 shadow-sm"
          variants={cardVariants}
          whileHover="hover"
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="flex items-center justify-between mb-1 p-2"
            variants={contactItemVariants}
            whileHover="hover"
          >
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Phone className="h-4 w-4 text-sky-600" />
              </motion.div>
              <p>{profile.phone}</p>
            </div>
            <motion.div
              variants={iconButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Pencil className="h-3 w-3" />
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2 p-2"
            variants={contactItemVariants}
            whileHover="hover"
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: -15, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Mail className="h-4 w-4 text-sky-600" />
            </motion.div>
            <p>{profile.email}</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="w-full bg-white rounded-md mt-2 p-4 border border-gray-200 shadow-sm"
          variants={cardVariants}
          whileHover="hover"
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center p-2">
            <motion.div 
              className="w-1/4 flex justify-center"
              variants={progressVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.1 }}
            >
              <CircularProgress percentage={75} />
            </motion.div>
            <motion.div 
              className="w-3/4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <h5 className="font-medium">Profile score</h5>
              <p className="text-sm text-gray-600">
                Recruiters seek 100% profiles - complete yours to stand out!
              </p>
            </motion.div>
          </div>
          <motion.hr 
            className="w-full border-t my-3"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
          <motion.div 
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <h6 className="font-medium text-sm">Complete your profile:</h6>
            <ul className="mt-2 space-y-2">
              <motion.li 
                className="flex items-center text-sm"
                variants={listItemVariants}
                whileHover="hover"
                custom={1}
              >
                <motion.span 
                  className="w-2 h-2 bg-red-500 rounded-full mr-2"
                  animate={{ 
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                ></motion.span>
                Add your certifications
              </motion.li>
              <motion.li 
                className="flex items-center text-sm"
                variants={listItemVariants}
                whileHover="hover"
                custom={2}
              >
                <motion.span 
                  className="w-2 h-2 bg-red-500 rounded-full mr-2"
                  animate={{ 
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                ></motion.span>
                Upload your resume
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
  )
}

export default LeftSidebar