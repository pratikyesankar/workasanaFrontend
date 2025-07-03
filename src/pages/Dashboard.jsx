 import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Dashboard.css";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, tasksResponse] = await Promise.all([
          axios.get(`${API_BASE}/projects`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE}/tasks`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setProjects(projectsResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_BASE, token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex-grow-1 p-4">
        {/* Search */}
        <div className="d-flex justify-content-end mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
            />
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>

        {/* Projects */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Projects <span className="text-muted">Filter</span></h2>
            <Link to="/projectForm" className="btn btn-primary">New Project</Link>
          </div>
          <div className="row">
            {projects.map((project) => (
              <div key={project._id} className="col-md-4 mb-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                    <p className="card-text text-muted">
                      Created: {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>My Tasks <span className="text-muted">Filter</span></h2>
            <Link to="/taskForm" className="btn btn-primary">New Task</Link>
          </div>
          <div className="row">
            {tasks.map((task) => (
              <div key={task._id} className="col-md-4 mb-3">
                <div className="card bg-light">
                  <div className="card-body">
                    <h6 className={task.status === "Completed" ? "text-success" : "text-warning"}>
                      {task.status}
                    </h6>
                    <h5 className="card-title">{task.name}</h5>
                    <p className="card-text">
                      Due on: {new Date(task.timeToComplete).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
