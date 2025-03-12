import Jobs from '../model/jobs.Model.js';
import { mongoose } from 'mongoose';
// import { isRecuriter,isAuthenticated } from '../middleware/auth.js';

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    
    const jobs = await Jobs.find();

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Get all jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const searchJobs = async (req, res, next) => {
  try {
    console.log("Query Parameters: ", req.query); // Debugging line

    const { title, location, companyId, status, min_salary, max_salary, postedDate, applicationDeadline } = req.query;
    let searchQuery = {};

    if (title) {
      searchQuery.title = { $regex: title, $options: "i" };
    }
    if (location) {
      searchQuery.location = { $regex: location, $options: "i" };
    }
    if (companyId) {
      searchQuery.companyId = companyId;
    }
    if (status) {
      searchQuery.status = status;
    }
    if (min_salary || max_salary) {
      searchQuery.min_salary = { $gte: min_salary || 0 };
      searchQuery.max_salary = { $lte: max_salary || Infinity };
    }
    if (postedDate) {
      searchQuery.postedDate = { $gte: new Date(postedDate) };
    }
    if (applicationDeadline) {
      searchQuery.applicationDeadline = { $lte: new Date(applicationDeadline) };
    }

    const jobs = await Jobs.find(searchQuery);

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



export const createJob = [async (req, res, next) => {

  try {
    const {
      employer_id, title, location, description, companyId, status, min_salary, max_salary, postedDate, applicationDeadline, requirement =[],
    } = req.body;

    if (!employer_id || !title || !location || !companyId || !description ||!postedDate) {
      return res.status(400).json({
        message: "title, location, companyId, and postedDate are required",
      });
    }

    const jobPostedDate = postedDate ? new Date(postedDate) : new Date();
    const newJob = new Jobs({
      employer_id,
      title,
      location,
      companyId,
      description,
      status,
      requirement,
      min_salary,
      max_salary,
      postedDate: jobPostedDate,
      applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
    });

    const savedJob = await newJob.save();
    res.status(201).json({
      message: "Job created successfully",
      job: savedJob,
    });
  } catch (error) {
    console.error("Job not created", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}];

export const updateJob = [async (req, res, next) => {
  try {
 
    const { id } = req.params;
    const updateData = req.body;
    

    const updatedJob = await Jobs.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Update job error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}];

export const deleteJob = [async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const deletedJob = await Jobs.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'No Job found' });
    }
    res.status(200).json({ message: 'Job deleted successfully'});
  } catch (error) {
    console.error("Error in Deleting Job", error);
    res.status(500).json({ 
      message: "Server error",
       error: error.message });
  }
}];
