
export const isAuthenticated = (req, res, next) => {
  console.log(req.session.userLoggedIn)
    if (!req.session || !req.session.userLoggedIn ) {
      return res.status(401).json({ message: "User not Authenticated" });
    }
    next();
  };
  
 
  export const isAdmin = (req, res, next) => {
    if (req.session.userRole !== 'Admin') {
      return res.status(403).json({ message:"Unauthorized: Only recruiters can create jobs" });
    }
    next(); 
  };

  export const isRecuriter = (req, res, next) => {
  
    if (req.session.userRole !== "recuriter") {
      return res.status(403).json({ message: "Forbidden: Recuriter only" });
    }
    next();
  };
 