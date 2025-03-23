import { HTTPSTATUS } from "../config/https.config.js";
import Job from "../model/jobs.Model.js";
import User from "../model/user.Model.js";
import mongoose from "mongoose";
import JobSeeker from "../model/job-seeker.Model.js";

export const createJob = async (req, res, next) => {
  try {
    const body = req.body;

    const job = await Job.create({
      ...body,
      createdBy: req.user._id,
    });

    res.status(HTTPSTATUS.CREATED).json({
      success: true,
      status: HTTPSTATUS.CREATED,
      message: "Job created successfully",
      job: job,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        success: false,
        status: HTTPSTATUS.BAD_REQUEST,
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate("companyId", "name logo _id");
    if (!job) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        status: HTTPSTATUS.NOT_FOUND,
        message: "Job not found",
      });
    }

    // if (job && (!job.companyId || !job.companyId._id)) {
      
    //   await Job.findByIdAndDelete(req.params.id);

    //   return res.status(HTTPSTATUS.NOT_FOUND).json({
    //     success: false,
    //     status: HTTPSTATUS.NOT_FOUND,
    //     message: "Job deleted because its associated company no longer exists",
    //   });
    // }

    res.status(HTTPSTATUS.OK).json({
      success: true,
      status: HTTPSTATUS.OK,
      message: "Job found",
      job,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
      title,
      city,
      state,
      country,
      minSalary,
      maxSalary,
      status,
      companyId,
      includeApplicants = false,
      appliedFilter = "all", // New parameter: "all", "applied", "not-applied"
    } = req.query;

    // Build filters object
    const filters = {};

    // Text search for title
    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }

    // Location filtering - match nested properties correctly
    if (city) {
      filters["location.city"] = { $regex: city, $options: "i" };
    }

    if (state) {
      filters["location.state"] = { $regex: state, $options: "i" };
    }

    if (country) {
      filters["location.country"] = { $regex: country, $options: "i" };
    }

    // Company filtering
    if (companyId) {
      filters.companyId = companyId;
    }

    // Salary range filtering
    if (minSalary) {
      filters.max_salary = { $gte: parseInt(minSalary) };
    }

    if (maxSalary) {
      filters.min_salary = { $lte: parseInt(maxSalary) };
    }

    // Status filtering
    if (status) {
      filters.status = status;
    }

    filters.isDelete = "No";

    if (req.user && ["applied", "not-applied"].includes(appliedFilter)) {
      // Get user's applied jobs
      const user = await User.findById(req.user._id);
      
      console.log(`User found: ${!!user}`);
      
      if (user) {
        const appliedJobIds = user.appliedJobs || [];
        
        console.log(`Applied jobs count: ${appliedJobIds.length}`);
        console.log(`Applied jobs: ${JSON.stringify(appliedJobIds)}`);
        
        if (appliedFilter === "applied") {
          if (appliedJobIds.length > 0) {
            // Ensure IDs are properly converted to ObjectId
            const objectIdArray = appliedJobIds.map(id => 
              mongoose.Types.ObjectId(id.toString())
            );
            filters._id = { $in: objectIdArray };
            console.log("Applied jobs filter applied");
          } else {
            // Return no results if user hasn't applied to any jobs
            filters._id = { $in: [] };
            console.log("Empty applied jobs filter applied");
          }
        } else if (appliedFilter === "not-applied") {
          if (appliedJobIds.length > 0) {
            try {
              // Ensure IDs are properly converted to ObjectId
              const objectIdArray = appliedJobIds.map(id => 
                mongoose.Types.ObjectId(id.toString())
              );
              filters._id = { $nin: objectIdArray };
              console.log("Not-applied jobs filter applied");
            } catch (error) {
              console.error("Error converting IDs:", error);
              // Fallback - just use the original IDs
              filters._id = { $nin: appliedJobIds };
            }
          } else {
            // All jobs are "not-applied" if user hasn't applied to any
            console.log("No not-applied filter needed (user has no applications)");
          }
        }
      }
    }

    // Build sort object
    const sortOptions = {};
    sortOptions[sort] = order === "asc" ? 1 : -1;

    // Prepare the query
    let jobsQuery = Job.find(filters)
      .sort(sortOptions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate("createdBy", "name email")
      .populate("companyId", "name logo");

    // Include applicants' details if requested
    if (includeApplicants === 'true' || includeApplicants === true) {
      jobsQuery = jobsQuery.populate({
        path: "applicants_list",
        select: "user_id skills years_of_experience location job_type",
        populate: {
          path: "user_id",
          select: "name email"
        }
      });
    }

    // Execute query
    const jobs = await jobsQuery;

    // Get total count for pagination
    const totalJobs = await Job.countDocuments(filters);

    // For each job, add a field indicating if current user has applied
    const enhancedJobs = jobs.map(job => {
      const jobObj = job.toObject();
      if (req.user) {
        const user = req.user;
        jobObj.hasApplied = user.appliedJobs && user.appliedJobs.includes(job._id.toString());
      } else {
        jobObj.hasApplied = false;
      }
      return jobObj;
    });

    // Return response
    res.status(HTTPSTATUS.OK).json({
      success: true,
      status: HTTPSTATUS.OK,
      message: "Jobs retrieved successfully",
      jobs: enhancedJobs,
      pagination: {
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(totalJobs / parseInt(limit)),
        totalJobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        status: HTTPSTATUS.NOT_FOUND,
        message: "Job not found",
      });
    }

    await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(HTTPSTATUS.OK).json({
      success: true,
      status: HTTPSTATUS.OK,
      message: "Job updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        status: HTTPSTATUS.NOT_FOUND,
        message: "Job not found",
      });
    }

    await Job.findByIdAndUpdate(
      req.params.id,
      { isDelete: "Yes" },
      { new: true }
    );

    res.status(HTTPSTATUS.OK).json({
      success: true,
      status: HTTPSTATUS.OK,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getJobByCompanyId = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const sortOptions = { createdAt: -1 };

    const jobs = await Job.find({
      companyId: req.params.id,
      isDelete: "No",
    })
      .sort(sortOptions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate("createdBy", "name email")
      .populate("companyId", "name logo");

    const totalJobs = await Job.countDocuments({
      companyId: req.params.id,
      isDelete: "No",
    });

    res.status(HTTPSTATUS.OK).json({
      success: true,
      status: HTTPSTATUS.OK,
      message: "Jobs retrieved successfully",
      jobs,
      pagination: {
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(totalJobs / parseInt(limit)),
        totalJobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getJobByUserId = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const sortOptions = { createdAt: -1 };

    const jobs = await Job.find({ createdBy: req.params.id })
      .sort(sortOptions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate("createdBy", "name email")
      .populate("companyId", "name logo");

    const totalJobs = await Job.countDocuments({ createdBy: req.params.id });

    res.status(HTTPSTATUS.OK).json({
      success: true,
      status: HTTPSTATUS.OK,
      message: "Jobs retrieved successfully",
      jobs,
      pagination: {
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(totalJobs / parseInt(limit)),
        totalJobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const applyJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || job.isDelete === "Yes") {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        status: HTTPSTATUS.NOT_FOUND,
        message: "Job not found or has been deleted",
      });
    }

    if (job.status === "closed") {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        success: false,
        status: HTTPSTATUS.BAD_REQUEST,
        message: "Job applications are closed",
      });
    }

    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        success: false,
        status: HTTPSTATUS.BAD_REQUEST,
        message: "Invalid user ID format",
      });
    }
    
    // Find the user and their JobSeeker profile
    const user = await User.findById(userId);
    
    // Check if user has already applied
    if (user.appliedJobs && user.appliedJobs.includes(req.params.id)) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        success: false,
        status: HTTPSTATUS.BAD_REQUEST,
        message: "You have already applied for this job",
      });
    }
    
    // Find job seeker profile
    const jobSeeker = await JobSeeker.findOne({ user_id: userId });
    
    if (!jobSeeker) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        status: HTTPSTATUS.NOT_FOUND,
        message: "JobSeeker profile not found. Please complete your profile before applying.",
      });
    }
    
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Update job with new applicant
      await Job.findByIdAndUpdate(
        req.params.id, 
        { 
          $inc: { applicants: 1 },
          $addToSet: { applicants_list: jobSeeker._id }
        },
        { session }
      );
      
      // Update user with applied job
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { appliedJobs: req.params.id } },
        { session }
      );
      
      // Update job seeker with applied job
      await JobSeeker.findByIdAndUpdate(
        jobSeeker._id,
        { $addToSet: { applied_jobs: req.params.id } },
        { session }
      );
      
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      res.status(HTTPSTATUS.OK).json({
        success: true,
        status: HTTPSTATUS.OK,
        message: "Job applied successfully",
      });
    } catch (error) {
      // If an error occurs, abort the transaction
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const closeJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.status === "closed") {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        success: false,
        message: "Job is already closed",
      });
    }

    job.status = "closed";
    await job.save();

    res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Job closed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const reopenJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.status === "open") {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        success: false,
        message: "Job is already open",
      });
    }

    job.status = "open";
    await job.save();

    res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Job reopened successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAppliedJobsByUserId = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const sortOptions = { createdAt: -1 };

    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        success: false,
        message: "Invalid user ID format",
      });
    }
    const user = await User.findById(userId).populate({
      path: "appliedJobs",
      model: "Jobs", 
      populate: { 
        path: "companyId", 
        model: "Companies",
        select: "name logo" 
      },
    });
    if (!user) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    const totalJobs = user.appliedJobs.length;
    const appliedJobs = user.appliedJobs
      .slice((page - 1) * limit, page * limit)
      .map((job) => ({
        ...job.toObject(),
        company: job.companyId,
      }));

    res.status(HTTPSTATUS.OK).json({
      success: true,
      message: "Applied jobs retrieved successfully",
      jobs: appliedJobs,
      pagination: {
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(totalJobs / limit),
        totalJobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getJobApplicants = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    // Find the job
    const job = await Job.findById(id);
    if (!job) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        status: HTTPSTATUS.NOT_FOUND,
        message: "Job not found",
      });
    }
    
    // Verify the requester has permission (job creator or admin)
    if (job.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(HTTPSTATUS.FORBIDDEN).json({
        success: false,
        status: HTTPSTATUS.FORBIDDEN,
        message: "You don't have permission to view applicants for this job",
      });
    }
    
    // Get the applicants with pagination
    const applicants = await JobSeeker.find({ _id: { $in: job.applicants_list } })
      .populate("user_id", "name email")
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
      
    const totalApplicants = job.applicants_list.length;
    
    res.status(HTTPSTATUS.OK).json({
      success: true,
      status: HTTPSTATUS.OK,
      message: "Job applicants retrieved successfully",
      applicants,
      pagination: {
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(totalApplicants / parseInt(limit)),
        totalApplicants,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAppliedJobs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = "createdAt", order = "desc" } = req.query;
    
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        status: HTTPSTATUS.NOT_FOUND,
        message: "User not found",
      });
    }
    
    // Build sort object
    const sortOptions = {};
    sortOptions[sort] = order === "asc" ? 1 : -1;
    
    // Get applied jobs with pagination
    const appliedJobs = await Job.find({
      _id: { $in: user.appliedJobs || [] },
      isDelete: "No"
    })
      .sort(sortOptions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate("createdBy", "name email")
      .populate("companyId", "name logo");
    
    const totalAppliedJobs = await Job.countDocuments({
      _id: { $in: user.appliedJobs || [] },
      isDelete: "No"
    });
    
    res.status(HTTPSTATUS.OK).json({
      success: true,
      status: HTTPSTATUS.OK,
      message: "Applied jobs retrieved successfully",
      jobs: appliedJobs,
      pagination: {
        currentPage: parseInt(page),
        pageSize: parseInt(limit),
        totalPages: Math.ceil(totalAppliedJobs / parseInt(limit)),
        totalAppliedJobs,
      },
    });
  } catch (error) {
    next(error);
  }
};