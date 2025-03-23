import { Router } from "express";
import { createJob, getJobById, getAllJobs, updateJob, deleteJob, getJobByCompanyId, getJobByUserId, applyJob, getAppliedJobsByUserId, closeJob, reopenJob } from "../controller/job.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";
import { isAnyRecruiterOrAdmin, isAnyRecruiterOrAdminOrJobseeker } from "../middleware/role.middleware.js";

const router = Router();

router.post("/job/create", verifyAccessToken, isAnyRecruiterOrAdmin, createJob);
router.get("/job/:id", verifyAccessToken, isAnyRecruiterOrAdmin, getJobById);
router.get("/jobs", getAllJobs);

router.put("/job/:id", verifyAccessToken, isAnyRecruiterOrAdminOrJobseeker , updateJob);
router.post("/job/delete/:id", verifyAccessToken, isAnyRecruiterOrAdmin, deleteJob);
router.get("/jobs/company/:id", getJobByCompanyId);
router.get("/jobs/user/:id", getJobByUserId);

router.post("/job/apply/:id", verifyAccessToken, isAnyRecruiterOrAdminOrJobseeker, applyJob);
router.get("/job/applied/user", verifyAccessToken, isAnyRecruiterOrAdminOrJobseeker, getAppliedJobsByUserId);

router.post("/job/close/:id", verifyAccessToken, isAnyRecruiterOrAdmin , closeJob);
router.post("/job/reopen/:id", verifyAccessToken, isAnyRecruiterOrAdmin, reopenJob);

export default router;
