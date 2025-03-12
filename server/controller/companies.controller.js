import Companies from "../model/companies.Model.js";
import { mongoose } from "mongoose";
// import { isAuthenticated,isAdmin ,isRecuriter } from "../middleware/auth.js";

export const createCompany = [async (req, res, next) => {
    try {
      const company = new Companies(req.body);
      await company.save();
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }];

  export const getAllCompanies = [async (req, res, next) => {
    try {
      const companies = await Companies.find();
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }];

  export const getCompanyById =[async (req, res, next) => {
    try {
      const company = await Companies.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }];

  export const updateCompanyById = [async (req, res, next) => {
    try {
      const company = await Companies.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.status(200).json(company);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }];

  export const deleteCompanyById = [async (req, res, next) => {
    try {
      const company = await Companies.findByIdAndDelete(req.params.id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }];