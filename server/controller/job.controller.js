import { HTTPSTATUS } from "../config/https.config.js";
import Job from "../model/jobs.Model.js";

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
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        success: false,
        status: HTTPSTATUS.NOT_FOUND,
        message: "Job not found",
      });
    }

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

    // Build sort object
    const sortOptions = {};
    sortOptions[sort] = order === "asc" ? 1 : -1;

    // Execute query with pagination
    const jobs = await Job.find(filters)
      .sort(sortOptions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate("createdBy", "name email")
      .populate("companyId", "name logo");

    const totalJobs = await Job.countDocuments(filters);

    // Return response
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

    await Job.findByIdAndUpdate(req.params.id, { isDelete: "Yes" }, { new: true });

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
      isDelete: "No"
    })
      .sort(sortOptions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate("createdBy", "name email")
      .populate("companyId", "name logo");

    const totalJobs = await Job.countDocuments({
      companyId: req.params.id,
      isDelete: "No"
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

