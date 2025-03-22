import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import JobBoard from "./pages/Joblisting";
import JobFilters from "./pages/JobFilters";
import About from "./components/About";
import JobDetails from "./pages/JobDetails";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow  px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth pages without the Layout wrapper */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Routes with the Layout wrapper */}
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/job-filters" element={<JobFilters />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobDetails" element={<JobDetails />} />
          {/* Catch-all route for 404 pages */}
          <Route path="*" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;