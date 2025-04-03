import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const SkillsForm = ({ onSubmit, loading, initialData, onClose }) => {
  const [skills, setSkills] = useState(initialData?.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      type: "skills",
      data: { skills },
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Skills
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 text-sky-600 hover:text-sky-800"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a skill"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 bg-sky-100 text-sky-600 rounded-md hover:bg-sky-200 transition-colors duration-200"
          >
            Add
          </button>
        </div>
      </div>

      {/* Certifications section */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Certifications (Optional)
        </label>
        <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
          You can add certifications from the Certifications tab.
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

      {/* Helper text */}
      <p className="text-xs text-gray-500 mt-2">
        Press Enter or click Add to add a new skill. Click × to remove a skill.
      </p>
    </form>
  );
};

export default SkillsForm;
