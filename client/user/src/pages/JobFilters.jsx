import React, { useState } from "react";
import { X } from "lucide-react";

const JobFilters = ({ onFiltersChange, isOpen, onClose }) => {
  const [employmentTypes, setEmploymentTypes] = useState({
    fullTime: false,
    partTime: true,
    remote: true,
    training: false,
  });

  const [seniorityLevels, setSeniorityLevels] = useState({
    student: true,
    entry: true,
    mid: false,
    senior: false,
    director: false,
    vp: false,
  });

  const [salaryRange, setSalaryRange] = useState({
    min: 10000,
    max: 500000,
    current: [10000, 500000],
  });

  const handleEmploymentTypeChange = (type) => {
    setEmploymentTypes((prev) => {
      const updated = { ...prev, [type]: !prev[type] };
      onFiltersChange?.({
        employmentTypes: updated,
        seniorityLevels,
        salaryRange,
      });
      return updated;
    });
  };

  const handleSeniorityChange = (level) => {
    setSeniorityLevels((prev) => {
      const updated = { ...prev, [level]: !prev[level] };
      onFiltersChange?.({
        employmentTypes,
        seniorityLevels: updated,
        salaryRange,
      });
      return updated;
    });
  };

  const handleSalaryChange = (type, value) => {
    setSalaryRange((prev) => {
      const updated = { ...prev, [type]: parseInt(value) || 0 };
      onFiltersChange?.({
        employmentTypes,
        seniorityLevels,
        salaryRange: updated,
      });
      return updated;
    });
  };

  const handleReset = () => {
    setEmploymentTypes({
      fullTime: false,
      partTime: false,
      remote: false,
      training: false,
    });
    setSeniorityLevels({
      student: false,
      entry: false,
      mid: false,
      senior: false,
      director: false,
      vp: false,
    });
    setSalaryRange({
      min: 10000,
      max: 500000,
      current: [10000, 500000],
    });
    onFiltersChange?.({
      employmentTypes: {},
      seniorityLevels: {},
      salaryRange: { min: 10000, max: 500000, current: [10000, 500000] },
    });
  };

  const FilterSection = ({ title, children }) => (
    <div className="p-4 border-b border-gray-200 last:border-b-0">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">{title}</h2>
      {children}
    </div>
  );

  const Checkbox = ({ label, checked, onChange, count }) => (
    <label className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="ml-2 text-gray-700">{label}</span>
      </div>
      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
        {count}
      </span>
    </label>
  );

  // Mobile bottom sheet and desktop sidebar styles
  const containerClasses = isOpen
    ? "fixed inset-x-0 bottom-0 z-50 transform translate-y-0 transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:z-0 lg:w-64"
    : "fixed inset-x-0 bottom-0 z-50 transform translate-y-full transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:z-0 lg:w-64";

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Filter content */}
      <div className={containerClasses}>
        <div className="bg-white rounded-t-2xl lg:rounded-none shadow-lg lg:shadow-none h-[85vh] lg:h-auto flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Filters</h1>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <FilterSection title="Type of Employment">
              <div className="space-y-2">
                <Checkbox
                  label="Full Time Job"
                  checked={employmentTypes.fullTime}
                  onChange={() => handleEmploymentTypeChange("fullTime")}
                  count="159"
                />
                <Checkbox
                  label="Part Time Job"
                  checked={employmentTypes.partTime}
                  onChange={() => handleEmploymentTypeChange("partTime")}
                  count="38"
                />
                <Checkbox
                  label="Remote Job"
                  checked={employmentTypes.remote}
                  onChange={() => handleEmploymentTypeChange("remote")}
                  count="50"
                />
                <Checkbox
                  label="Training Job"
                  checked={employmentTypes.training}
                  onChange={() => handleEmploymentTypeChange("training")}
                  count="15"
                />
              </div>
            </FilterSection>

            <FilterSection title="Seniority Level">
              <div className="space-y-2">
                <Checkbox
                  label="Student Level"
                  checked={seniorityLevels.student}
                  onChange={() => handleSeniorityChange("student")}
                  count="48"
                />
                <Checkbox
                  label="Entry Level"
                  checked={seniorityLevels.entry}
                  onChange={() => handleSeniorityChange("entry")}
                  count="51"
                />
                <Checkbox
                  label="Senior Level"
                  checked={seniorityLevels.senior}
                  onChange={() => handleSeniorityChange("senior")}
                  count="150"
                />
                <Checkbox
                  label="Director Level"
                  checked={seniorityLevels.director}
                  onChange={() => handleSeniorityChange("director")}
                  count="20"
                />
                <Checkbox
                  label="VP or Above"
                  checked={seniorityLevels.vp}
                  onChange={() => handleSeniorityChange("vp")}
                  count="15"
                />
              </div>
            </FilterSection>

            <FilterSection title="Salary Range">
              <div className="space-y-4">
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  value={salaryRange.current[1]}
                  onChange={(e) =>
                    handleSalaryChange("current", [
                      salaryRange.current[0],
                      e.target.value,
                    ])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={salaryRange.min}
                    onChange={(e) => handleSalaryChange("min", e.target.value)}
                    className="w-full p-2 border rounded text-center"
                    placeholder="MIN"
                  />
                  <input
                    type="text"
                    value={salaryRange.max}
                    onChange={(e) => handleSalaryChange("max", e.target.value)}
                    className="w-full p-2 border rounded text-center"
                    placeholder="MAX"
                  />
                </div>
              </div>
            </FilterSection>
          </div>

          {/* Footer with buttons */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onFiltersChange?.({
                    employmentTypes,
                    seniorityLevels,
                    salaryRange,
                  });
                  onClose?.();
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  handleReset();
                  onClose?.();
                }}
                className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobFilters;