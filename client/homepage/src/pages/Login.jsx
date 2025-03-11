    // components/Login.jsx
    import { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Input } from "@/components/ui/input"
    import { Label } from "@/components/ui/label"
    import { Checkbox } from "@/components/ui/checkbox"
    import { Button } from "@/components/ui/button"
    import { Link } from "react-router-dom";
    import { Eye, EyeOff, Mail } from 'lucide-react';
    import { Github } from 'lucide-react';
    import { useEffect } from 'react';
    import api from "../api/api";
import { use } from 'react';



    const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    // const res = axios.get('products/1');
    // console.log(res.data);
    useEffect(() => {
      const temp = api.get('/job');
      console.log(temp);
    },[])
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
           ...prev,
            [name]: value,
        }));
    }
    const handleSubmit = (e) => {

        console.log(formData);
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-white from-primary to-primary-100 flex items-center justify-center p-4"
        >
        <div className="bg-white rounded-xl border-3 shadow-xl border-[#E4E4E7] p-8 space-y-6">
            <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                type="email"
                placeholder="enter email"
                value={formData.email}
                name="email"
                onChange={(e) => handleChange(e)}
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    name="password"
                    onChange={(e) => handleChange(e)}
                    
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </button>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
            </form>
            <div className="flex items-center justify-between">
            <span className="border-b w-full"></span>
            <span className="text-muted-foreground mx-2">or</span>
            <span className="border-b w-full"></span>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center justify-center">
                <Github className="mr-2" /> Github
            </Button>
            <Button variant="outline" className="flex items-center justify-center">
                <Mail className="mr-2" /> Google
            </Button>
            </div>
            <div className="text-center text-sm">
            Don't have an account? <Link to="/signup" className="text-blue-500">Sign In</Link>
            </div>
        </div>
        </motion.div>
    );
    };

    export default Login;