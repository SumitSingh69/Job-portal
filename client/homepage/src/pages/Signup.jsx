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



    const Login = () => {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleSubmit = (e) => {
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
        <div className="bg-white rounded-xl border-3 bg-[#E4E4E7] shadow-xl p-8 space-y-6">
            <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
            <p className="text-muted-foreground">Enter your credentials to create your account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="fullName">full name</Label>
                <Input
                id="userName"
                type="userName"
                placeholder="enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="userName">username</Label>
                <Input
                id="userName"
                type="userName"
                placeholder="set username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Create Password</Label>
                <div className="relative">
                <Input
                    id="password"
                    type={showPassword1 ? 'text' : 'password'}
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
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
                <Label htmlFor="password">Confirm Password</Label>
                <div className="relative">
                <Input
                    id="password"
                    type={showPassword2 ? 'text' : 'password'}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
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
            already have an account? <Link to="/login" className="text-blue-500">Sign In</Link>
            </div>
        </div>
        </motion.div>
    );
    };

    export default Login;