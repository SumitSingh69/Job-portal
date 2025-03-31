import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Heart, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Star, 
  ArrowRight,
  CheckCircle,
  Award
} from "lucide-react";

const JobCard = ({ job, featured = false }) => {
  const getCompanyLogo = (job) => {
    if (job.companyId && job.companyId.logo) return job.companyId.logo;
    return "/api/placeholder/48/48";
  };

  const getCompanyName = (job) => {
    if (job.companyId && job.companyId.name) return job.companyId.name;
    return "Unknown Company";
  };

  const formatSalary = (salary) => {
    return `$${Math.round(salary / 1000)}k`;
  };

  const calculateDaysAgo = (postedDate) => {
    const now = new Date();
    const posted = new Date(postedDate);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  // Get a color for the skill tag based on the skill name
  const getSkillColor = (skill) => {
    const colors = [
      "bg-blue-50 text-blue-700 border-blue-100",
      "bg-green-50 text-green-700 border-green-100",
      "bg-purple-50 text-purple-700 border-purple-100",
      "bg-amber-50 text-amber-700 border-amber-100",
      "bg-rose-50 text-rose-700 border-rose-100",
    ];
    
    // Simple hash function to get consistent colors for the same skill
    const hash = skill.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Determine job type icon and text
  const getJobTypeInfo = (job) => {
    // This is a placeholder, in a real app you'd use job.type or similar
    if (job.remote) {
      return { 
        icon: <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />,
        text: "Remote",
        className: "text-green-600"
      };
    }
    
    return {
      icon: <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />,
      text: "Full-time",
      className: "text-gray-600"
    };
  };

  const jobTypeInfo = getJobTypeInfo(job);

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col ${featured ? 'border-2 border-indigo-500' : ''}`}>
      {featured && (
        <div className="bg-indigo-500 py-1 px-3 text-white text-xs font-medium flex items-center justify-center gap-1">
          <Award className="w-3 h-3" />
          <span>Featured Opportunity</span>
        </div>
      )}
      
      <Link
        to={`/jobDetails/${job._id}`}
        className="block flex-grow p-5 flex flex-col h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-3">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="rounded-lg w-12 h-12 flex-shrink-0 bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-200"
            >
              <img
                src={getCompanyLogo(job)}
                alt={getCompanyName(job)}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 hover:text-indigo-600 line-clamp-2 transition-colors duration-200">
                {job.title}
              </h3>
              <div className="text-gray-500 mt-1 flex items-center">
                {getCompanyName(job)}
                {job.verified && (
                  <span className="ml-2 text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">Verified</span>
                )}
              </div>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <Heart className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-2 mt-2 mb-3">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">
              {job.location?.city || 'Remote'}, {job.location?.state || ''}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>
              {formatSalary(job.min_salary)} - {formatSalary(job.max_salary)} <span className="text-gray-400 text-sm">/year</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            {jobTypeInfo.icon}
            <span className={jobTypeInfo.className}>{jobTypeInfo.text}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-500">{calculateDaysAgo(job.postedDate)}</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills && job.skills.slice(0, 3).map((skill, index) => (
              <motion.span
                key={index}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getSkillColor(skill)}`}
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">(48)</span>
            </div>
            <motion.div 
              className="flex items-center text-indigo-600 font-medium text-sm"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </motion.div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;