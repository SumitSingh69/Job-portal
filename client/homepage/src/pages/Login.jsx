import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Logo from "../assets/logo.jpg";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-sky-900 via-sky-600 to-sky-300 flex items-center justify-center">
      
      <div className="absolute w-32 h-32 rounded-full bg-white/10 -top-10 -right-10"></div>
      <div className="absolute w-32 h-32 rounded-full bg-white/10 -top-10 -left-10"></div>
      <div className="absolute w-24 h-24 rounded-full bg-white/10 bottom-10 -left-10"></div>
      <div className="absolute w-16 h-16 rounded-full bg-white/10 top-1/2 right-10"></div>
      <div className="absolute w-16 h-16 rounded-full bg-white/10 top-1/5 left-28"></div>
      <div className="absolute w-16 h-16 rounded-full bg-white/10 top-1/4 right-24"></div>

      <div className="flex flex-col sm:flex-row max-w-4xl w-full mx-4 sm:mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-sky-300 w-full sm:w-2/5 p-8 flex flex-col items-center justify-center text-white">
          <div className="mb-8">
            <img
              src={Logo}
              alt="Company Logo"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">New Here?</h2>
            <p className="mb-6 text-sm">
              Create an account and start your journey with us
            </p>
            <button className="border-2 border-white px-8 py-2 rounded-full hover:bg-white/10 transition-colors">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="w-full sm:w-3/5 p-8 bg-white">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Welcome Back
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className={`w-full px-4 py-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500`}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-sky-600 hover:text-sky-800"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-16 w-full rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold"
                >
                  <div className="absolute right-32 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                  <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
                  <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150 duration-500 bg-sky-700"></div>
                  <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-500 bg-sky-600"></div>
                  <p className="z-10">Login</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
