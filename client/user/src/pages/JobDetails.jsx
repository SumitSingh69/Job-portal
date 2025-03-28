import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");
  const { id } = useParams();
  const axios = useAxios();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/job/${id}`);
        console.log(response.data);
        if (response.data.success) {
          setJob(response.data.job);
          // Check if user has already applied for this job
          await checkIfApplied();
        } else {
          setError("Failed to fetch job details");
        }
      } catch (err) {
        setError("An error occurred while fetching job details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [id, axios]);

  // Check if the user has already applied for this job
  const checkIfApplied = async () => {
    try {
      const response = await axios.get(`/job/applied/user`);
      if (response.data.success) {
        const jobExists = response.data.jobs.some(job => job._id === id);
        setHasApplied(jobExists);
      }
    } catch (err) {
      console.error("Error checking application status:", err);
    }
  };

  const applyJob = async () => {
    if (hasApplied) {
      setApplyMessage("You have already applied for this job");
      return;
    }

    try {
      const response = await axios.post(`/job/apply/${id}`);
      console.log(response.data);
      
      if (response.data.success) {
        setHasApplied(true);
        setApplyMessage("Job applied successfully");
      } else {
        setApplyMessage(response.data.message || "Failed to apply for job");
      }
    } catch (err) {
      console.error(err);
      setApplyMessage(err.response?.data?.message || "An error occurred while applying");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex flex-col items-center justify-center">
        <div className="text-lg font-medium text-gray-700">Loading job details...</div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex flex-col items-center justify-center">
        <div className="text-lg font-medium text-red-600">{error || "Job not found"}</div>
      </div>
    );
  }

  // Format salary range
  const formatSalary = (min, max) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()} per year`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex flex-col items-center font-sans">
      <main className="w-full max-w-6xl flex flex-col md:flex-row mt-6 gap-6">
        <div className="w-full md:w-2/3 space-y-6">
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
            <div className="border-b border-gray-100 pb-6 flex items-center relative">
            {job.companyId && job.companyId.logo && (
                <div className="w-16 h-16 bg-blue-50 flex items-center justify-center rounded-full mr-4 absolute top-2 border-2 border-blue-100">
                  <img src={job.companyId.logo} alt={job.companyId.name} className="w-12 h-12 object-cover rounded-full" />
                </div>
              )}
              <div className="ml-20">
                <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
                <p className="text-gray-600 flex items-center gap-1">
                {job.companyId && job.companyId.name && (
                    <span className="font-medium">{job.companyId.name}</span>
                  )}
                  <span className="text-gray-400">•</span> 
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {job.location.city}, {job.location.state}, {job.location.country}
                  </span>
                </p>
                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>Posted: {formatDate(job.postedDate)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <span>{job.applicants} applicants</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Status: {job.status}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {formatSalary(job.min_salary, job.max_salary)}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    Deadline: {formatDate(job.applicationDeadline)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              {hasApplied ? (
                <div className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  You Have Already Applied
                </div>
              ) : (
                <button 
                  onClick={applyJob} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  disabled={job.status === "closed"}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Apply Now 
                </button>
              )}
              <button className="flex-1 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 py-3 px-6 rounded-lg text-lg font-medium transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
                Save Job
              </button>
            </div>
            {applyMessage && (
              <div className={`mt-4 p-3 rounded-lg text-center ${hasApplied ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {applyMessage}
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Job Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
            
            <div className="mt-6">
              <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                Requirements
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {job.requirement.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Skills Required
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <aside className="w-full md:w-1/3">
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Similar Jobs
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="bg-gray-50 hover:bg-blue-50 transition-colors duration-300 p-4 rounded-lg flex justify-between items-center border border-gray-100 hover:border-blue-100 cursor-pointer group">
                  <div>
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                      {["Senior React Developer", "UI/UX Designer", "Frontend Team Lead", "JavaScript Engineer", "Web Developer"][index % 5]}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {["TechCorp", "DesignHub", "CodeMasters", "WebSolutions", "DigitalCrafters"][index % 5]} · 
                      {[" Remote", " San Francisco", " New York", " London", " Berlin"][index % 5]}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">Posted {index + 1} days ago</p>
                  </div>
                  <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full border border-gray-200 group-hover:border-blue-200 transition-colors duration-300">
                    <span className="text-xs font-bold text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
                      {["TC", "DH", "CM", "WS", "DC"][index % 5]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="w-full text-blue-600 hover:text-blue-800 py-2 text-center font-medium transition-colors duration-300 flex items-center justify-center gap-1">
                View All Similar Jobs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default JobDetails;