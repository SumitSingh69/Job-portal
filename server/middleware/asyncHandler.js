import { HTTPSTATUS } from "../config/https.config";

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log(`Error occurred at path ${req.path}:`, error);
      return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    });
  };
  
  export default asyncHandler;
  