import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { motion } from "framer-motion";
// import { saveAs } from "file-saver";

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
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
        if (response.data.success) {
          setJob(response.data.job);

          // Check application status after job details are fetched
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
        // Check if current job ID exists in applied jobs
        const jobExists = response.data.jobs.some((job) => job._id === id);

        if (jobExists) {
          setHasApplied(true);
          // console.log("User has already applied for this job");
        } else {
          setHasApplied(false);
          // console.log("User has not applied for this job yet");
        }
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
      setApplyLoading(true);
      const response = await axios.post(`/job/apply/${id}`);
      console.log(response.data);

      if (response.data.success || response.data.application) {
        setHasApplied(true);
        setApplicationStatus("submited"); // Set status to submitted when application is successful
        setApplyMessage("Successfully applied to the job");
      } else {
        setApplyMessage(response.data.message || "Failed to apply for job");
      }
    } catch (err) {
      console.error(err);
      setApplyMessage(
        err.response?.data?.message || "An error occurred while applying"
      );
    } finally {
      setApplyLoading(false);
    }
  };
  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const response = await axios.get(`/application/get/${id}`);
        if (response.data.success) {
          console.log("Application status response:", response.data);
          if (response.data.data && response.data.data.status) {
            setApplicationStatus(response.data.data.status);
            console.log(
              "Setting application status to:",
              response.data.data.status
            );
          }
        }
      } catch (error) {
        console.log("Error checking application status:", error);
      }
    };
    checkApplicationStatus();
  }, [axios, id]);

  // Use a useEffect to track changes to applicationStatus
  useEffect(() => {
    console.log("Application status changed to:", applicationStatus);
  }, [applicationStatus]);

  const toggleSaveJob = () => {
    setSaved(!saved);
    // Show a temporary message
    const tempMsg = !saved
      ? "Job saved to your profile"
      : "Job removed from saved jobs";
    setApplyMessage(tempMsg);

    // Clear message after 3 seconds
    setTimeout(() => setApplyMessage(""), 3000);
  };

  const shareJob = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.companyId?.name || "Company"}`,
        text: `Check out this job opportunity: ${job.title} at ${
          job.companyId?.name || "Company"
        }`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      setApplyMessage("Job link copied to clipboard");
      setTimeout(() => setApplyMessage(""), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-4"></div>
          <div className="text-lg font-medium text-blue-700">
            Loading job details...
          </div>
          <p className="text-sm text-blue-400 mt-2">
            Fetching the perfect opportunity for you
          </p>
        </motion.div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto">
            <svg
              className="w-full h-full text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <div className="text-xl font-medium text-red-600 mt-4">
            {error || "Job not found"}
          </div>
          <p className="text-red-400 mt-2">
            Please try again or explore other job listings
          </p>
        </motion.div>
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
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate days until deadline
  const getDaysUntilDeadline = (deadlineStr) => {
    const today = new Date();
    const deadline = new Date(deadlineStr);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-4 md:p-6 flex flex-col items-center font-sans"
    >
      <main className="w-full max-w-6xl flex flex-col md:flex-row mt-4 md:mt-6 gap-6">
        {/* Left Side - Job Details */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Job Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
          >
            <div className="border-b border-gray-100 pb-6 flex items-start sm:items-center relative">
              {job.companyId && job.companyId.logo && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center rounded-full mr-4 border-2 border-blue-200 shadow-md"
                >
                  <img
                    src={job.companyId.logo}
                    alt={job.companyId.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </motion.div>
              )}
              <div className="ml-0 sm:ml-20 mt-4 sm:mt-0">
                <motion.h2
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-2xl sm:text-3xl font-bold text-gray-800"
                >
                  {job.title}
                </motion.h2>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-gray-600 flex flex-wrap items-center gap-1 mt-1"
                >
                  {job.companyId && job.companyId.name && (
                    <span className="font-medium text-indigo-700">
                      {job.companyId.name}
                    </span>
                  )}
                  <span className="text-gray-400">•</span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    {job.location.city}, {job.location.state},{" "}
                    {job.location.country}
                  </span>
                </motion.p>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="mt-4 flex flex-wrap gap-4"
                >
                  <div className="flex items-center gap-1 text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
                    <svg
                      className="w-4 h-4 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>Posted: {formatDate(job.postedDate)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm bg-blue-50 px-3 py-1 rounded-full">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                    <span>{job.applicants} applicants</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium bg-green-50 px-3 py-1 rounded-full text-green-700">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>Status: {job.status}</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="mt-4 flex flex-wrap gap-3"
                >
                  <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                    <svg
                      className="w-4 h-4 mr-2 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {formatSalary(job.min_salary, job.max_salary)}
                  </div>

                  <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                    <svg
                      className="w-4 h-4 mr-2 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>
                      {getDaysUntilDeadline(job.applicationDeadline)} days left
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 flex flex-col sm:flex-row gap-4"
            >
              {hasApplied ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  You Have Already Applied
                </motion.div>
              ) : (
                <motion.button
                  onClick={applyJob}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  disabled={job.status === "closed" || applyLoading}
                >
                  {applyLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-indigo-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Applying...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        ></path>
                      </svg>
                      Apply Now
                    </>
                  )}
                </motion.button>
              )}

              <div className="flex gap-3">
                <motion.button
                  onClick={toggleSaveJob}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${
                    saved
                      ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                      : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                  } border py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center`}
                >
                  <svg
                    className={`w-5 h-5 ${
                      saved
                        ? "text-indigo-500 fill-indigo-500"
                        : "text-gray-500"
                    }`}
                    fill={saved ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                </motion.button>

                <motion.button
                  onClick={shareJob}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            {applyMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 p-3 rounded-lg text-center ${
                  hasApplied || applyMessage.includes("Success") || saved
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {applyMessage}
              </motion.div>
            )}
          </motion.div>

          {/* Job Description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              Job Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6"
            >
              <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
                Requirements
              </h4>
              <ul className="list-none pl-0 space-y-2 text-gray-700">
                {job.requirement.map((req, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>{req}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-6"
            >
              <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Skills Required
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    whileHover={{ scale: 1.05, backgroundColor: "#dbeafe" }}
                    className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-indigo-100"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Job Timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100"
            >
              <h4 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Application Timeline
              </h4>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-indigo-200 rounded-full"></div>

                <div className="flex mb-8 relative">
                  <div className="h-16 w-16 rounded-full bg-indigo-100 border-4 border-white shadow-md flex items-center justify-center z-10 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4 pt-3">
                    <h5 className="text-lg font-semibold text-indigo-700">
                      Application Deadline
                    </h5>
                    <p className="text-indigo-600">
                      {formatDate(job.applicationDeadline)}
                    </p>
                  </div>
                </div>

                <div className="flex mb-8 relative">
                  <div className="h-16 w-16 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center z-10 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4 pt-3">
                    <h5 className="text-lg font-semibold text-blue-700">
                      Screening Process
                    </h5>
                    <p className="text-blue-600">
                      1-2 weeks after application deadline
                    </p>
                  </div>
                </div>

                <div className="flex relative">
                  <div className="h-16 w-16 rounded-full bg-green-100 border-4 border-white shadow-md flex items-center justify-center z-10 flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-4 pt-3">
                    <h5 className="text-lg font-semibold text-green-700">
                      Expected Start Date
                    </h5>
                    <p className="text-green-600">
                      Within 4 weeks after selection
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Company Info */}
          {job.companyId && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
                About the Company
              </h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-center md:text-left">
                  {job.companyId.logo && (
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 mx-auto md:mx-0 flex items-center justify-center rounded-full border-2 border-blue-200 shadow-md mb-4">
                      <img
                        src={job.companyId.logo}
                        alt={job.companyId.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </div>
                  )}
                  <h4 className="text-lg font-semibold text-indigo-700">
                    {job.companyId.name}
                  </h4>
                  <p className="text-gray-600 mt-1 text-sm">
                    {job.companyId.industry}
                  </p>
                  <div className="mt-2 flex justify-center md:justify-start">
                    <a
                      href={job.companyId.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                      Visit Website
                    </a>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">
                    {job.companyId.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        className="w-5 h-5 text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <span>
                        {job.companyId.location?.city},{" "}
                        {job.companyId.location?.state},{" "}
                        {job.companyId.location?.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        className="w-5 h-5 text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                      </svg>
                      <span>{job.companyId.employeeCount}+ employees</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        className="w-5 h-5 text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>Founded in {job.companyId.foundedYear}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side - Related Jobs & Apply Panel */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Apply Panel */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl shadow-xl p-6 text-white"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                ></path>
              </svg>
              Quick Apply
            </h3>
            <p className="text-blue-100 mb-4">
              Submit your application quickly for this {job.title} role at{" "}
              {job.companyId?.name}
            </p>

            {/* Application Stats */}
            <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-100">Total Applicants</span>
                <span className="font-bold">{job.applicants}</span>
              </div>
              <div className="w-full bg-blue-800 bg-opacity-40 rounded-full h-2">
                <div
                  className="bg-blue-300 h-2 rounded-full"
                  style={{
                    width: `${Math.min(100, (job.applicants / 50) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Application Status */}
            {applicationStatus && (
              <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-100">Application Status</span>
                  <span
                    className={`font-bold px-3 py-1 rounded-full text-sm ${
                      applicationStatus === "submited" ||
                      applicationStatus === "submitted"
                        ? "bg-green-500 text-white"
                        : applicationStatus === "reviewing"
                        ? "bg-yellow-500 text-white"
                        : applicationStatus === "rejected"
                        ? "bg-red-500 text-white"
                        : applicationStatus === "shortlisted"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {applicationStatus === "submited"
                      ? "Submitted"
                      : applicationStatus.charAt(0).toUpperCase() +
                        applicationStatus.slice(1)}
                  </span>
                </div>
              </div>
            )}

            {hasApplied ? (
              <div className="bg-green-500 bg-opacity-20 border border-green-300 rounded-lg p-4 flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>
                  <div className="font-semibold">Application Submitted</div>
                  <div className="text-sm text-blue-200">
                    Keep an eye on your email for updates
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={applyJob}
                className="w-full bg-white text-indigo-700 hover:text-indigo-800 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mb-4"
                disabled={job.status === "closed" || applyLoading}
              >
                {applyLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-indigo-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Applying...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      ></path>
                    </svg>
                    Apply Now
                  </>
                )}
              </button>
            )}

            <div className="mt-4">
              <div className="text-sm text-blue-200 mb-2">Share via:</div>
              <div className="flex gap-2">
                <button className="bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </button>
                <button className="bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button className="bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button
                  className="bg-white bg-opacity-10 hover:bg-opacity-20 p-2 rounded-lg transition-all duration-300"
                  onClick={shareJob}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Job Details Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Job Overview
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Salary Range</div>
                  <div className="font-medium text-gray-900">
                    {formatSalary(job.min_salary, job.max_salary)}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Job Type</div>
                  <div className="font-medium text-gray-900">{job.jobType}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">
                    Application Deadline
                  </div>
                  <div className="font-medium text-gray-900">
                    {formatDate(job.applicationDeadline)}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Location</div>
                  <div className="font-medium text-gray-900">
                    {job.location.city}, {job.location.state}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Experience Level</div>
                  <div className="font-medium text-gray-900">
                    {job.experienceLevel}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Similar Jobs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
              Similar Jobs
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Here are some similar opportunities based on your profile
            </p>
            <div className="space-y-4">
              {/* This would typically be populated from an API call with similar jobs */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 cursor-pointer">
                <h4 className="font-semibold text-indigo-700">
                  Senior Frontend Developer
                </h4>
                <p className="text-sm text-gray-600">TechCorp Inc • Remote</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-gray-900">
                    $95k - $120k
                  </span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    New
                  </span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 cursor-pointer">
                <h4 className="font-semibold text-indigo-700">
                  Backend Engineer
                </h4>
                <p className="text-sm text-gray-600">
                  DataSystems Ltd • Chicago, IL
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-gray-900">
                    $110k - $135k
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    3 days ago
                  </span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 cursor-pointer">
                <h4 className="font-semibold text-indigo-700">
                  Full Stack Developer
                </h4>
                <p className="text-sm text-gray-600">InnovateSoft • Hybrid</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-gray-900">
                    $85k - $115k
                  </span>
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                    1 week ago
                  </span>
                </div>
              </div>
            </div>

            <a
              href="/jobs/search"
              className="mt-4 text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 text-sm font-medium"
            >
              View more similar jobs
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </motion.div>

          {/* Application Tips */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Application Tips
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  Tailor your resume to highlight relevant{" "}
                  {job.skills.join(", ")} experience
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  Research {job.companyId?.name || "the company"} before your
                  interview
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  Prepare examples of your experience with{" "}
                  {job.skills.slice(0, 3).join(", ")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  Follow up within 48 hours after your interview
                </span>
              </li>
            </ul>
            <a
              href="/resources/interview-tips"
              className="mt-4 text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 text-sm font-medium"
            >
              View more application resources
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </motion.div>

          {/* Download Resume */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 border border-blue-100"
          >
            <h3 className="text-lg font-bold text-indigo-800 mb-3">
              Need help with your resume?
            </h3>
            <p className="text-indigo-600 text-sm mb-4">
              Download our expert resume template designed for {job.title} roles
            </p>
            <button className="w-full bg-white text-indigo-700 hover:text-indigo-800 border border-indigo-200 font-medium py-2.5 px-4 rounded-lg shadow hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              Download Resume Template
            </button>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default JobDetails;
