import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, BookOpen, Award } from "lucide-react";

const EducationForm = ({
  onSubmit,
  loading,
  initialData,
  onClose,
  editModal,
}) => {
  const [formData, setFormData] = useState({
    institution: initialData?.institution || "",
    level: initialData?.level || "bachelors",
    field_of_study: initialData?.field_of_study || "",
    description: initialData?.description || "",
    start_date: initialData?.start_date
      ? new Date(initialData.start_date).toISOString().split("T")[0]
      : "",
    end_date: initialData?.end_date
      ? new Date(initialData.end_date).toISOString().split("T")[0]
      : "",
    current: initialData?.current || false,
    grade: initialData?.grade || "",
    location: initialData?.location || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      // Clear end date if current is checked
      ...(name === "current" && checked ? { end_date: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const index = initialData?.index || editModal?.index;

    onSubmit({
      type: initialData ? "education" : "add_education",
      index: index,
      data: {
        ...formData,
        // Convert dates to ISO strings
        start_date: formData.start_date
          ? new Date(formData.start_date).toISOString()
          : null,
        end_date:
          formData.current || !formData.end_date
            ? null
            : new Date(formData.end_date).toISOString(),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Institution Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Institution Name
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
              placeholder="Enter institution name"
            />
          </div>
        </div>

        {/* Degree Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Degree Level
          </label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          >
            <option value="high_school">High School</option>
            <option value="associates">Associate's Degree</option>
            <option value="bachelors">Bachelor's Degree</option>
            <option value="masters">Master's Degree</option>
            <option value="doctorate">Doctorate</option>
            <option value="certification">Certification</option>
            <option value="diploma">Diploma</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field of Study
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="field_of_study"
              value={formData.field_of_study}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="E.g., Computer Science, Business Administration"
            />
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                formData.current ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              disabled={formData.current}
              required={!formData.current}
            />
          </div>
        </div>
      </div>

      {/* Current Status Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="current"
          checked={formData.current}
          onChange={handleChange}
          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          I am currently studying here
        </label>
      </div>

      {/* Grade */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Grade/GPA (Optional)
        </label>
        <div className="relative">
          <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="E.g., 3.8/4.0, First Class, Distinction"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location (Optional)
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="City, Country"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Describe your achievements, courses, or activities..."
        />
      </div>

      {/* Form Actions */}
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

      {/* Helper text */}
      <p className="text-xs text-gray-500 mt-2">
        All fields marked with * are required. Dates should be in MM/YYYY
        format.
      </p>
    </form>
  );
};

export default EducationForm;
