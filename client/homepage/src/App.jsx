import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Jobs from "./components/Jobs";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import JobBoard from "./pages/Joblisting";
import JobFilters from "./pages/JobFilters";
import About from "./components/About";


const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
     
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="about" element={<About />} />
                <Route path="jobs" element={<JobBoard />} />
                <Route path="contact" element={<Contact />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
