const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log(`Error occurred at path ${req.path}:`, error);
      next(error);  // Passing the error to the next middleware
    });
  };
  
  export default asyncHandler;
  