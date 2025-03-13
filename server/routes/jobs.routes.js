import { Router } from "express";
import { createJob, getJobById, getAllJobs, updateJob } from "../controller/job.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import { isAnyRecruiterOrAdmin } from "../middleware/role.middleware.js";

const router = Router();

router.post("/job/create", verifyAccessToken, isAnyRecruiterOrAdmin, createJob);
router.get("/job/:id", verifyAccessToken, isAnyRecruiterOrAdmin, getJobById);
router.get("/jobs", getAllJobs);

router.put("/job/:id", verifyAccessToken, isAnyRecruiterOrAdmin, updateJob);

export default router;
