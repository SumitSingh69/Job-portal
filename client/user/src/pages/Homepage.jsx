import React, { useEffect, useState } from "react";
import {
Search,
MapPin,
Briefcase,
DollarSign,
Star,
ArrowRight,
Computer,
TrendingUp,
Target,
Clock,
Building2,
Gem,
Sparkles,
Filter,
ChevronRight,
} from "lucide-react";

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import toast from "@/components/custom/toast";

const JobCategoriesSection = () => {
const [selectedCategory, setSelectedCategory] = useState("IT Jobs");
const { user } = useContext(AuthContext);

useEffect(() => {
if (user) {
toast.success("Welcome " + user.firstName);
setTimeout(() => {
toast.info("Please Visit your Profile to update your details");
}, 3000);
}
}, [user]);

console.log(user);

const categories = {
"IT Jobs": {
icon: <Computer className="text-blue-500" size={24} />,
colorClass: "blue",
stats: {
openings: "15,234",
avgSalary: "₹12-30 LPA",
growth: "+25%",
},
trending: ["Cloud Computing", "Machine Learning", "DevOps", "Blockchain"],
},
Sales: {
icon: <TrendingUp className="text-green-500" size={24} />,
colorClass: "green",
stats: {
openings: "12,789",
avgSalary: "₹6-40 LPA",
growth: "+20%",
},
trending: [
"Account Management",
"Business Development",
"Inside Sales",
"Sales Operations",
],
},
Marketing: {
icon: <Target className="text-purple-500" size={24} />,
colorClass: "purple",
stats: {
openings: "9,567",
avgSalary: "₹8-28 LPA",
growth: "+18%",
},
trending: [
"Digital Marketing",
"Content Strategy",
"Brand Management",
"Social Media",
],
},
};

return (
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="bg-gradient-to-b from-gray-50 to-white py-16"
>
<div className="max-w-7xl mx-auto px-4">
<div className="text-center mb-12">
<h2 className="text-3xl font-bold text-gray-900">
Explore Job Categories
</h2>
<p className="text-gray-600 mt-2">
Discover opportunities across different sectors
</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{Object.entries(categories).map(([name, data]) => (
<div
key={name}
className={`bg-white rounded-xl shadow-lg overflow-hidden border-t-4 ${
name === selectedCategory
? `border-${data.colorClass}-500`
: "border-transparent"
} cursor-pointer transform transition-transform hover:-translate-y-1`}
onClick={() => setSelectedCategory(name)}
>
<div className="p-6">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center space-x-3">
<div className={`p-3 rounded-lg bg-${data.colorClass}-50`}>
{data.icon}
</div>
<h3 className="text-xl font-bold text-gray-900">{name}</h3>
</div>
<span className={`text-${data.colorClass}-500 font-semibold`}>
{data.stats.growth}
</span>
</div>

<div className="grid grid-cols-2 gap-4 mb-6">
<div className="bg-gray-50 rounded-lg p-4">
<div className="text-sm text-gray-600">Open Positions</div>
<div className="text-xl font-bold text-gray-900">
{data.stats.openings}
</div>
</div>
<div className="bg-gray-50 rounded-lg p-4">
<div className="text-sm text-gray-600">Avg. Salary</div>
<div className="text-xl font-bold text-gray-900">
{data.stats.avgSalary}
</div>
</div>
</div>

<div className="mb-6">
<div className="text-sm font-medium text-gray-700 mb-3">
Trending Skills
</div>
<div className="flex flex-wrap gap-2">
{data.trending.map((skill) => (
<span
key={skill}
className={`bg-${data.colorClass}-50 text-${data.colorClass}-700 px-3 py-1 rounded-full text-sm`}
>
{skill}
</span>
))}
</div>
</div>
</div>
</div>
))}
</div>
</div>
</motion.div>
);
};

