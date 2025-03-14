import { Router } from "express";
import { createJob, getJobById, getAllJobs, updateJob, deleteJob, getJobByCompanyId, getJobByUserId } from "../controller/job.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import { isAnyRecruiterOrAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.post("/job/create", verifyAccessToken, isAnyRecruiterOrAdmin, createJob);
router.get("/job/:id", verifyAccessToken, isAnyRecruiterOrAdmin, getJobById);
router.get("/jobs", getAllJobs);

router.put("/job/:id", verifyAccessToken, isAnyRecruiterOrAdmin, updateJob);
router.post("/job/delete/:id", verifyAccessToken, isAnyRecruiterOrAdmin, deleteJob);
router.get("/jobs/company/:id", getJobByCompanyId);
router.get("/jobs/user/:id", getJobByUserId);

export default router;
