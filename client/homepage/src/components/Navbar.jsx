import React from "react";
import About from "./About";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Briefcase,
  Info,
  MessageCircle,
  UserPlus,
  LogIn,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", text: "Home", icon: <Home size={20} /> },
    { path: "/jobs", text: "Jobs", icon: <Briefcase size={20} /> },
    { path: "/about", text: "About", icon: <Info size={20} /> },
    { path: "/contact", text: "Contact", icon: <MessageCircle size={20} /> },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const linkVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-200 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <Briefcase className="text-white" size={20} />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-blue-600">
                  Naukri Marg
                </h1>
                <span className="hidden md:block text-gray-500 text-xs">
                  Get your dream job
                </span>
              </div>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
                      location.pathname === item.path
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={linkVariants}
              >
                <Link
                  to="/signup"
                  className="flex items-center space-x-1 text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full"
                >
                  <UserPlus size={20} />
                  <span>Register</span>
                </Link>
              </motion.div>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={linkVariants}
              >
                <Link
                  to="/login"
                  className="flex items-center space-x-1 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-full"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 border-t">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    whileHover="hover"
                    whileTap="tap"
                    variants={linkVariants}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                        location.pathname === item.path
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.text}</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                >
                  <Link
                    to="/signup"
                    className="flex items-center space-x-2 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full text-center mt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserPlus size={20} />
                    <span>Register</span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                >
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-full text-center mt-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn size={20} />
                    <span>Login</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