const Homepage = () => {
const [showFilters, setShowFilters] = useState(false);
const [selectedFilters, setSelectedFilters] = useState({
jobType: [],
salary: "",
experience: "",
});

const featuredJobs = [
{
title: "Senior Software Engineer",
company: "Tech Solutions Inc",
logo: "https://cdn.logojoy.com/wp-content/uploads/2018/05/30162618/1533-768x591.png",
location: "Bangalore",
experience: "5-8 years",
salary: "₹25-35 LPA",
skills: ["Java", "Spring Boot", "React", "AWS"],
type: "Full-time",
postedDays: 4,
isHot: true,
isRemote: true,
},
{
title: "Product Manager",
company: "Google Inc",
logo: "https://t3.ftcdn.net/jpg/03/88/07/84/360_F_388078454_mKtbdXYF9cyQovCCTsjqI0gbfu7gCcSp.jpg",
location: "Mumbai",
experience: "4-7 years",
salary: "₹20-30 LPA",
skills: ["Product Management", "Agile", "Analytics", "User Research"],
type: "Full-time",
postedDays: 1,
isHot: true,
isRemote: false,
},
{
title: "Frontend Developer",
company: "Myntra",
logo: "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202101/myntra_logo_660_300121011207.jpg?size=948:533",
location: "Hyderabad",
experience: "3-5 years",
salary: "₹18-28 LPA",
skills: ["React", "JavaScript", "TypeScript", "Next.js"],
type: "Remote",
postedDays: 3,
isHot: false,
isRemote: true,
},
];

const companyStats = {
Google: {
overview: "Leading technology company focused on AI and cloud computing",
benefits: ["Health Insurance", "Stock Options", "Flexible Hours"],
logo: "https://t3.ftcdn.net/jpg/03/88/07/84/360_F_388078454_mKtbdXYF9cyQovCCTsjqI0gbfu7gCcSp.jpg",
rating: 4.5,
reviews: "15.2K",
posted: 3,
topRoles: ["Software Engineer", "Product Manager", "Data Scientist"],
locations: ["Bangalore", "Hyderabad", "Mumbai"],
},
Microsoft: {
overview: "Global leader in software and cloud solutions",
benefits: ["Health Benefits", "RSUs", "Remote Work"],
logo: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/RWCZER-Legal-IP-Trademarks-CP-MS-logo-740x417-1?wid=406&hei=230&fit=crop",
rating: 4.3,
reviews: "12.8K",
posted: 2,
topRoles: ["Cloud Architect", "Program Manager", "Software Developer"],
locations: ["Bangalore", "Hyderabad", "Noida"],
},
};

return (
<div className="min-h-screen bg-gray-50">
<div className="relative min-h-[600px] bg-[url('/src/assets/hero.jpg')] bg-cover bg-center">
<div className="absolute inset-0">
<div className="absolute inset-0 bg-gradient-to-br from-black to-white/20" />

<div
className="absolute inset-0 bg-black/20"
style={{
backgroundImage:
"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
backgroundSize: "40px 40px",
}}
/>

<motion.div
animate={{
y: [0, -20, 0],
opacity: [0.3, 0.5, 0.3],
}}
transition={{
duration: 5,
repeat: Infinity,
ease: "easeInOut",
}}
className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"
/>
<motion.div
animate={{
y: [0, 20, 0],
opacity: [0.2, 0.4, 0.2],
}}
transition={{
duration: 6,
repeat: Infinity,
ease: "easeInOut",
}}
className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-400 rounded-full opacity-10 blur-3xl"
/>
</div>

<div className="relative max-w-7xl mx-auto px-4 py-16">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="text-center mb-12"
>
<div className="inline-flex items-center bg-blue-800/40 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
<Sparkles className="text-yellow-400 mr-2" size={16} />
<span className="text-blue-100">Over 50,000 jobs available</span>
</div>
<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
Find Your{" "}
<motion.span
initial={{ backgroundPosition: "0 0" }}
animate={{ backgroundPosition: "200% 0" }}
transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-[length:200%_100%]"
>
Dream Job
</motion.span>{" "}
Today
</h1>
<p className="text-xl text-blue-100 max-w-2xl mx-auto">
Connect with top employers and take the next step in your career
journey
</p>
</motion.div>

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.2 }}
className="max-w-4xl mx-auto"
>
<div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20">
<div className="flex flex-col md:flex-row gap-4 mb-4">
<div className="flex-1 relative">
<Search
className="absolute left-3 top-3.5 text-gray-400"
size={20}
/>
<input
type="text"
placeholder="Job title, skills, or company"
className="w-full pl-10 p-3 bg-white/80 backdrop-blur-sm border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
</div>
<div className="flex-1 relative">
<MapPin
className="absolute left-3 top-3.5 text-gray-400"
size={20}
/>
<input
type="text"
placeholder="Location"
className="w-full pl-10 p-3 bg-white/80 backdrop-blur-sm border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
</div>
<button
onClick={() => setShowFilters(!showFilters)}
className="md:w-auto w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
>
<Filter size={20} className="text-gray-600" />
<span className="text-gray-600">Filters</span>
</button>
<motion.button
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
>
<Search size={20} />
<span>Search Jobs</span>
</motion.button>
</div>
</div>
</motion.div>
</div>
</div>

<JobCategoriesSection />

<div className="max-w-7xl mx-auto px-4 py-12">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="flex justify-between items-center mb-8"
>
<div>
<h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
<p className="text-gray-600 mt-2">
Handpicked opportunities for you
</p>
</div>
<button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
View All Jobs <ChevronRight size={20} />
</button>
</motion.div>

