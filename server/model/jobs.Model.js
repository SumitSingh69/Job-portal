import mongoose, { isValidObjectId } from "mongoose";

const jobsSchema = new mongoose.Schema({
  id :{
    type:mongoose.Schema.ObjectId,
    required:true
  },
  employer_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  requirement: {
    type: [String],
    required: true,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  min_salary: {
    type: Number,
    required: true,
    min: 0,
  },
  max_salary: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    required: true,
    enum: ["open", "close"],
  },
});

const Jobs = mongoose.model("Jobs", jobsSchema);

export default Jobs;