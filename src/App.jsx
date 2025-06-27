import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard"; 
import Sidebar from "./components/Sidebar";
import Reports from "./pages/Reports";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import ProjectForm from "./components/ProjectForm"
import TaskForm from "./components/TaskForm"
import TeamForm from "./components/TeamForm"

// Protected Route 
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  if (!token) {
    navigate("/admin/login");
    return null;
  }

  return children;
};

// Login Component
const Login = () => {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleLogin = async () => {
  if (!secret.trim()) {
    setError("Secret cannot be empty");
    return;
  }

  try {
    const API_URL = import.meta.env.VITE_API_URL || "https://workasana-backend-ten.vercel.app/";
    const response = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secret }),
    });

    if (!response.ok) {
      throw new Error("Invalid secret");
    }

    const data = await response.json();
    localStorage.setItem("adminToken", data.token);
    setError("");
    navigate("/dashboard");
  } catch (err) {
    setError(err.message || "Login failed. Please try again.");
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter Secret"
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

// Main App  
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="main-content flex-grow-1">
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="main-content flex-grow-1">
                  <Projects />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
          <Route
          path="/projectForm"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="main-content flex-grow-1">
                  <ProjectForm />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
          <Route
          path="/taskForm"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="main-content flex-grow-1">
                  <TaskForm />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
          <Route
          path="/teamForm"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="main-content flex-grow-1">
                  <TeamForm />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="main-content flex-grow-1">
                  <Reports />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <div className="d-flex">
                <Sidebar />
                <div className="main-content flex-grow-1">
                  <Teams />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;