<div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
className="grid grid-cols-1 lg:grid-cols-3 gap-6"
>
{featuredJobs.map((job, index) => (
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
key={index}
className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
>
<div className="p-6 flex flex-col flex-grow">
{/* Header Section */}
<div className="flex items-start justify-between mb-4">
<div className="flex gap-4">
<img
src={job.logo}
alt={`${job.company} logo`}
className="w-12 h-12 rounded-lg object-contain"
/>
<div>
<h3 className="font-semibold text-lg text-gray-900">
{job.title}
</h3>
<p className="text-blue-600 font-medium">{job.company}</p>
</div>
</div>
<button className="text-gray-400 hover:text-yellow-400">
<Star size={20} />
</button>
</div>

{/* Job Tags */}
<div className="flex flex-wrap gap-2 mb-4">
{job.isHot && (
<span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
Hot 🔥
</span>
)}
{job.isRemote && (
<span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
Remote
</span>
)}
<span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
{job.type}
</span>
</div>

{/* Job Details */}
<div className="space-y-3 mb-4 flex-grow">
<div className="flex items-center text-gray-600">
<MapPin className="mr-2 text-blue-500" size={18} />
<span>{job.location}</span>
</div>
<div className="flex items-center text-gray-600">
<Briefcase className="mr-2 text-blue-500" size={18} />
<span>{job.experience}</span>
</div>
<div className="flex items-center text-gray-600">
<DollarSign className="mr-2 text-blue-500" size={18} />
<span>{job.salary}</span>
</div>
</div>

{/* Skills */}
<div className="flex flex-wrap gap-2 mb-4">
{job.skills.map((skill) => (
<span
key={skill}
className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm"
>
{skill}
</span>
))}
</div>

{/* Footer (Stays at the bottom) */}
<div className="flex items-center justify-between pt-4 border-t border-gray-100">
<div className="flex items-center text-gray-500 text-sm">
<Clock size={16} className="mr-1" />
Posted {job.postedDays} days ago
</div>
<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
Apply Now
<ArrowRight size={16} />
</button>
</div>
</div>
</motion.div>

))}
</div>

<div className="py-16 bg-white">
<div className="max-w-7xl mx-auto px-4">
<div className="flex justify-between items-center mb-12">
<div>
<h2 className="text-3xl font-bold text-gray-900">
Top Companies Hiring
</h2>
<p className="text-gray-600 mt-2">
Join industry leaders and shape the future
</p>
</div>
<button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
<span>View All Companies</span>
<ArrowRight size={16} />
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{Object.entries(companyStats).map(([company, stats]) => (
<div
key={company}
className="bg-white rounded-2xl border border-gray-200 hover:border-blue-200 transition-all duration-300 p-6"
>
<div className="flex items-start justify-between mb-6">
<div className="flex items-center gap-4">
<div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center">
<img
src={`${stats.logo}`}
alt={`${company} logo`}
className="w-12 h-12 object-contain"
/>
</div>
<div>
<h3 className="text-xl font-semibold text-gray-900">
{company}
</h3>
<div className="flex items-center gap-2 mt-1">
<div className="flex items-center text-yellow-400">
<Star size={16} fill="currentColor" />
<span className="ml-1 text-gray-700">
{stats.rating}
</span>
</div>
<span className="text-gray-500">•</span>
<span className="text-gray-600 text-sm">
{stats.reviews} reviews
</span>
</div>
</div>
</div>
</div>

<p className="text-gray-600 mb-6">{stats.overview}</p>

<div className="space-y-4">
<div>
<h4 className="text-sm font-medium text-gray-700 mb-2">
Top Roles
</h4>
<div className="flex flex-wrap gap-2">
{stats.topRoles.map((role, i) => (
<span
key={i}
className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
>
{role}
</span>
))}
</div>
</div>

<div>
<h4 className="text-sm font-medium text-gray-700 mb-2">
Key Benefits
</h4>
<div className="flex flex-wrap gap-2">
{stats.benefits.map((benefit, i) => (
<span
key={i}
className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
>
{benefit}
</span>
))}
</div>
</div>

<div>
<h4 className="text-sm font-medium text-gray-700 mb-2">
Locations
</h4>
<div className="flex items-center gap-2 text-gray-600">
<MapPin size={16} />
<span className="text-sm">
{stats.locations.join(" • ")}
</span>
</div>
</div>
</div>
</div>
))}
</div>
</div>
</div>

<div className="relative py-20 bg-blue-600 overflow-hidden">
<div className="absolute inset-0">
<div
className="absolute inset-0"
style={{
backgroundImage:
"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
backgroundSize: "40px 40px",
}}
/>
</div>

<div className="relative max-w-7xl mx-auto px-4">
<div className="max-w-2xl mx-auto text-center mb-12">
<div className="inline-flex items-center bg-blue-500 bg-opacity-20 rounded-full px-4 py-2 mb-6">
<Search className="text-blue-100 mr-2" size={16} />
<span className="text-blue-100">Never miss an opportunity</span>
</div>
<h2 className="text-4xl font-bold text-white mb-4">
Get Personalized Job Alerts
</h2>
<p className="text-blue-100 text-lg">
Be the first to know about latest opportunities matching your
preferences
</p>
</div>

<div className="max-w-xl mx-auto">
<div className="bg-white p-1 rounded-xl shadow-lg">
<div className="flex flex-col sm:flex-row gap-2">
<input
type="email"
placeholder="Enter your email address"
className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
<button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
Subscribe Now
<ArrowRight size={16} />
</button>
</div>
</div>
<p className="text-blue-100 text-sm text-center mt-4">
Join 2M+ job seekers receiving weekly updates
</p>
</div>
</div>
</div>
</div>
</div>
);
};

export default Homepage;  