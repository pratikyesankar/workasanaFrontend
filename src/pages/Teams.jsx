 import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Teams = () => {
  const [teams, setTeams] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("authToken"); 
        if (!token) {
          setError("No authentication token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:4000/teams", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setTeams(response.data); 
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError("Failed to fetch teams. Please try again later.");  
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);  

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error}
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="md-2 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Teams</h2>
              <Link to="/teamForm" className="btn btn-primary">New Team</Link>
            </div>
            <div className="alert alert-info text-center" role="alert">
              No teams found. Create a new team!
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Content */}
        <div className="md-2 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Teams</h2>
            <Link to="/teamForm" className="btn btn-primary">New Team</Link>
          </div>
          <div className="row">
            {teams.map((team) => ( // Render 'teams' state, not 'sampleTeams'
              <div key={team._id} className="col-md-4 mb-4">
                <div className="card bg-body-secondary h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h4 className="card-title">{team.name}</h4>
                    <div className="d-flex justify-content-center mb-2">
                       
                      {team.members && team.members.slice(0, 3).map((member, index) => ( 
                        <span
                          key={member._id || index}  
                          className="badge rounded-circle bg-primary text-white me-1"
                          style={{ width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                          title={member.name}  
                        >
                          {member.name ? member.name.charAt(0).toUpperCase() : '?'}
                        </span>
                      ))}
                      {team.members && team.members.length > 3 && ( 
                        <span className="text-muted ms-1 d-flex align-items-center">
                          +{team.members.length - 3}
                        </span>
                      )}
                      {(!team.members || team.members.length === 0) && (
                        <span className="text-muted fst-italic">No members</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;