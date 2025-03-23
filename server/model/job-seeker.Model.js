import mongoose from "mongoose";

const jobseekerSchema = new mongoose.Schema({
  // User Information
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  // Resume and Profile Picture
  resume: {
    type: String,
    required: true,
    match: [
      /^(https?:\/\/.*\.(?:pdf|docx|txt))$/,
      "Please provide a valid resume URL",
    ],
  },
  photo: {
    type: String,
    required: true,
    match: [
      /^(https?:\/\/.*\.(?:jpg|jpeg|png|gif))$/,
      "Please provide a valid photo URL",
    ],
  },

  // Skills and Experience
  skills: {
    type: [String],
    required: true,
  },
    
  years_of_experience: {
    type: Number,
    required: true,
    min: 0,
  },

  // Location Preferences
  location: {
    city: {
      type: String,
      default: "Not specified"
    },
    state: {
      type: String,
      default: "Not specified",
    },
    country: {
      type: String,
      default: "Not specified",
    },
  },
  preferred_locations: [
    {
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
  ],

  // Salary Expectations and Job Type
  expected_salary: {
    min: {
      type: Number,
      min: 0,
    },
    max: {
      type: Number,
      min: 0,
    },
  },
  availability_status: {
    type: String,
    enum: ["immediately", "within_a_month", "3_months", "not_available"],
    default: "immediately",
  },
    
  job_type: {
    type: String,
    required: true,
    enum: ["full_time", "part_time", "internship"],
  },

  // Track applied jobs
  applied_jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs"
  }]
}, { timestamps: true });

// Add indexes for better query performance
jobseekerSchema.index({ user_id: 1 });
jobseekerSchema.index({ skills: 1 });
jobseekerSchema.index({ years_of_experience: 1 });
jobseekerSchema.index({ "location.country": 1 });
jobseekerSchema.index({ job_type: 1 });

const JobSeeker = mongoose.model("JobSeeker", jobseekerSchema);
export default JobSeeker;