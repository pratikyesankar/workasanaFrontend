 import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskForm = () => {
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
            <button type="button" className="btn-close"></button>
          </div>

          
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Select Project</label>
              <select className="form-select">
                <option>Dropdown</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Task Name</label>
              <input type="text" className="form-control" placeholder="Enter Task Name" />
            </div>

            <div className="mb-3">
              <label className="form-label">Select Team</label>
              <select className="form-select">
                <option>Dropdown</option>
              </select>
            </div>

            <div className="d-flex">
                <div className="mb-3 w-50">
              <label className="form-label">Select Due Date</label>
              <input type="date" className="form-control" />
            </div>

            <div className="mb-3 w-50">
              <label className="form-label">Estimated Time (in Days)</label>
              <input type="text" className="form-control" placeholder="Enter Time in Days" />
            </div>
            </div>
          </div>
 
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">Cancel</button>
            <button type="button" className="btn btn-primary">Create</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskForm;
