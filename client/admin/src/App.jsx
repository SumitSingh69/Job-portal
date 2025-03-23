import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";

import "./App.css";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import { AuthContext, AuthProvider } from "./context/AuthContext";

const Jobs = () => <div>Jobs Page Content</div>;
const Applicants = () => <div>Applicants Page Content</div>;
const Companies = () => <div>Companies Page Content</div>;
const Reports = () => <div>Reports Page Content</div>;
const Settings = () => <div>Settings Page Content</div>;

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />
      
      {/* Protected routes */}
      <Route path="/home" element={
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      } />
      
      <Route path="/jobs" element={
        <AdminRoute>
          <Jobs />
        </AdminRoute>
      } />
      
      <Route path="/applicants" element={
        <AdminRoute>
          <Applicants />
        </AdminRoute>
      } />
      
      <Route path="/companies" element={
        <AdminRoute>
          <Companies />
        </AdminRoute>
      } />
      
      <Route path="/reports" element={
        <AdminRoute>
          <Reports />
        </AdminRoute>
      } />
      
      <Route path="/settings" element={
        <AdminRoute>
          <Settings />
        </AdminRoute>
      } />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;