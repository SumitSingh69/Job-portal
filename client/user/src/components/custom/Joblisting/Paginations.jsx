import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center gap-1">
        <button
          className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        
        <button
          className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;