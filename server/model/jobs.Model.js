import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({

  // Employer ID (Reference to an Employer or Company)
  employer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to Employer model
    required: true,
  },

  // Job Title and Description
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  // Company ID (Reference to Company model)
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", // Reference to Company model
    required: true,
  },

  // Date job was posted
  postedDate: {
    type: Date,
    required: true,
    default: Date.now, // default value to the current date
  },

  // Location (Object with city, state, country)
  location: {
    city: { 
      type: String,
      required: true,
    },
    state: { 
      type: String,
      required: true,
    },
    country: { 
      type: String,
      required: true,
    },
  },

  // Job Requirements
  requirement: {
    type: [String],
    required: true,
  },

  // Application Deadline
  applicationDeadline: {
    type: Date,
    required: true,
  },

  // Salary Range
  min_salary: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        return value <= this.max_salary;
      },
      message: "Min salary cannot be greater than max salary",
    },
  },
  max_salary: {
    type: Number,
    required: true,
    min: 0,
  },

  // Job Status (open or closed)
  status: {
    type: String,
    required: true,
    enum: ["open", "closed"],
  },
}, { timestamps: true });



jobsSchema.pre('save', async function(next) {
  try {
    // Find the employer user by employer_id
    const employer = await mongoose.model("User").findById(this.employer_id);
    
    // Check if the employer has the correct role
    if (employer && employer.role === "recruiter") {
      return next(); // Continue saving the job document
    } else {
      // Throw an error if the user is not a recruiter
      return next(new Error("Employer must be a recruiter."));
    }
  } catch (error) {
    return next(error); // If any error occurs, pass it to the next middleware
  }
});


const Jobs = mongoose.model("Jobs", jobsSchema);
export default Jobs;