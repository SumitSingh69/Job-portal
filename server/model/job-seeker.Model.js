import mongoose from "mongoose";

const jobseekerSchema = new mongoose.Schema({
  job_seeker_id: {
    type: String,
    required: true,
    unique: true,
  },
  resume: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  year_of_experience: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
    default: "Not specified",
  },
  preferred_location: {
    type: [String],
    default: [],
  },
  expected_salary: {
    type: Number,
    min: 0,
  },
  job_type: {
    type: String,
    required: true,
    enum: ["full_time", "part_time", "internship"],
  },
});

const Jobseeker = mongoose.model("Jobseeker", jobseekerSchema);
export default Jobseeker;
