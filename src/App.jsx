import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/Login";
import Auth from "./components/Auth";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Reports from "./pages/Reports";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import ProjectForm from "./components/ProjectForm";
import TaskForm from "./components/TaskForm";
import TeamForm from "./components/TeamForm";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/api/verify-token`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then(() => setIsAuthenticated(true))
      .catch(() => {
        alert("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
          <span className="visually-hidden">Loading...</span>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const ProtectedLayout = ({ children }) => (
  <ProtectedRoute>
    <div className="d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1 p-4">{children}</div>
    </div>
  </ProtectedRoute>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/projects" element={<ProtectedLayout><Projects /></ProtectedLayout>} />
        <Route path="/projectForm" element={<ProtectedLayout><ProjectForm /></ProtectedLayout>} />
        <Route path="/taskForm" element={<ProtectedLayout><TaskForm /></ProtectedLayout>} />
        <Route path="/teamForm" element={<ProtectedLayout><TeamForm /></ProtectedLayout>} />
        <Route path="/reports" element={<ProtectedLayout><Reports /></ProtectedLayout>} />
        <Route path="/teams" element={<ProtectedLayout><Teams /></ProtectedLayout>} />
      </Routes>
    </Router>
  );
}