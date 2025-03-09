import Jobseeker from "../model/job-seeker.Model.js";
import { mongoose } from "mongoose";
import {isAuthenticated,isAdmin} from "../middleware/auth.js";


export const createJobseeker =[isAuthenticated ,async (req, res, next) => {
  try {
    const jobseeker = new Jobseeker(req.body);
    await jobseeker.save();
    res.status(201).json(jobseeker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}];

export const getAllJobseekers = [isAuthenticated,isAdmin ,async (req, res, next) => {
  try {
    const jobseekers = await Jobseeker.find();
    res.status(200).json(jobseekers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

export const getJobseekerById = [isAuthenticated ,isAdmin ,async (req, res, next) => {
  try {
    const jobseeker = await Jobseeker.findById(req.params.id);
    if (!jobseeker) {
      return res.status(404).json({ message: "Jobseeker not found" });
    }
    res.status(200).json(jobseeker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

export const updateJobseekerById = [isAuthenticated, async (req, res, next) => {
  try {
    const jobseeker = await Jobseeker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!jobseeker) {
      return res.status(404).json({ message: "Jobseeker not found" });
    }
    res.status(200).json(jobseeker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}];

export const deleteJobseekerById = [isAuthenticated ,isAdmin ,async (req, res, next) => {
  try {
    const jobseeker = await Jobseeker.findByIdAndDelete(req.params.id);
    if (!jobseeker) {
      return res.status(404).json({ message: "Jobseeker not found" });
    }
    res.status(200).json({ message: "Jobseeker deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];
