import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Github, UserCircle, Phone, Lock, CheckCircle } from "lucide-react";
import toast from "@/components/custom/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext } from "@/context/authContext";

const Signup = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    phonenumber: "",
    password1: "",
    password2: "",
  });
  const { signup } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password1 !== formData.password2) {
      toast.error("Passwords do not match");
      return;
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: formData.role,
      phonenumber: formData.phonenumber,
      password: formData.password1,
    };

    const toastId = toast.loading("Signing up...");
    try {
      await signup(userData);      
      toast.update(toastId, {
        render: "Signup successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/login");
      
    } catch (error) {
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/jobBg_cleanup.jpg')" }}
    >
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-sm"></div>

      {/* Form Container */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2
        }}
        className="relative w-full max-w-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-2xl p-8"
      >
        <motion.div 
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-500 rounded-full p-4 shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <UserCircle className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div 
          className="text-center space-y-2 mb-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Welcome</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Enter your credentials to create your account
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* First column */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-zinc-300 focus:border-blue-500 focus:ring-blue-500 pl-10"
                  />
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-zinc-300 focus:border-blue-500 focus:ring-blue-500 pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phonenumber" className="text-sm font-medium">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="phonenumber"
                    type="tel"
                    name="phonenumber"
                    placeholder="Enter phone number"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-zinc-300 focus:border-blue-500 focus:ring-blue-500 pl-10"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password1" className="text-sm font-medium">Create Password</Label>
                <div className="relative">
                  <Input
                    id="password1"
                    type={showPassword1 ? "text" : "password"}
                    name="password1"
                    placeholder="Create password"
                    value={formData.password1}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-zinc-300 focus:border-blue-500 focus:ring-blue-500 pl-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <button
                    type="button"
                    onClick={() => setShowPassword1(!showPassword1)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                  >
                    {showPassword1 ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Second column */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-zinc-300 focus:border-blue-500 focus:ring-blue-500 pl-10"
                  />
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  required
                >
                  <SelectTrigger className="rounded-lg border-zinc-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jobseeker">Job Seeker</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password2" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="password2"
                    type={showPassword2 ? "text" : "password"}
                    name="password2"
                    placeholder="Confirm password"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-zinc-300 focus:border-blue-500 focus:ring-blue-500 pl-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <button
                    type="button"
                    onClick={() => setShowPassword2(!showPassword2)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                  >
                    {showPassword2 ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-start gap-2 mt-6">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I accept the <Link to="/terms" className="text-blue-500 hover:underline">Terms and Conditions</Link>
                </Label>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <CheckCircle className="w-4 h-4" />
              Sign up
            </motion.button>
          </motion.div>
        </motion.form>

        <motion.div 
          className="flex items-center justify-between my-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <span className="border-b w-full border-zinc-300 dark:border-zinc-700"></span>
          <span className="text-zinc-500 dark:text-zinc-400 mx-4 text-sm">or</span>
          <span className="border-b w-full border-zinc-300 dark:border-zinc-700"></span>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          <motion.button
            type="button"
            className="flex items-center justify-center gap-2 bg-zinc-800 text-white py-2.5 px-4 rounded-lg hover:bg-zinc-700 transition duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Github className="w-4 h-4" /> Github
          </motion.button>
          <motion.button
            type="button"
            className="flex items-center justify-center gap-2 bg-white text-zinc-800 border border-zinc-300 py-2.5 px-4 rounded-lg hover:bg-zinc-50 transition duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Mail className="w-4 h-4 text-red-500" /> Google
          </motion.button>
        </motion.div>

        <motion.div 
          className="text-center text-sm mt-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
