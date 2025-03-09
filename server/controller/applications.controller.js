import Applications from "../model/applications.Model.js";
import { mongoose } from "mongoose";
import { isAuthenticated,isAdmin,isRecuriter } from "../middleware/auth.js";

export const createApplication =[isAuthenticated , async (req ,res, next) => {
  try {
    const application = new Applications(req.body);
    await application.save();
    res.status(201).json(application);
    } catch (error) {
    res.status(400).json({ message: error.message });
  }
}]; 

export const getAllApplications = [isAuthenticated ,isRecuriter ,async (req, res, next) => {
  try {
    const applications = await Applications.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

export const getApplicationById = [isAuthenticated , isRecuriter ,async (req, res, next) => {
  try {
    const application = await Applications.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

export const updateApplicationById = [isAuthenticated,async (req, res, next) => {
  try {
    const application = await Applications.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}];

export const deleteApplicationById = [isAuthenticated,isRecuriter,async (req, res, next) => {
  try {
    const application = await Applications.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];
