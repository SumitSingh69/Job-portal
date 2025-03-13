import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Github } from "lucide-react";
import toast from "@/components/custom/toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Logging in...");

    try {
      const response = await login(formData.email, formData.password);
      if (response.success) {
        toast.update(toastId, {
          render: "Logged in successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        navigate("/");
      } else {
        toast.update(toastId, {
          render: response.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Show error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/jobBg_cleanup.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Login Form */}
      <div className="bg-white rounded-xl border-3 shadow-xl border-[#E4E4E7] p-8 space-y-6 relative z-10 w-full max-w-md">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Link to="/forgot-password" className="text-blue-500 text-sm">
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-between">
          <span className="border-b w-full"></span>
          <span className="text-muted-foreground mx-2">or</span>
          <span className="border-b w-full"></span>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex items-center justify-center"
          >
            <Github className="mr-2" /> Github
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center"
          >
            <Mail className="mr-2" /> Google
          </Button>
        </div>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
