import React, { useState, useEffect, useContext } from "react";
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
} from "lucide-react";
import JobFilters from "./JobFilters";
import useAxios from "@/hooks/useAxios";
import { AuthContext } from "@/context/authContext";
// import dotenv from 'dotenv';
// dotenv.config();

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
  const { isLoading: authLoading } = useContext(AuthContext);
  const axios = useAxios();
  const [currJobs, setCurrJobs] = useState([]);

  // Mock data to simulate API response
  const mockJobsData = {
    success: true,
    status: 200,
    message: "Jobs retrieved successfully",
    jobs: [
      {
        _id: "job1",
        title: "Senior UX Designer",
        description:
          "We are looking for a talented UX Designer to join our team.",
        companyId: {
          _id: "company1",
          name: "Design Magic",
          logo: "/api/placeholder/48/48",
        },
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        location: {
          city: "San Francisco",
          state: "CA",
          country: "USA",
        },
        requirement: ["Figma", "UI Design", "User Research"],
        applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        min_salary: 120000,
        max_salary: 150000,
        status: "open",
        createdBy: {
          name: "John Recruiter",
          email: "john@designmagic.com",
        },
      },
      {
        _id: "job2",
        title: "Product Designer",
        description: "Join our product team to create amazing experiences.",
        companyId: {
          _id: "company2",
          name: "Tech Innovate",
          logo: "/api/placeholder/48/48",
        },
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        location: {
          city: "New York",
          state: "NY",
          country: "USA",
        },
        requirement: ["Product Design", "Prototyping", "Sketch"],
        applicationDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        min_salary: 90000,
        max_salary: 120000,
        status: "open",
        createdBy: {
          name: "Sarah Manager",
          email: "sarah@techinnovate.com",
        },
      },
      {
        _id: "job3",
        title: "UI/UX Designer",
        description: "Remote opportunity for a creative UI/UX designer.",
        companyId: {
          _id: "company3",
          name: "Creative Solutions",
          logo: "/api/placeholder/48/48",
        },
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        location: {
          city: "Remote",
          state: "Any",
          country: "Any",
        },
        requirement: ["UI Design", "Wireframing", "Adobe XD"],
        applicationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        min_salary: 80000,
        max_salary: 100000,
        status: "open",
        createdBy: {
          name: "Alex Creative",
          email: "alex@creativesolutions.com",
        },
      },
    ],
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      totalJobs: 3,
    },
  };
  // const baseUrl = process.env.VITE_BASE_URL;
  // Simulate API fetch
  useEffect(() => {
    // In a real implementation, you would call your API here
    // Simulating API call with mock data
    const func = async () => {
      try {
        setLoading(true);
        const tempData = await axios.get("/jobs");
        const jobsData = tempData.data;
        console.log(jobsData);
        if (jobsData.success && jobsData.jobs) {
          setJobs(jobsData.jobs);
          setFilteredJobs(
            jobsData.jobs.filter((job) => job.isDelete !== "Yes")
          );
          setPagination(jobsData.pagination);
        }
      } catch (e) {
        console.error("Error fetching data", e);
        setError("hello ji");
      } finally {
        setLoading(false);
      }
    };
    if (!authLoading) func();
    // setTimeout(() => {
    //   setJobs(mockJobsData.jobs);
    //   setFilteredJobs(mockJobsData.jobs);
    //   setPagination(mockJobsData.pagination);
    //   setLoading(false);
    // }, 500);
  }, [authLoading, axios]);
  const displaySkills = (requirements) => {
    if (!Array.isArray(requirements)) return [];
  
    const skills = [
      "Restful API", "react", "node", "next", "c++", "c#",
      "java", "aws", "javascript", "docker", "express", "typescript",
      "graphql", "mongodb", "postgresql", "mysql", "redis",
      "firebase", "kubernetes", "azure", "gcp", "python",
      "django", "flask", "fastapi", "spring boot", "rust",
      "go", "bash", "linux", "tailwind", "bootstrap", "sass",
      "webpack", "vite", "jest", "cypress", "puppeteer",
      "storybook", "redux", "zustand", "prisma", "supabase",
      "elastic search", "rabbitmq", "kafka", "terraform",
      "ansible", "ci/cd", "git", "github actions", "socket.io",
      "webassembly", "three.js", "astro", "solid.js", "svelte",
      "turborepo"
    ].map(skill => skill.toLowerCase());
  
    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapes special characters
  
    const extractedSkills = new Set(); // Avoid duplicates
  
    requirements
      .filter(req => !req.toLowerCase().includes("year")) // Remove "year" mentions
      .forEach(req => {
        const lowerReq = req.toLowerCase();
  
        for (const skill of skills) {
          const regex = new RegExp(`\\b${escapeRegExp(skill)}\\b`, "i"); // Escape special chars
          if (regex.test(lowerReq)) {
            extractedSkills.add(skill.charAt(0).toUpperCase() + skill.slice(1)); // Capitalize
            break; // Stop after first match in this requirement
          }
        }
      });
  
    return [...extractedSkills].slice(0, 3); // Convert to array & limit to 3
  };
  
  
  // Example usage:
  const requirements = [
    "Proficiency in react.js, Express.js, and MongoDB",
    "Experience with RESTful API design and GraphQL",
    "Knowledge of AWS, Docker, and Kubernetes"
  ];
  
  console.log(displaySkills(requirements));
  
  const getCompanyLogo = (job) => {
    if (job.companyId && job.companyId.logo) return job.companyId.logo;

    return "/api/placeholder/48/48";
  };
  const getCompanyName = (job) => {
    if (job.companyId && job.companyId.name) return job.companyId.name;
    return "Unknown Company";
  };
  console.log("currJobs", currJobs);
  const handleRemoveTag = (indexToRemove) => {
    setSelectedTags(selectedTags.filter((_, index) => index !== indexToRemove));
  };

  const handleSearch = () => {
    // This would trigger an API call in a real implementation
    // For now, we'll just filter the mock data
    const filtered = jobs.filter((job) => {
      const titleMatch = searchTitle
        ? job.title.toLowerCase().includes(searchTitle.toLowerCase())
        : true;

      const locationMatch = searchLocation
        ? job.location.country
            .toLowerCase()
            .includes(searchLocation.toLowerCase()) ||
          job.location.state
            .toLowerCase()
            .includes(searchLocation.toLowerCase()) ||
          job.location.city.toLowerCase().includes(searchLocation.toLowerCase())
        : true;

      return titleMatch && locationMatch;
    });

    setFilteredJobs(filtered);
  };

  const handleFiltersChange = ({
    employmentTypes,
    seniorityLevels,
    salaryRange,
  }) => {
    // In a real implementation, this would build query params for your API
    // For now, we'll filter the mock data
    const filtered = jobs.filter((job) => {
      // Salary filtering
      const salaryMatch =
        job.min_salary <= salaryRange.max && job.max_salary >= salaryRange.min;

      // For simplicity, we're not implementing all filters with the mock data
      // In a real application, you would pass these filters to your API

      return salaryMatch;
    });

    setFilteredJobs(filtered);
  };

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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">
            Find Your Dream Design Job
          </h1>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[300px] flex items-center gap-2 border-r border-gray-200 pr-4">
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
                <select
                  className="w-full outline-none text-gray-900 bg-transparent"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                >
                  <option value="">All Countries</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              <button
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={handleSearch}
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[85rem] mx-auto p-6">
        {/* Tags Section */}
        {selectedTags.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-600 font-medium">Active Filters:</span>
              {selectedTags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full"
                >
                  <span>{tag}</span>
                  <X
                    className="w-4 h-4 ml-2 cursor-pointer hover:text-indigo-900"
                    onClick={() => handleRemoveTag(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-6">
          <JobFilters
            isOpen={isFiltersOpen}
            onClose={() => setIsFiltersOpen(false)}
            onFiltersChange={handleFiltersChange}
          />

          {/* Jobs Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {pagination.totalJobs} Design Jobs
              </h2>
              <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-600 outline-none">
                <option>Most Recent</option>
                <option>Highest Paid</option>
                <option>Most Relevant</option>
              </select>
            </div>

            {authLoading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                <p className="mt-2 text-gray-600">initialising jobs...</p>
              </div>
            ) : loading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                <p className="mt-2 text-gray-600">loading jobs...</p>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                <p className="mt-2 text-gray-600">error in loading jobs...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                 <div
                 key={job._id}
                 className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
               >
                 <div className="p-6 flex-grow">
                   <div className="flex items-start justify-between mb-4">
                     <div className="flex gap-4">
                       <img
                         src={getCompanyLogo(job)}
                         alt={`${getCompanyName(job)} logo`}
                         className="w-12 h-12 rounded-lg object-contain bg-gray-50"
                       />
                       <div>
                         <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                         <p className="text-blue-600 font-medium">{getCompanyName(job)}</p>
                       </div>
                     </div>
                     <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                       <Star className="w-5 h-5" />
                     </button>
                   </div>
               
                   <div className="space-y-3 mb-4">
                     <div className="flex items-center text-gray-600">
                       <MapPin className="mr-2 text-blue-500 w-5 h-5" />
                       <span>{`${job.location.city}, ${job.location.state}, ${job.location.country}`}</span>
                     </div>
                     <div className="flex items-center text-gray-600">
                       <Briefcase className="mr-2 text-blue-500 w-5 h-5" />
                       <span>Full-time</span>
                     </div>
                     <div className="flex items-center text-gray-600">
                       <DollarSign className="mr-2 text-blue-500 w-5 h-5" />
                       <span>{`${formatSalary(job.min_salary)} - ${formatSalary(job.max_salary)}`}</span>
                     </div>
                   </div>
               
                   <div className="flex flex-wrap gap-2 mb-4">
                     {displaySkills(job.requirement).map((skill) => (
                       <span key={skill} className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm">
                         {skill}
                       </span>
                     ))}
                   </div>
                 </div>
               
                 {/* ✅ Footer Now Stays at the Bottom */}
                 <div className="flex items-center justify-between p-6 border-t border-gray-100 mt-auto">
                   <div className="flex items-center text-gray-500 text-sm">
                     <Clock className="mr-1 w-4 h-4" />
                     Posted {calculateDaysAgo(job.postedDate)} days ago
                   </div>
                   <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap">
                     Apply Now
                     <ArrowRight className="w-4 h-4" />
                   </button>
                 </div>
               </div>
               
                
                ))}
              </div>
            )}

            {currJobs.length === 0 && !loading && (
              <div className="text-center py-10 bg-white rounded-xl shadow p-6">
                <div className="text-gray-500 text-lg mb-2">No jobs found</div>
                <p className="text-gray-400">
                  Try adjusting your search filters
                </p>
              </div>
            )}

            <button
              className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-10"
              onClick={() => setIsFiltersOpen(true)}
            >
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
