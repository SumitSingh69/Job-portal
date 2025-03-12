import mongoose from "mongoose";

const companiesSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
  // Company Details
  companyType: {
    type: String,
    required: true,
  },
  founder: {
    type: String,
    required: true,
  },
  founded: {
    type: Date,
    required: true,
  },

  // Location
  location: {
    type: String,
    required: true,
  },
  headquarter: {
    type: [String],
    required: true,
  },

  // Contact Information
  contact_email: {
    type: String,
    required: true,
  },
  contact_phone: {
    type: String,
    required: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'],
  },

  // Media
  website: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },

  // Company Size
  size: {
    type: String,
    required: true,
    enum: ["small", "medium", "large"],
  },

  // Timestamps
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Update `updated_at` field when the document is modified
companiesSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.updated_at = Date.now();
  }
  next();
});

const Companies = mongoose.model("Companies", companiesSchema);
export default Companies;
