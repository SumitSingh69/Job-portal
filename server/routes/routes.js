import express from 'express';
import { login, signUp ,updateUser,deleteUser } from '../controller/user.controller.js';
import { createJob, deleteJob, updateJob ,getJobById,getAllJobs,searchJobs} from '../controller/job.controller.js';
import { createApplication,getAllApplications,getApplicationById,updateApplicationById,deleteApplicationById } from '../controller/applications.controller.js';
import { createCompany,getAllCompanies,getCompanyById,updateCompanyById,deleteCompanyById } from '../controller/companies.controller.js';
import { createJobseeker,getAllJobseekers,getJobseekerById,updateJobseekerById,deleteJobseekerById } from '../controller/job-seeker.controller.js';
import { isAuthenticated ,isAdmin ,isRecuriter } from '../middleware/auth.js';
import { createAdmin ,updateAdmin ,deleteAdmin} from '../controller/adminController.js';
const router = express.Router();

router.post('/user/signup',signUp)
router.post('/user/login',login)
router.put('/user/:id',isAuthenticated,updateUser)  
router.delete('/user/:id',isAdmin,deleteUser)

router.post('/job/create',isRecuriter, createJob);
router.delete('/job/delete/:id',isAuthenticated,isRecuriter ,deleteJob);
router.put('/job/update/:id',isAuthenticated,isRecuriter ,updateJob);
router.get('/job', getAllJobs)
router.get('/job/get/:id', getJobById)
router.get('/job/search', searchJobs)

router.post('/application', createApplication);
router.get('/applications', getAllApplications);
router.get('/applications/:id', getApplicationById);
router.put('/applications/:id', updateApplicationById);
router.delete('/applications/:id', deleteApplicationById);

router.post('/companies', createCompany);
router.get('/companies', getAllCompanies);
router.get('/companies/:id', getCompanyById);
router.put('/companies/:id', updateCompanyById);
router.delete('/companies/:id', deleteCompanyById);

router.post('/jobseekers', createJobseeker);
router.get('/jobseekers', getAllJobseekers);
router.get('/jobseekers/:id', getJobseekerById);
router.put('/jobseekers/:id', updateJobseekerById);
router.delete('/jobseekers/:id', deleteJobseekerById);

router.post('/admin/create',isAdmin, createAdmin);
router.put('/admin/update', isAdmin, updateAdmin)
router.delete('/admin/delete/:id', isAdmin, deleteAdmin)

export default router;

