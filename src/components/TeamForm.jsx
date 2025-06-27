import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const TeamForm = () => {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState(["", "", ""]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleSubmit = async () => {
    try {
      const teamData = {
        name: teamName,
        members: members.filter(member => member.trim() !== ""),  
      };

      const response = await axios.post("https://workasana-backend-ten.vercel.app/teams", teamData);
      setSuccess("Team created successfully!");
      setError(null);
    
      setTeamName("");
      setMembers(["", "", ""]);
    } catch (err) {
      setError("Failed to create team. Please try again.");
      setSuccess(null);
    }
  };

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
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                setTeamName("");
                setMembers(["", "", ""]);
                setError(null);
                setSuccess(null);
              }}
            ></button>
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="mb-3">
              <label className="form-label">Team Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Add Members</label>
              {members.map((member, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control mb-2"
                  placeholder="Member Name"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setTeamName("");
                setMembers(["", "", ""]);
                setError(null);
                setSuccess(null);
              }}
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

export default TeamForm;