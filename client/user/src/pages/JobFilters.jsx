import React, { useState,useEffect } from "react";
import { RollerCoaster, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const JobFilters = ({ onFiltersChange, isOpen, onClose }) => {
  // Initialize state based on backend filter parameters
  const [status, setStatus] = useState({
    role: "",
    postedDate: "",
  });

  const [location, setLocation] = useState({
    city: "",
    state: "",
    country: "",
  });

  const [salaryRange, setSalaryRange] = useState({
    min: 10000,
    max: 500000,
    current: [10000, 500000],
  });

  // Handle status change
  const handleStatusChange = (field, value) => {
    setStatus((prev) => ({ ...prev, [field]: value }));
  };

  // Handle location change
  const handleLocationChange = (field, value) => {
    setLocation((prev) => {
      const updated = { ...prev, [field]: value };
      // onFiltersChange?.({
      //   status,
      //   location: updated,
      //   salaryRange,
      // });
      return updated;
    });
  };

  // Handle salary range change
  const handleSalaryChange = (type, value) => {
    setSalaryRange((prev) => {
      const updated = { ...prev, [type]: parseInt(value) || 0 };
      // onFiltersChange?.({
      //   status,
      //   location,
      //   salaryRange: updated,
      // });
      return updated;
    });
  };

  // Reset all filters
  const handleReset = () => {
    setStatus({
      open: true,
      closed: false,
    });
    setLocation({
      city: "",
      state: "",
      country: "",
    });
    setSalaryRange({
      min: 10000,
      max: 500000,
      current: [10000, 500000],
    });
    // onFiltersChange?.({
    //   status: { open: true, closed: false },
    //   location: { city: "", state: "", country: "" },
    //   salaryRange: { min: 10000, max: 500000, current: [10000, 500000] },
    // });
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
      {count && (
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {count}
        </span>
      )}
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
            <FilterSection title="Job Status">
              <div className="space-y-2">
                <Input
                  value={status.role || ""}
                  onChange={(e) => {
                    handleStatusChange("role", e.target.value);
                  }}
                  placeholder="enter a role"
                />
                <Select
                  value={status.postedDate} // ✅ Bind value properly
                  onValueChange={(value) =>
                    handleStatusChange("postedDate", value)
                  } // ✅ Handle changes correctly
                  required
                >
                  <SelectTrigger className="rounded-md border-zinc-300 focus:border-blue-500 focus:ring-blue-500 h-9 text-sm">
                    <SelectValue placeholder="posted date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Today">Today</SelectItem>
                    <SelectItem value="Yesterday">Yesterday</SelectItem>
                    <SelectItem value="1 week ago">1 week ago</SelectItem>
                    <SelectItem value="1 month ago">1 month ago</SelectItem>
                    <SelectItem value="older">older</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FilterSection>

            <FilterSection title="Location">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={location.city}
                    onChange={(e) =>
                      handleLocationChange("city", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Any city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={location.state}
                    onChange={(e) =>
                      handleLocationChange("state", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Any state"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={location.country}
                    onChange={(e) =>
                      handleLocationChange("country", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Any country"
                  />
                </div>
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
                  // onFiltersChange?.({
                  //   status,
                  //   location,
                  //   salaryRange,
                  // });
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
