import React, { useState } from "react";
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

const JobBoard = () => {
  const [selectedTags, setSelectedTags] = useState([
    "Product Designer",
    "Artist",
    "Game Designer",
    "Designer",
  ]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [jobs] = useState([
    {
      id: 1,
      title: "Senior UX Designer",
      company: "Design Magic",
      logo: "/api/placeholder/48/48",
      location: "San Francisco, CA",
      experience: "5+ years",
      salary: "$120k - $150k",
      type: "Full-time",
      isHot: true,
      isRemote: true,
      skills: ["Figma", "UI Design", "User Research"],
      postedDays: 2,
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Tech Innovate",
      logo: "/api/placeholder/48/48",
      location: "New York, NY",
      experience: "3+ years",
      salary: "$90k - $120k",
      type: "Full-time",
      isHot: true,
      isRemote: false,
      skills: ["Product Design", "Prototyping", "Sketch"],
      postedDays: 3,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Solutions",
      logo: "/api/placeholder/48/48",
      location: "Remote",
      experience: "2+ years",
      salary: "$80k - $100k",
      type: "Contract",
      isHot: false,
      isRemote: true,
      skills: ["UI Design", "Wireframing", "Adobe XD"],
      postedDays: 1,
    },
  ]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleRemoveTag = (indexToRemove) => {
    setSelectedTags(selectedTags.filter((_, index) => index !== indexToRemove));
  };

  const handleFiltersChange = ({
    employmentTypes,
    seniorityLevels,
    salaryRange,
  }) => {
    const filtered = jobs.filter((job) => {
      const typeMatch =
        (!employmentTypes.fullTime || job.type === "Full-Time") &&
        (!employmentTypes.partTime || job.type === "Part Time Job") &&
        (!employmentTypes.remote || job.type === "Remote Job") &&
        (!employmentTypes.training || job.type === "Training Job");

      const levelMatch =
        (!seniorityLevels.student || job.level === "Student-Entry") &&
        (!seniorityLevels.entry || job.level === "Entry Level") &&
        (!seniorityLevels.senior || job.level === "Senior") &&
        (!seniorityLevels.director || job.level === "Director") &&
        (!seniorityLevels.vp || job.level === "VP");

      const salary = parseInt(job.salary.replace(/[^0-9]/g, ""));
      const salaryMatch =
        salary >= salaryRange.min && salary <= salaryRange.max;

      return typeMatch && levelMatch && salaryMatch;
    });

    setFilteredJobs(filtered);
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
                />
              </div>
              <div className="flex-1 min-w-[200px] flex items-center gap-2 border-r border-gray-200 pr-4">
                <MapPin className="text-gray-400" />
                <select className="w-full outline-none text-gray-900 bg-transparent">
                  <option>All Countries</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[85rem] mx-auto p-6">
        {/* Tags Section */}
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

        <div className="flex gap-6">
          {/* Filters - Mobile Toggle */}

          {/* Filters Sidebar */}

          <JobFilters
            isOpen={isFiltersOpen}
            onClose={() => setIsFiltersOpen(false)}
            onFiltersChange={handleFiltersChange}
          />

          {/* Jobs Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {filteredJobs.length} Design Jobs
              </h2>
              <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-600 outline-none">
                <option>Most Recent</option>
                <option>Highest Paid</option>
                <option>Most Relevant</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-4">
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="w-12 h-12 rounded-lg object-contain bg-gray-50"
                        />
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {job.title}
                          </h3>
                          <p className="text-blue-600 font-medium">
                            {job.company}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                        <Star className="w-5 h-5" />
                      </button>
                    </div>

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

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="mr-2 text-blue-500 w-5 h-5" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="mr-2 text-blue-500 w-5 h-5" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="mr-2 text-blue-500 w-5 h-5" />
                        <span>{job.salary}</span>
                      </div>
                    </div>

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

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="mr-1 w-4 h-4" />
                        Posted {job.postedDays} days ago
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap">
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
