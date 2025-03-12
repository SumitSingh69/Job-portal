import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Github } from 'lucide-react';
import api from "../api/api";
const Login = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password1: "",
        password2: "",
    });
    useEffect(() => {
        const temp = api.get('/job');
        console.log(temp);
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if(formData.password1 !== formData.password2) alert("passwords do not match");
        // Handle login logic here
    };

    return (
        <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
            style={{ backgroundImage: "url('/jobBg_cleanup.jpg')" }} // Ensure path is correct
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Form Container */}
            <div className="relative bg-white rounded-xl border-3 bg-[#E4E4E7] shadow-xl p-8 space-y-6">
                <div className="text-center space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
                    <p className="text-muted-foreground">Enter your credentials to create your account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            type="text"
                            name="fullName"
                            placeholder="Enter full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password1">Create Password</Label>
                        <div className="relative">
                            <Input
                                id="password1"
                                type={showPassword1 ? 'text' : 'password'}
                                name="password1"
                                placeholder="Create password"
                                value={formData.password1}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword1(!showPassword1)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword1 ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password2">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="password2"
                                type={showPassword2 ? 'text' : 'password'}
                                name="password2"
                                placeholder="Confirm password"
                                value={formData.password2}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword2(!showPassword2)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword2 ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-start gap-4">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">I accept the Terms and Conditions</Label>
                    </div>
                    <Button type="submit" className="w-full">Sign up</Button>
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
                    Already have an account? <Link to="/login" className="text-blue-500">Sign In</Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
