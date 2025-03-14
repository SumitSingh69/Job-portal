import React, { useContext } from "react";
import About from "./About";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  User,
  LogOut,
  Bell,
} from "lucide-react";
import { AuthContext } from "@/context/authContext";
import useAxios from "@/hooks/useAxios";
import toast from "@/components/custom/toast";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const location = useLocation();
  const {user, logout} = useContext(AuthContext);
  const axios = useAxios();

  const logoutUser = async () => {
    try {
      const response = await axios.post("/user/logout");
      return response.data;
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      throw error;
    }
  };

  const navigate = useNavigate();
  
  const isLoggedIn = !!user?.id;
  console.log(user)
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

  const profileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  const linkVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const handleLogout = async () => {

    const response = await logoutUser();
    if(response.success){
      toast.success(response.message);
      await logout();
      navigate("/login");
    }
    setIsProfileOpen(false);
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
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  {/* Notifications */}
                  {user.role === 'jobseeker' ? "hello" : null}
                  
                  {/* User Profile Dropdown */}
                  <div className="relative">
                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      variants={linkVariants}
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-full"
                    >
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                        {user.firstName.charAt(0).toUpperCase()}
                        {user.lastName.charAt(0).toUpperCase()}
                      </div>
                      <span>{user.firstName}</span>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={profileMenuVariants}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                        >
                          <div className="px-4 py-3 border-b">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Role: <span className="capitalize">{user.role}</span>
                            </p>
                          </div>
                          <Link 
                            to="/profile" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <div className="flex items-center space-x-2">
                              <User size={16} />
                              <span>My Profile</span>
                            </div>
                          </Link>
                          <Link 
                            to="/applications" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <div className="flex items-center space-x-2">
                              <Briefcase size={16} />
                              <span>My Applications</span>
                            </div>
                          </Link>
                          <button 
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={handleLogout}
                          >
                            <div className="flex items-center space-x-2">
                              <LogOut size={16} />
                              <span>Logout</span>
                            </div>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}
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

                {isLoggedIn ? (
                  <>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex items-center space-x-2 px-3 py-2">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                          {user.firstName.charAt(0).toUpperCase()}
                          {user.lastName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      
                      <motion.div
                        whileHover="hover"
                        whileTap="tap"
                        variants={linkVariants}
                      >
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User size={20} />
                          <span>My Profile</span>
                        </Link>
                      </motion.div>
                      
                      <motion.div
                        whileHover="hover"
                        whileTap="tap"
                        variants={linkVariants}
                      >
                        <Link
                          to="/applications"
                          className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Briefcase size={20} />
                          <span>My Applications</span>
                        </Link>
                      </motion.div>
                      
                      <motion.button
                        whileHover="hover"
                        whileTap="tap"
                        variants={linkVariants}
                        className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-gray-50 rounded-md w-full text-left"
                        onClick={handleLogout}
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;