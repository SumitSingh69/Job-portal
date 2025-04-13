import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

const JobFilters = ({ onFiltersChange, initialAppliedFilter = "all", isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [remote, setRemote] = useState(false);
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [appliedFilter, setAppliedFilter] = useState(initialAppliedFilter);

  // Read from URL params on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Set initial values from URL params if they exist
    if (urlParams.has("title")) setTitle(urlParams.get("title"));
    if (urlParams.has("city")) setCity(urlParams.get("city"));
    if (urlParams.has("state")) setState(urlParams.get("state"));
    if (urlParams.has("country")) setCountry(urlParams.get("country"));
    if (urlParams.has("companyId")) setCompanyId(urlParams.get("companyId"));
    if (urlParams.has("minSalary")) setMinSalary(urlParams.get("minSalary"));
    if (urlParams.has("maxSalary")) setMaxSalary(urlParams.get("maxSalary"));
    if (urlParams.has("jobType")) setJobType(urlParams.get("jobType"));
    if (urlParams.has("remote")) setRemote(urlParams.get("remote") === "true");
    if (urlParams.has("skills")) {
      const skillsList = urlParams.get("skills").split(",");
      setSkills(skillsList.filter(skill => skill.trim() !== ""));
    }
  }, []);

  // Update applied filter when initialAppliedFilter prop changes
  useEffect(() => {
    setAppliedFilter(initialAppliedFilter);
  }, [initialAppliedFilter]);

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleApplyFilters = () => {
    const filters = {
      appliedFilter
    };

    if (title) filters.title = title;
    if (city) filters.city = city;
    if (state) filters.state = state;
    if (country) filters.country = country;
    if (companyId) filters.companyId = companyId;
    if (minSalary) filters.minSalary = minSalary;
    if (maxSalary) filters.maxSalary = maxSalary;
    if (jobType) filters.jobType = jobType;
    if (remote) filters.remote = remote;
    if (skills.length > 0) filters.skills = skills;

    onFiltersChange(filters);
    
    // If we're on mobile, close the filter panel after applying
    if (onClose) {
      onClose();
    }
  };

  const resetFilters = () => {
    setTitle("");
    setCity("");
    setState("");
    setCountry("");
    setCompanyId("");
    setMinSalary("");
    setMaxSalary("");
    setJobType("");
    setRemote(false);
    setSkills([]);
    setCurrentSkill("");
    
    onFiltersChange({ appliedFilter });
    window.location.reload()
  };

  return (
    <div className="p-4 space-y-6">
      {/* Filter Type Toggle */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          View Jobs
        </label>
        <div className="flex rounded-md shadow-sm">
          <button
            className={`px-4 py-2 text-sm flex-1 rounded-l-md border ${
              appliedFilter === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setAppliedFilter('all')}
          >
            All Jobs
          </button>
          <button
            className={`px-4 py-2 text-sm flex-1 border-t border-b ${
              appliedFilter === 'applied'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setAppliedFilter('applied')}
          >
            Applied
          </button>
          <button
            className={`px-4 py-2 text-sm flex-1 rounded-r-md border ${
              appliedFilter === 'not-applied'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setAppliedFilter('not-applied')}
          >
            Not Applied
          </button>
        </div>
      </div>
      
      {/* Job Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g. Software Engineer"
        />
      </div>
      
      {/* Location Filters */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Location</h4>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. San Francisco"
          />
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. California"
          />
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. USA"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remote"
            checked={remote}
            onChange={() => setRemote(!remote)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remote" className="ml-2 block text-sm text-gray-700">
            Remote Only
          </label>
        </div>
      </div>
      
      {/* Company Filter */}
      <div>
        <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 mb-1">
          Company ID
        </label>
        <input
          type="text"
          id="companyId"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter company ID"
        />
      </div>
      
      {/* Salary Range */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Salary Range</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="minSalary" className="block text-sm font-medium text-gray-700 mb-1">
              Min Salary
            </label>
            <input
              type="number"
              id="minSalary"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Min"
            />
          </div>
          
          <div>
            <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700 mb-1">
              Max Salary
            </label>
            <input
              type="number"
              id="maxSalary"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
      
      {/* Job Type */}
      <div>
        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
          Job Type
        </label>
        <select
          id="jobType"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="temporary">Temporary</option>
        </select>
      </div>
      
      {/* Skills */}
      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
          Skills
        </label>
        <div className="flex">
          <input
            type="text"
            id="skills"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            className="flex-1 p-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Add a skill"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>
        
        {skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-indigo-200 text-indigo-600 hover:bg-indigo-300"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={handleApplyFilters}
          className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={resetFilters}
          className="flex-1 bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default JobFilters;