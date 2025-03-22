import React from "react";

const JobDetails = () => {
  const job = {
    role: "Frontend Developer",
    company: "Tech Innovators Inc.",
    location: "Remote",
    salaryRange: "$60,000 - $80,000 per year",
    description:
      "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building and maintaining the UI components of our web applications.",
    skillsRequired: ["React", "JavaScript", "CSS", "HTML", "Redux"],
    datePosted: "March 20, 2025",
    applicants: 120,
    positions: 3,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <main className="w-full max-w-6xl flex mt-6 space-x-6">
        <div className="w-2/3 space-y-6">
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
            <div className="border-b pb-4 flex items-center relative">
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full mr-4 absolute top-2">
                <span className="text-lg font-bold text-gray-700">Logo</span>
              </div>
              <div className="ml-20">
                <h2 className="text-2xl font-bold text-gray-800">{job.role}</h2>
                <p className="text-gray-600">{job.company} · Remote</p>
                <div className="text-gray-500 mt-2 space-y-1">
                  <p>Posted: {job.datePosted}</p>
                  <p>Applicants: {job.applicants}</p>
                  <p>🎯 Positions Available: {job.positions}</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold transition-all duration-300">
                Apply
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
            <p className="text-gray-700 mt-4"><strong>🛠 Skills Required:</strong> {job.skillsRequired.join(", ")}</p>
          </div>
        </div>
        <aside className="w-1/3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Jobs you might be interested in</h3>
          <div className="space-y-4">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-800">Job Title {index + 1}</h4>
                  <p className="text-gray-600">Company Name · Remote</p>
                  <p className="text-gray-500 text-sm">Posted {index + 1} days ago</p>
                </div>
                <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
                  <span className="text-xs font-bold text-gray-700">Logo</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default JobDetails;