import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, RefreshCw, Sliders } from "lucide-react";
import JobFilters from "./JobFilters";
import useAxios from "@/hooks/useAxios";
import JobSearchHeader from "@/components/custom/Joblisting/JobHeading";
import JobStats from "@/components/custom/Joblisting/JobStats";
import JobGrid from "@/components/custom/Joblisting/JobGrid";
import toast from "@/components/custom/toast";

import Pagination from "@/components/custom/Joblisting/Paginations";

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
    appliedFilter: "all",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const toastShownRef = useRef(false);
  

  const axios = useAxios();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newFilters = { ...filters };

    const appliedFilter = queryParams.get("appliedFilter") || "all";
    newFilters.appliedFilter = appliedFilter;

    // Get other filters from URL params
    if (queryParams.has("title")) newFilters.title = queryParams.get("title");
    if (queryParams.has("city")) newFilters.city = queryParams.get("city");
    if (queryParams.has("state")) newFilters.state = queryParams.get("state");
    if (queryParams.has("country"))
      newFilters.country = queryParams.get("country");
    if (queryParams.has("companyId"))
      newFilters.companyId = queryParams.get("companyId");
    if (queryParams.has("minSalary"))
      newFilters.minSalary = queryParams.get("minSalary");
    if (queryParams.has("maxSalary"))
      newFilters.maxSalary = queryParams.get("maxSalary");
    if (queryParams.has("jobType"))
      newFilters.jobType = queryParams.get("jobType");
    if (queryParams.has("remote"))
      newFilters.remote = queryParams.get("remote") === "true";
    if (queryParams.has("skills")) {
      const skillsList = queryParams.get("skills").split(",");
      newFilters.skills = skillsList.filter((skill) => skill.trim() !== "");
    }

    setFilters(newFilters);
    setError(null);
  }, [location.search]);

  useEffect(()=>{
    if(!toastShownRef.current){

      toast.info("Please click on apply filter after applying any filter");
      toastShownRef.current = true;
    }

  },[])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        let url = "/jobs";

        if (filters.appliedFilter === "applied") {
          url = "/job/applied/user";
        } else if (filters.appliedFilter === "not-applied") {
          url = "/jobs/not-applied";
        }

        const queryParams = new URLSearchParams();
        queryParams.append("page", pagination.currentPage);
        queryParams.append("limit", pagination.pageSize);

        // Add this line to include the title in your API request
        if (filters.title) queryParams.append("title", filters.title);

        // Your existing filter parameters
        if (filters.companyId)
          queryParams.append("companyId", filters.companyId);
        if (filters.state) queryParams.append("state", filters.state);
        if (filters.city) queryParams.append("city", filters.city);
        if (filters.minSalary)
          queryParams.append("minSalary", filters.minSalary);
        if (filters.maxSalary)
          queryParams.append("maxSalary", filters.maxSalary);
        if (filters.jobType) queryParams.append("jobType", filters.jobType);
        if (filters.remote) queryParams.append("remote", "true");
        if (filters.skills && filters.skills.length > 0) {
          queryParams.append("skills", filters.skills.join(","));
        }

        const finalUrl = `${url}?${queryParams.toString()}`;
        console.log("Fetching jobs with URL:", finalUrl);

        const response = await axios.get(finalUrl);
        console.log(response.data)

        if (response.data.success) {
          console.log(`Received ${response.data.jobs.length} jobs from server`);
          setJobs(response.data.jobs);
          setFilteredJobs(response.data.jobs);
          setPagination({
            ...pagination,
            totalPages: response.data.pagination.totalPages,
            totalJobs:
              response.data.pagination.totalJobs ||
              response.data.pagination.totalAppliedJobs ||
              0,
          });
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
  }, [filters, pagination.currentPage, pagination.pageSize, axios]);

  const handleSearch = () => {
    const searchFilters = {
      title: searchTitle,
      city: searchLocation,
      appliedFilter: filters.appliedFilter,
    };

    const activeFilters = Object.fromEntries(
      Object.entries(searchFilters).filter(
        ([key, value]) => key === "appliedFilter" || value !== ""
      )
    );

    applyFilters(activeFilters);
  };

  const handleFiltersChange = (newFilters) => {
    // Authentication check removed - user is already logged in
    // if ((newFilters.appliedFilter === "applied" || newFilters.appliedFilter === "not-applied") &&
    //     (!authLoading && !axios.defaults.headers.common.Authorization)) {
    //   // User is not authenticated, show error
    //   setError("You need to sign in to view your applied jobs");
    //   return;
    // }

    // If the applied filter is changed, we want to reset to page 1
    if (newFilters.appliedFilter !== filters.appliedFilter) {
      setPagination((prev) => ({
        ...prev,
        currentPage: 1,
      }));
    }
    applyFilters(newFilters);
  };

  const applyFilters = async (filterParams) => {
    setLoading(true);

    // Build query params for URL
    const queryParams = new URLSearchParams();

    // Add filter parameters to URL
    if (filterParams.appliedFilter && filterParams.appliedFilter !== "all") {
      queryParams.append("appliedFilter", filterParams.appliedFilter);
    }
    if (filterParams.title) queryParams.append("title", filterParams.title);
    if (filterParams.city) queryParams.append("city", filterParams.city);
    if (filterParams.state) queryParams.append("state", filterParams.state);
    if (filterParams.country)
      queryParams.append("country", filterParams.country);
    if (filterParams.companyId)
      queryParams.append("companyId", filterParams.companyId);
    if (filterParams.minSalary)
      queryParams.append("minSalary", filterParams.minSalary);
    if (filterParams.maxSalary)
      queryParams.append("maxSalary", filterParams.maxSalary);
    if (filterParams.jobType)
      queryParams.append("jobType", filterParams.jobType);
    if (filterParams.remote) queryParams.append("remote", "true");
    if (filterParams.skills && filterParams.skills.length > 0) {
      queryParams.append("skills", filterParams.skills.join(","));
    }


    navigate(
      {
        pathname: location.pathname,
        search: queryParams.toString(),
      },
      { replace: true }
    );

    setLoading(false);
  };

  const drawerVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}

      <JobSearchHeader
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        handleSearch={handleSearch}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-2 md:p-4">
        {/* Tags Section */}

        <div className="flex flex-col md:flex-row gap-6">
          
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
            <JobStats totalJobs={pagination.totalJobs} />

            {/* Job Cards - New Grid Layout */}
            {loading ? (
              // <div className="flex justify-center items-center h-64">
              //   <motion.div
              //     animate={{ rotate: 360 }}
              //     transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              //   >
              //     <RefreshCw className="w-8 h-8 text-indigo-600" />
              //   </motion.div>
              // </div>
              <JobGrid jobs={[]} loading={true} />
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
                    // Reset to initial state but keep appliedFilter
                    const currentAppliedFilter = filters.appliedFilter;
                    const resetFilters = {
                      appliedFilter: currentAppliedFilter,
                    };
                    setFilters(resetFilters);
                    setSearchTitle("");
                    setSearchLocation("");
                    setSelectedTags([]);

                    // Apply the reset
                    applyFilters(resetFilters);

                    // Reset pagination
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: 1,
                    }));
                  }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <JobGrid jobs={filteredJobs} loading={false} />
            )}

            {/* Pagination */}
            {!loading && filteredJobs.length > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
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
