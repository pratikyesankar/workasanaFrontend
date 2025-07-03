import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleCreateProject = async () => {
    if (!projectName.trim() || !projectDescription.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/projects", {
        name: projectName,
        description: projectDescription,
      });

      alert("Project created successfully!");
      console.log(response.data);
      setProjectName("");
      setProjectDescription("");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Create New Project</h5>
            <button type="button" className="btn-close"></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Project Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Project Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleCreateProject}>
              Create
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
