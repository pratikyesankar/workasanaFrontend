import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TeamForm = () => {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Create New Team</h5>
            <button type="button" className="btn-close"></button>
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Team Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Team Name"
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Add Members</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Member Name"
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Member Name"
              />
              <input
                type="text"
                className="form-control"
                placeholder="Member Name"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="button" className="btn btn-primary">
              Create
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TeamForm;
