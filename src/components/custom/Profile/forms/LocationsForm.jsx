import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, X } from "lucide-react";

const LocationsForm = ({
  onSubmit,
  loading,
  initialData,
  onClose,
  editModal,
}) => {
  const [locations, setLocations] = useState(
    initialData?.preferred_locations?.length
      ? [...initialData.preferred_locations]
      : []
  );

  const [newLocation, setNewLocation] = useState({
    city: "",
    state: "",
    country: "",
  });

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addLocation = () => {
    // Basic validation
    if (!newLocation.city || !newLocation.state || !newLocation.country) {
      alert("Please fill in all location fields");
      return;
    }

    setLocations((prev) => [...prev, { ...newLocation }]);
    setNewLocation({ city: "", state: "", country: "" });
  };

  const removeLocation = (index) => {
    setLocations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      type: "locations",
      data: {
        preferred_locations: locations,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-md font-medium text-gray-700 mb-2">
        Your Preferred Locations
      </h3>

      {/* List of current locations */}
      <div className="space-y-3 mb-4">
        {locations.length > 0 ? (
          locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 bg-sky-50 rounded-md"
            >
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-sky-600 mr-2" />
                <span>
                  {location.city}, {location.state}, {location.country}
                </span>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeLocation(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ))
        ) : (
          <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No locations added yet</p>
          </div>
        )}
      </div>

      {/* Add new location */}
      <div className="p-4 border border-gray-200 rounded-md space-y-3">
        <h4 className="font-medium text-gray-700">Add New Location</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={newLocation.city}
              onChange={handleLocationChange}
              placeholder="New York"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State/Province
            </label>
            <input
              type="text"
              name="state"
              value={newLocation.state}
              onChange={handleLocationChange}
              placeholder="NY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={newLocation.country}
              onChange={handleLocationChange}
              placeholder="USA"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <motion.button
            type="button"
            onClick={addLocation}
            className="flex items-center px-3 py-2 bg-sky-100 text-sky-700 rounded-md hover:bg-sky-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Location
          </motion.button>
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

export default LocationsForm;
