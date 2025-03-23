import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  MoreVertical,
  Heart,
  Briefcase,
  MapPin,
  DollarSign,
  Filter,
  Clock,
  Building,
  Share2,
  ExternalLink,
  Star,
  ArrowRight,
  RefreshCw,
  Sliders,
} from "lucide-react";
import JobFilters from "./JobFilters";
import useAxios from "@/hooks/useAxios";
import { AuthContext } from "@/context/authContext";

const JobBoard = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false); 
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalJobs: 0,
  });
  const [filters, setFilters] = useState({
    appliedFilter: "all" 
  });
  const debounceTimerRef = useRef(null);
  const navigate = useNavigate();

  const { isLoading: authLoading } = useContext(AuthContext);
  const axios = useAxios();
  const jobPath = "/jobDetails";

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const appliedFilter = queryParams.get("appliedFilter");
    
    if (appliedFilter) {
      setFilters(prevFilters => ({
        ...prevFilters,
        appliedFilter
      }));
    }
  }, [location.search]);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        let url = "/jobs";
        const queryParams = new URLSearchParams();
        
        // Add applied filter
        if (filters.appliedFilter && filters.appliedFilter !== "all") {
          queryParams.append("appliedFilter", filters.appliedFilter);
        }
        
        // Add other filters
        if (filters.companyId) queryParams.append("companyId", filters.companyId);
        if (filters.state) queryParams.append("state", filters.state);
        if (filters.city) queryParams.append("city", filters.city);
        if (filters.minSalary) queryParams.append("minSalary", filters.minSalary);
        if (filters.maxSalary) queryParams.append("maxSalary", filters.maxSalary);
        if (filters.jobType) queryParams.append("jobType", filters.jobType);
        if (filters.remote) queryParams.append("remote", "true");
        if (filters.skills && filters.skills.length > 0) {
          queryParams.append("skills", filters.skills.join(","));
        }
        
        // Append query string to URL if there are filters
        if (queryParams.toString()) {
          url = `${url}?${queryParams.toString()}`;
        }
        
        const response = await axios.get(url);
        
        if (response.data.success) {
          setJobs(response.data.jobs);
        } else {
          setError("Failed to fetch jobs");
        }
      } catch (err) {
        setError("An error occurred while fetching jobs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [filters, axios]);

  const displaySkills = (requirements) => {
    if (!Array.isArray(requirements)) return [];
    return requirements.slice(0, 3);
  };

  const getCompanyLogo = (job) => {
    if (job.companyId && job.companyId.logo) return job.companyId.logo;
    return "/api/placeholder/48/48";
  };

  const getCompanyName = (job) => {
    if (job.companyId && job.companyId.name) return job.companyId.name;
    return "Unknown Company";
  };

  const handleRemoveTag = (indexToRemove) => {
    setSelectedTags(selectedTags.filter((_, index) => index !== indexToRemove));
  };

  const handleSearch = () => {
    const searchFilters = {
      title: searchTitle,
      city: searchLocation,
    };

    const activeFilters = Object.fromEntries(
      Object.entries(searchFilters).filter(([_, value]) => value !== "")
    );

    applyFilters(activeFilters);
  };

  const handleFiltersChange = (newFilters) => {
    applyFilters(newFilters);
  };

  const applyFilters = async (filterParams) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setLoading(true);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const queryParams = new URLSearchParams();

        
        if (filterParams.appliedFilter && filterParams.appliedFilter !== "all") {
          queryParams.append("appliedFilter", filterParams.appliedFilter);
        }
    

        queryParams.append("page", pagination.currentPage);
        queryParams.append("limit", pagination.pageSize);

        queryParams.append("sort", "createdAt");
        queryParams.append("order", "desc");

        if (filterParams.title) queryParams.append("title", filterParams.title);
        if (filterParams.city) queryParams.append("city", filterParams.city);
        if (filterParams.state) queryParams.append("state", filterParams.state);
        if (filterParams.country)
          queryParams.append("country", filterParams.country);
        if (filterParams.minSalary)
          queryParams.append("minSalary", filterParams.minSalary);
        if (filterParams.maxSalary)
          queryParams.append("maxSalary", filterParams.maxSalary);
        if (filterParams.status)
          queryParams.append("status", filterParams.status);
        if (filterParams.companyId)
          queryParams.append("companyId", filterParams.companyId);

        const response = await axios.get(`/jobs?${queryParams.toString()}`);

        if (response.data.success) {
          window.scrollTo(0, 0);
          setJobs(response.data.jobs);
          setFilteredJobs(
            response.data.jobs.filter((job) => job.isDelete !== "Yes")
          );
          setPagination(response.data.pagination);
        } else {
          setError("Failed to filter jobs");
        }

        if (window.innerWidth < 768) {
          setIsFiltersOpen(false);
        }

        navigate({
          pathname: location.pathname,
          search: queryParams.toString()
        }, { replace: true });
      } catch (error) {
        console.error("Error applying filters:", error);
        setError("Failed to filter jobs");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Format salary from number to string with k format
  const formatSalary = (salary) => {
    return `$${Math.round(salary / 1000)}k`;
  };

  // Calculate days since posted
  const calculateDaysAgo = (postedDate) => {
    const now = new Date();
    const posted = new Date(postedDate);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Mobile filter drawer animation variants
  const drawerVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <motion.div
        className="bg-blue-700 text-white p-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Find Your Dream Design Job
          </motion.h1>
          <motion.div
            className="bg-white rounded-xl shadow-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[300px] flex items-center gap-2 border-r border-gray-200 pr-4 md:pr-4">
                <Search className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search job titles or keywords"
                  className="w-full outline-none text-gray-800"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-[200px] flex items-center gap-2 border-r border-gray-200 pr-4">
                <MapPin className="text-gray-400" />
                <input
                  type="text"
                  placeholder="City or location"
                  className="w-full outline-none text-gray-900 bg-transparent"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <motion.button
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={handleSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search Jobs
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Tags Section */}
        <AnimatePresence>
          {selectedTags.length > 0 && (
            <motion.div
              className="bg-white rounded-xl shadow-md p-4 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-gray-600 font-medium">
                  Active Filters:
                </span>
                {selectedTags.map((tag, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>{tag}</span>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X
                        className="w-4 h-4 ml-2 cursor-pointer hover:text-indigo-900"
                        onClick={() => handleRemoveTag(index)}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Column - Desktop View (Always Visible) */}
          <div className="w-full md:w-1/4 hidden md:block">
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden mb-6 sticky top-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Filter className="text-indigo-600" />
                  <h3 className="font-medium text-gray-900">Filters</h3>
                </div>
              </div>

              {/* Always show filters on desktop */}
              <JobFilters 
                onFiltersChange={handleFiltersChange} 
                initialAppliedFilter={filters.appliedFilter}
              />
            </motion.div>
          </div>

          {/* Jobs Column */}
          <div className="w-full md:w-3/4">
            {/* Stats Bar */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="text-gray-600">
                Found{" "}
                <span className="font-semibold text-gray-900">
                  {pagination.totalJobs}
                </span>{" "}
                jobs
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="border-none bg-transparent text-gray-800 font-medium focus:outline-none">
                  <option>Most recent</option>
                  <option>Highest salary</option>
                  <option>Most relevant</option>
                </select>
              </div>
            </motion.div>

            {/* Job Cards - New Grid Layout */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <RefreshCw className="w-8 h-8 text-indigo-600" />
                </motion.div>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search filters or keywords
                </p>
                <button
                  className="text-indigo-600 font-medium hover:text-indigo-800"
                  onClick={() => {
                    setFilteredJobs(jobs);
                    setSearchTitle("");
                    setSearchLocation("");
                    setSelectedTags([]);
                  }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
              >
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col"
                  >
                    <Link
                      to={`${jobPath}/${job._id}`}
                      className="block flex-grow"
                    >
                      <div className="p-5 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex gap-3">
                            <div className="rounded-lg w-12 h-12 flex-shrink-0 bg-gray-100 flex items-center justify-center overflow-hidden">
                              <img
                                src={getCompanyLogo(job)}
                                alt={getCompanyName(job)}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900 hover:text-indigo-600 line-clamp-2">
                                {job.title}
                              </h3>
                              <div className="text-gray-500 mt-1">
                                {getCompanyName(job)}
                              </div>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-red-500">
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-2 mt-2 mb-3">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="truncate">
                              {job.location.city}, {job.location.state}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span>
                              {formatSalary(job.min_salary)} -{" "}
                              {formatSalary(job.max_salary)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            {/* yaha par api se data lana ha */}
                            <span>Full-time</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span>
                              {calculateDaysAgo(job.postedDate)} days ago
                            </span>
                          </div>
                        </div>

                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {displaySkills(job.skills).map((skill, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs whitespace-nowrap"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 text-gray-300" />
                            </div>
                            <div className="flex items-center text-indigo-600 font-medium text-sm">
                              View Details
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {!loading && filteredJobs.length > 0 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <button
                    className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                    disabled={pagination.currentPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: pagination.totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded ${
                        pagination.currentPage === i + 1
                          ? "bg-indigo-600 text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                    disabled={pagination.currentPage === pagination.totalPages}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Floating Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-30">
        <motion.button
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFiltersOpen(true)}
        >
          <Sliders size={24} />
        </motion.button>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {isFiltersOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFiltersOpen(false)}
            />

            {/* Mobile Filter Panel */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl max-h-[85vh] overflow-y-auto"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setIsFiltersOpen(false)}
                >
                  <X />
                </button>
              </div>
              <div className="p-4">
                <JobFilters
                  onFiltersChange={handleFiltersChange}
                  isOpen={true}
                  onClose={() => setIsFiltersOpen(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobBoard;
