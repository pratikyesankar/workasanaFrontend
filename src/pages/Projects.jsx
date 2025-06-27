import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";

function Projects() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("https://workasana-backend-ten.vercel.app/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <div className="container-fluid p-4">
      
      <div className="mb-4">
        <h2>Create Moodboard</h2>
        <p className="text-muted">
          This project centers around compiling a digital moodboard to set the visual direction and tone for a new brand identity.
        </p>
      </div>

       
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <span>Sort by: </span>
          <button className="btn btn-outline-secondary btn-sm me-2">Priority Low-High</button>
          <button className="btn btn-outline-secondary btn-sm me-2">Priority High-Low</button>
          <button className="btn btn-outline-secondary btn-sm me-2">Newest First</button>
          <button className="btn btn-outline-secondary btn-sm">Oldest First</button>
        </div>
        <div>
          <button className="btn btn-outline-secondary btn-sm me-2">Filter</button>
          <Link to="/taskForm" className="btn btn-primary">
              New Task
            </Link>
        </div>
      </div>

      
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Owners</th>
              <th>Tags</th>
              <th>Time to Complete</th>
              <th>Due Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id}>
                <td>{task.name}</td>
                <td>
                  {task.owners.map((id, index) => (
                    <span key={id} className="badge bg-secondary me-1">
                      Owner {index + 1}
                    </span>
                  ))}
                </td>
                <td>
                  {task.tags.map(tag => (
                    <span key={tag} className="badge bg-info text-dark me-1">
                      {tag}
                    </span>
                  ))}
                </td>
                <td>{task.timeToComplete} days</td>
                <td>{new Date(task.createdAt).toLocaleDateString("en-GB")}</td>
                <td>
                  <span className={`badge ${
                    task.status === "Completed" ? "bg-success" :
                    task.status === "In Progress" ? "bg-warning text-dark" :
                    "bg-secondary"
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-link text-decoration-none">✖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Projects;
