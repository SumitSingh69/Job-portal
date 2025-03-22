import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  X, 
  Sliders, 
  Building, 
  DollarSign, 
  MapPin, 
  Search, 
  ToggleRight, 
  Tag, 
  Briefcase,
  RefreshCw
} from "lucide-react";

const JobFilters = ({ onFiltersChange, isOpen = true, onClose }) => {
  // Initial state for all filters
  const [filters, setFilters] = useState({
    companyId: "",
    state: "",
    city: "",
    minSalary: "",
    maxSalary: "",
    status: "",
    remote: false,
    fullTime: false,
    jobType: "",
    skills: []
  });
  
  // State for selected skills
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  
  // States for UI components
  const [expanded, setExpanded] = useState({
    location: true,
    company: true,
    salary: true,
    jobType: true,
    skills: true
  });
  
  // Available filter options
  const companies = [
    { id: "company1", name: "Design Magic" },
    { id: "company2", name: "Tech Innovate" },
    { id: "company3", name: "Creative Solutions" },
    { id: "company4", name: "Digital Crafters" },
    { id: "company5", name: "WebSolutions" }
  ];
  
  const states = ["CA", "NY", "WA", "IL", "MA", "Remote"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
  const popularSkills = ["UI Design", "UX Design", "Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Interaction Design", "Visual Design"];
  
  // Handle filter change and propagate to parent
  const handleFilterChange = (name, value) => {
    const updatedFilters = {
      ...filters,
      [name]: value
    };
    
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };
  
  // Handle skill addition
  const addSkill = (skill) => {
    if (skill && !selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      handleFilterChange("skills", newSkills);
      setSkillInput("");
    }
  };
  
  // Handle skill removal
  const removeSkill = (skillToRemove) => {
    const newSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    setSelectedSkills(newSkills);
    handleFilterChange("skills", newSkills);
  };
  
  // Handle reset all filters
  const resetFilters = () => {
    setFilters({
      companyId: "",
      state: "",
      city: "",
      minSalary: "",
      maxSalary: "",
      status: "",
      remote: false,
      fullTime: false,
      jobType: "",
      skills: []
    });
    
    setSelectedSkills([]);
    setSkillInput("");
    
    onFiltersChange({});
  };
  
  // Toggle section expansion
  const toggleExpand = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };
  
  // Define animation variants
  const contentVariants = {
    hidden: { height: 0, opacity: 0, overflow: "hidden" },
    visible: { height: "auto", opacity: 1, overflow: "visible" }
  };

  return (
    <div className="p-4">
      {/* Filter header with reset button */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-gray-900">Filter Jobs</h3>
        <button 
          onClick={resetFilters}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Reset
        </button>
      </div>
      
      {/* Location Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => toggleExpand("location")}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <h4 className="font-medium text-gray-800">Location</h4>
          </div>
          <motion.div 
            animate={{ rotate: expanded.location ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-4 h-4 text-gray-500 transform rotate-45" />
          </motion.div>
        </div>
        
        <motion.div
          variants={contentVariants}
          initial={expanded.location ? "visible" : "hidden"}
          animate={expanded.location ? "visible" : "hidden"}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1.5">City</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              placeholder="Any city"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1.5">State</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
            >
              <option value="">Any state</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              id="remote"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              checked={filters.remote}
              onChange={(e) => handleFilterChange("remote", e.target.checked)}
            />
            <label htmlFor="remote" className="text-sm">Remote only</label>
          </div>
        </motion.div>
      </div>
      
      {/* Company Filter */}
      <div className="mb-6 border-t border-gray-100 pt-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => toggleExpand("company")}
        >
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-600" />
            <h4 className="font-medium text-gray-800">Company</h4>
          </div>
          <motion.div 
            animate={{ rotate: expanded.company ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-4 h-4 text-gray-500 transform rotate-45" />
          </motion.div>
        </div>
        
        <motion.div
          variants={contentVariants}
          initial={expanded.company ? "visible" : "hidden"}
          animate={expanded.company ? "visible" : "hidden"}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="Search companies"
              />
            </div>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {companies.map((company) => (
              <div key={company.id} className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  id={`company-${company.id}`}
                  name="company"
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  checked={filters.companyId === company.id}
                  onChange={() => handleFilterChange("companyId", company.id)}
                />
                <label htmlFor={`company-${company.id}`} className="text-sm">{company.name}</label>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Salary Filter */}
      <div className="mb-6 border-t border-gray-100 pt-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => toggleExpand("salary")}
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-indigo-600" />
            <h4 className="font-medium text-gray-800">Salary Range</h4>
          </div>
          <motion.div 
            animate={{ rotate: expanded.salary ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-4 h-4 text-gray-500 transform rotate-45" />
          </motion.div>
        </div>
        
        <motion.div
          variants={contentVariants}
          initial={expanded.salary ? "visible" : "hidden"}
          animate={expanded.salary ? "visible" : "hidden"}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-4 mb-3">
            <div className="w-1/2">
              <label className="block text-sm text-gray-600 mb-1.5">Minimum ($)</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                value={filters.minSalary}
                onChange={(e) => handleFilterChange("minSalary", e.target.value)}
              >
                <option value="">No min</option>
                <option value="50000">$50k</option>
                <option value="75000">$75k</option>
                <option value="100000">$100k</option>
                <option value="125000">$125k</option>
                <option value="150000">$150k</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-600 mb-1.5">Maximum ($)</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                value={filters.maxSalary}
                onChange={(e) => handleFilterChange("maxSalary", e.target.value)}
              >
                <option value="">No max</option>
                <option value="75000">$75k</option>
                <option value="100000">$100k</option>
                <option value="125000">$125k</option>
                <option value="150000">$150k</option>
                <option value="200000">$200k</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Job Type Filter */}
      <div className="mb-6 border-t border-gray-100 pt-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => toggleExpand("jobType")}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <h4 className="font-medium text-gray-800">Job Type</h4>
          </div>
          <motion.div 
            animate={{ rotate: expanded.jobType ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-4 h-4 text-gray-500 transform rotate-45" />
          </motion.div>
        </div>
        
        <motion.div
          variants={contentVariants}
          initial={expanded.jobType ? "visible" : "hidden"}
          animate={expanded.jobType ? "visible" : "hidden"}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  id={`type-${type}`}
                  name="jobType"
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  checked={filters.jobType === type}
                  onChange={() => handleFilterChange("jobType", type)}
                />
                <label htmlFor={`type-${type}`} className="text-sm">{type}</label>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Skills Filter */}
      <div className="mb-6 border-t border-gray-100 pt-6">
        <div 
          className="flex justify-between items-center cursor-pointer mb-3"
          onClick={() => toggleExpand("skills")}
        >
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-600" />
            <h4 className="font-medium text-gray-800">Skills</h4>
          </div>
          <motion.div 
            animate={{ rotate: expanded.skills ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-4 h-4 text-gray-500 transform rotate-45" />
          </motion.div>
        </div>
        
        <motion.div
          variants={contentVariants}
          initial={expanded.skills ? "visible" : "hidden"}
          animate={expanded.skills ? "visible" : "hidden"}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                placeholder="Add a skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-800"
                onClick={() => addSkill(skillInput)}
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Selected skills */}
          {selectedSkills.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Selected Skills:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <div 
                    key={skill} 
                    className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs flex items-center"
                  >
                    {skill}
                    <button 
                      className="ml-1.5 hover:text-indigo-900"
                      onClick={() => removeSkill(skill)}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Popular skills */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Popular Skills:</p>
            <div className="flex flex-wrap gap-2">
              {popularSkills.map((skill) => (
                <div 
                  key={skill} 
                  className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                    selectedSkills.includes(skill) 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    if (selectedSkills.includes(skill)) {
                      removeSkill(skill);
                    } else {
                      addSkill(skill);
                    }
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Mobile Apply Button */}
      {onClose && (
        <div className="pt-4 border-t border-gray-100">
          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => {
              onFiltersChange(filters);
              onClose();
            }}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default JobFilters;