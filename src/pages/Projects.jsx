 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "https://workasana-backend-ten.vercel.app";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_URL}/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          throw new Error(`Unexpected server response: ${text}`);
        }
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            console.error("Unauthorized access, redirecting to login");
            localStorage.clear();
            navigate("/login");
            return;
          }
          throw new Error(data.error || "Failed to fetch projects");
        }
        setProjects(data);
      } catch (err) {
        setError(err.message);
        console.error("Projects fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [navigate]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="md-2 p-4">
          <h2>Create Moodboard</h2>
          <p>This project centers around compiling a digital moodboard to set the visual direction and tone for a new brand identity. The moodboard will showcase a curated selection of images, color palettes, typography samples, textures, and layout inspirations that collectively evoke the brand's intended mood and style.</p>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center flex-wrap gap-2">
                <span className="me-2 fw-semibold">Sort by:</span>
                  <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                     Priority Low-High
                   </button>
                 <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                      Priority High-Low
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                         Newest First
                   </button>
                   <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                      Oldest First
                    </button>
              </div>

                   <button className="btn btn-primary btn-sm" onClick={() => navigate("/projectForm")}>
                      + New Task
                   </button>
            </div>


          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Tasks</th>
                  <th>Owner</th>
                  <th>Priority</th>
                  <th>Due On</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Create Filter feature</td>
                  <td>
                    <span className="badge rounded-circle bg-primary text-white me-1" style={{ width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>JD</span>
                    <span className="text-muted">+2</span>
                  </td>
                  <td><span className="badge bg-light text-danger border border-danger">P High</span></td>
                  <td>20 Dec, 2024</td>
                  <td><span className="badge bg-success">Completed</span></td>
                  <td><span className="text-secondary">&rarr;</span></td>
                </tr>
                <tr>
                  <td>Create Filter feature</td>
                  <td>
                    <span className="badge rounded-circle bg-warning text-white me-1" style={{ width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>UT</span>
                  </td>
                  <td><span className="badge bg-light text-success border border-success">P Low</span></td>
                  <td>20 Dec, 2024</td>
                  <td><span className="badge bg-warning text-dark">In Progress</span></td>
                  <td><span className="text-secondary">&rarr;</span></td>
                </tr>
                <tr>
                  <td>Create Filter feature</td>
                  <td>
                    <span className="badge rounded-circle bg-info text-white me-1" style={{ width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>JS</span>
                  </td>
                  <td><span className="badge bg-light text-primary border border-primary">P Medium</span></td>
                  <td>20 Dec, 2024</td>
                  <td><span className="badge bg-warning text-dark">In Progress</span></td>
                  <td><span className="text-secondary">&rarr;</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
