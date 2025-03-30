import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown,
  Building, 
  DollarSign, 
  MapPin, 
  Search, 
  Tag, 
  Briefcase,
  RotateCcw,
  CheckCircle2, 
  Filter,
  X,
  Plus
} from "lucide-react";

const JobFilters = ({ onFiltersChange, isOpen = true, onClose, initialAppliedFilter = "all" }) => {
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
    skills: [],
    appliedFilter: initialAppliedFilter 
  });
  
  // State for selected skills
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  
  // States for UI components
  const [expanded, setExpanded] = useState({
    application: true,
    location: true,
    company: true,
    salary: true,
    jobType: true,
    skills: true
  });
  
  // Track active filters count
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    // Update local state when initialAppliedFilter prop changes
    if (initialAppliedFilter) {
      setFilters(prevFilters => ({
        ...prevFilters,
        appliedFilter: initialAppliedFilter
      }));
    }
  }, [initialAppliedFilter]);
  
  useEffect(() => {
    // Calculate active filters
    let count = 0;
    if (filters.companyId) count++;
    if (filters.state) count++;
    if (filters.city) count++;
    if (filters.minSalary) count++;
    if (filters.maxSalary) count++;
    if (filters.remote) count++;
    if (filters.jobType) count++;
    if (filters.skills.length > 0) count++;
    if (filters.appliedFilter !== "all") count++;
    
    setActiveFilterCount(count);
  }, [filters]);
  
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
    const resetState = {
      companyId: "",
      state: "",
      city: "",
      minSalary: "",
      maxSalary: "",
      status: "",
      remote: false,
      fullTime: false,
      jobType: "",
      skills: [],
      appliedFilter: "all"
    };
    
    setFilters(resetState);
    setSelectedSkills([]);
    setSkillInput("");
    
    onFiltersChange(resetState);
  };
  
  // Toggle section expansion
  const toggleExpand = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Define animation variants
  const contentVariants = {
    hidden: { 
      height: 0, 
      opacity: 0, 
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      height: "auto", 
      opacity: 1, 
      transition: { 
        duration: 0.3,
        ease: "easeInOut" 
      }
    }
  };
  
  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };
  
  const FilterSection = ({ title, icon, section, children }) => (
    <div className="mb-6 border-b border-gray-100 pb-6 last:border-0">
      <div 
        className="flex justify-between items-center cursor-pointer py-2 px-1 rounded-lg hover:bg-gray-50 transition-colors mb-3"
        onClick={() => toggleExpand(section)}
      >
        <div className="flex items-center gap-3">
          {icon}
          <h4 className="font-medium text-gray-800">{title}</h4>
          {section === "application" && filters.appliedFilter !== "all" && (
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">Active</span>
          )}
          {section === "location" && (filters.city || filters.state || filters.remote) && (
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">Active</span>
          )}
          {section === "company" && filters.companyId && (
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">Active</span>
          )}
          {section === "salary" && (filters.minSalary || filters.maxSalary) && (
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">Active</span>
          )}
          {section === "jobType" && filters.jobType && (
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">Active</span>
          )}
          {section === "skills" && selectedSkills.length > 0 && (
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">{selectedSkills.length}</span>
          )}
        </div>
        <motion.div 
          variants={iconVariants}
          animate={expanded[section] ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </div>
      
      <AnimatePresence initial={false}>
        {expanded[section] && (
          <motion.div
            key={`section-${section}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 overflow-hidden">
      {/* Filter header with reset button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-indigo-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <button 
          onClick={resetFilters}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
          disabled={activeFilterCount === 0}
          style={{ opacity: activeFilterCount === 0 ? 0.5 : 1 }}
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Application Status Filter */}
      <FilterSection 
        title="Application Status" 
        icon={<CheckCircle2 className="w-5 h-5 text-indigo-600" />}
        section="application"
      >
        <div className="space-y-3 pl-1">
          <div className="flex items-center gap-3 text-gray-700">
            <input
              type="radio"
              id="applied-all"
              name="appliedFilter"
              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              checked={filters.appliedFilter === "all"}
              onChange={() => handleFilterChange("appliedFilter", "all")}
            />
            <label htmlFor="applied-all" className="text-sm cursor-pointer">All Jobs</label>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <input
              type="radio"
              id="applied-yes"
              name="appliedFilter"
              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              checked={filters.appliedFilter === "applied"}
              onChange={() => handleFilterChange("appliedFilter", "applied")}
            />
            <label htmlFor="applied-yes" className="text-sm cursor-pointer">Jobs I've Applied To</label>
          </div>
        </div>
      </FilterSection>
      
      {/* Location Filter */}
      <FilterSection 
        title="Location" 
        icon={<MapPin className="w-5 h-5 text-indigo-600" />}
        section="location"
      >
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1.5">City</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-gray-50"
            placeholder="Any city"
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1.5">State</label>
          <div className="relative">
            <select
              className="w-full p-2 appearance-none border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-gray-50 pr-8"
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
            >
              <option value="">Any state</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-gray-700">
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              id="remote"
              className="sr-only peer"
              checked={filters.remote}
              onChange={(e) => handleFilterChange("remote", e.target.checked)}
            />
            <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            <label htmlFor="remote" className="ml-3 text-sm cursor-pointer">Remote only</label>
          </div>
        </div>
      </FilterSection>
      
      {/* Company Filter */}
      <FilterSection 
        title="Company" 
        icon={<Building className="w-5 h-5 text-indigo-600" />}
        section="company"
      >
        <div className="mb-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-gray-50"
              placeholder="Search companies"
            />
          </div>
        </div>
        
        <div className="space-y-3 pl-1 max-h-48 overflow-y-auto custom-scrollbar">
          {companies.map((company) => (
            <div 
              key={company.id} 
              className="flex items-center gap-3 text-gray-700"
            >
              <input
                type="radio"
                id={`company-${company.id}`}
                name="company"
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                checked={filters.companyId === company.id}
                onChange={() => handleFilterChange("companyId", company.id)}
              />
              <label htmlFor={`company-${company.id}`} className="text-sm cursor-pointer">{company.name}</label>
            </div>
          ))}
        </div>
      </FilterSection>
      
      {/* Salary Filter */}
      <FilterSection 
        title="Salary Range" 
        icon={<DollarSign className="w-5 h-5 text-indigo-600" />}
        section="salary"
      >
        <div className="flex gap-4 mb-3">
          <div className="w-1/2">
            <label className="block text-sm text-gray-600 mb-1.5">Minimum ($)</label>
            <div className="relative">
              <select
                className="w-full p-2 appearance-none border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-gray-50 pr-8"
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
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-600 mb-1.5">Maximum ($)</label>
            <div className="relative">
              <select
                className="w-full p-2 appearance-none border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-gray-50 pr-8"
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
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div className="relative w-full h-1 bg-gray-200 rounded-full mt-6 mb-2">
          <div 
            className="absolute h-full bg-indigo-500 rounded-full" 
            style={{
              left: filters.minSalary ? `${(parseInt(filters.minSalary)/200000)*100}%` : "0%",
              right: filters.maxSalary ? `${100-(parseInt(filters.maxSalary)/200000)*100}%` : "0%",
              width: filters.minSalary || filters.maxSalary ? "auto" : "0%"
            }}
          ></div>
        </div>
      </FilterSection>
      
      {/* Job Type Filter */}
      <FilterSection 
        title="Job Type" 
        icon={<Briefcase className="w-5 h-5 text-indigo-600" />}
        section="jobType"
      >
        <div className="grid grid-cols-1 gap-3 pl-1">
          {jobTypes.map((type) => (
            <div 
              key={type} 
              className={`flex items-center gap-3 p-2 rounded-lg ${filters.jobType === type ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
            >
              <input
                type="radio"
                id={`type-${type}`}
                name="jobType"
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                checked={filters.jobType === type}
                onChange={() => handleFilterChange("jobType", type)}
              />
              <label htmlFor={`type-${type}`} className="text-sm cursor-pointer">{type}</label>
            </div>
          ))}
        </div>
      </FilterSection>
      
      {/* Skills Filter */}
      <FilterSection 
        title="Skills" 
        icon={<Tag className="w-5 h-5 text-indigo-600" />}
        section="skills"
      >
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              className="w-full p-2 pl-3 pr-16 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-gray-50"
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
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-md px-2 py-1 text-sm font-medium transition-colors"
              onClick={() => addSkill(skillInput)}
              disabled={!skillInput}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Selected skills */}
        <AnimatePresence>
          {selectedSkills.length > 0 && (
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="text-sm text-gray-600 mb-2">Selected Skills:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <motion.div 
                    key={skill} 
                    className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-xs flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {skill}
                    <button 
                      className="ml-1.5 hover:text-indigo-900"
                      onClick={() => removeSkill(skill)}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Popular skills */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Popular Skills:</p>
          <div className="flex flex-wrap gap-2">
            {popularSkills.map((skill) => (
              <div 
                key={skill} 
                className={`px-3 py-1.5 rounded-full text-xs cursor-pointer ${
                  selectedSkills.includes(skill) 
                    ? 'bg-indigo-200 text-indigo-800 font-medium' 
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
      </FilterSection>
      
      {/* Mobile Apply Button */}
      {onClose && (
        <div className="pt-4">
          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
            onClick={() => {
              onFiltersChange(filters);
              onClose();
            }}
          >
            <Filter className="w-4 h-4" />
            Apply Filters
            {activeFilterCount > 0 && (
              <span className="bg-white text-indigo-600 text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      )}
      
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  );
};

export default JobFilters;