import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Award, Link, Globe } from "lucide-react";

const CertificationForm = ({
  onSubmit,
  loading,
  initialData,
  onClose,
  editModal,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    issuing_organization: initialData?.issuing_organization || "",
    issue_date: initialData?.issue_date
      ? new Date(initialData.issue_date).toISOString().split("T")[0]
      : "",
    expiry_date: initialData?.expiry_date
      ? new Date(initialData.expiry_date).toISOString().split("T")[0]
      : "",
    never_expires: initialData?.never_expires || false,
    credential_id: initialData?.credential_id || "",
    credential_url: initialData?.credential_url || "",
    description: initialData?.description || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      // Clear expiry date if never_expires is checked
      ...(name === "never_expires" && checked ? { expiry_date: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const index = initialData?.index || editModal?.index;

    onSubmit({
      type: initialData ? "certification" : "add_certification",
      index: index,
      data: {
        ...formData,
        // Convert dates to ISO strings
        issue_date: formData.issue_date
          ? new Date(formData.issue_date).toISOString()
          : null,
        expiry_date:
          formData.never_expires || !formData.expiry_date
            ? null
            : new Date(formData.expiry_date).toISOString(),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Certificate Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certification Name
          </label>
          <div className="relative">
            <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
              placeholder="e.g., AWS Certified Solutions Architect"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issuing Organization
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="issuing_organization"
              value={formData.issuing_organization}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
              placeholder="e.g., Amazon Web Services"
            />
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              name="issue_date"
              value={formData.issue_date}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                formData.never_expires ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              disabled={formData.never_expires}
            />
          </div>
        </div>
      </div>

      {/* Never Expires Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="never_expires"
          checked={formData.never_expires}
          onChange={handleChange}
          className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">
          This certification doesn't expire
        </label>
      </div>

      {/* Credential ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Credential ID (Optional)
        </label>
        <input
          type="text"
          name="credential_id"
          value={formData.credential_id}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="e.g., ABC123XYZ"
        />
      </div>

      {/* Credential URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Credential URL (Optional)
        </label>
        <div className="relative">
          <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="url"
            name="credential_url"
            value={formData.credential_url}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="https://www.example.com/verify/ABC123XYZ"
          />
        </div>
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
          placeholder="Describe what this certification covers or skills you gained..."
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
        All fields marked with * are required.
      </p>
    </form>
  );
};

export default CertificationForm;
