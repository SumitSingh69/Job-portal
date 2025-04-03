import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Clock } from "lucide-react";

const JobTypeForm = ({
  onSubmit,
  loading,
  initialData,
  onClose,
  editModal,
}) => {
  const [formData, setFormData] = useState({
    job_type: initialData?.job_type || "",
    availability_status: initialData?.availability_status || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      type: "jobType",
      data: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Type
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Select Job Type</option>
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
            <option value="temporary">Temporary</option>
            <option value="remote">Remote</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Availability Status
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            name="availability_status"
            value={formData.availability_status}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Select Availability</option>
            <option value="immediately_available">Immediately Available</option>
            <option value="available_in_2_weeks">Available in 2 Weeks</option>
            <option value="available_in_1_month">Available in 1 Month</option>
            <option value="actively_looking">Actively Looking</option>
            <option value="open_to_offers">Open to Offers</option>
            <option value="not_available">Not Available</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <motion.button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className={`px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 flex items-center justify-center min-w-[100px] transition-colors duration-200 ${
            loading ? "opacity-75 cursor-not-allowed" : ""
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default JobTypeForm;
