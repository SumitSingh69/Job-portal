import React, { useState } from "react";
import { motion } from "framer-motion";

const PreferencesForm = ({ onSubmit, loading, initialData, onClose }) => {
  const [formData, setFormData] = useState({
    job_type: initialData?.job_type || "",
    expected_salary: {
      min: initialData?.expected_salary?.min || "",
      max: initialData?.expected_salary?.max || "",
      currency: initialData?.expected_salary?.currency || "USD",
    },
    preferred_location: initialData?.preferred_location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("salary_")) {
      setFormData((prev) => ({
        ...prev,
        expected_salary: {
          ...prev.expected_salary,
          [name.replace("salary_", "")]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      type: "preferences",
      data: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Type
        </label>
        <select
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">Select Job Type</option>
          <option value="full_time">Full Time</option>
          <option value="part_time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expected Salary Range
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="salary_min"
            placeholder="Min"
            value={formData.expected_salary.min}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="number"
            name="salary_max"
            placeholder="Max"
            value={formData.expected_salary.max}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Location
        </label>
        <input
          type="text"
          name="preferred_location"
          value={formData.preferred_location}
          onChange={handleChange}
          placeholder="e.g., New York, Remote"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <motion.button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className={`px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 flex items-center ${
            loading ? "opacity-75 cursor-not-allowed" : ""
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </motion.button>
      </div>
    </form>
  );
};

export default PreferencesForm;
