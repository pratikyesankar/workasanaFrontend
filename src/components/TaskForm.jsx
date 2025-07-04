import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const TaskForm = () => {
  const [project, setProject] = useState("");
  const [taskName, setTaskName] = useState("");
  const [team, setTeam] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async () => {
    try {
      const taskData = {
        project,
        name: taskName,
        team,
        dueDate,
        estimatedTime: estimatedTime ? parseInt(estimatedTime) : null,
      };

      const response = await axios.post("https://workasana-frontend-two.vercel.app/tasks", taskData);
      setSuccess("Task created successfully!");
      setError(null);
       
      setProject("");
      setTaskName("");
      setTeam("");
      setDueDate("");
      setEstimatedTime("");
    } catch (err) {
      setError("Failed to create task. Please try again.");
      setSuccess(null);
    }
  };

  const handleCancel = () => {
    
    setProject("");
    setTaskName("");
    setTeam("");
    setDueDate("");
    setEstimatedTime("");
    setError(null);
    setSuccess(null);
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
            <h5 className="modal-title">Create New Task | Create Moodboard</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCancel}
            ></button>
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="mb-3">
              <label className="form-label">Select Project</label>
              <select
                className="form-select"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              >
                <option value="">Select Project</option>
                 
                <option value="project1">Project 1</option>
                <option value="project2">Project 2</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Task Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Select Team</label>
              <select
                className="form-select"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option value="">Select Team</option>
               
                <option value="team1">Team 1</option>
                <option value="team2">Team 2</option>
              </select>
            </div>

            <div className="d-flex">
              <div className="mb-3 w-50">
                <label className="form-label">Select Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="mb-3 w-50">
                <label className="form-label">Estimated Time (in Days)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Time in Days"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;