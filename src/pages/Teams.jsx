 import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:4000/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;

  // Sample team data structure (assuming API returns name and members)
  const sampleTeams = [
    { _id: "1", name: "Design Team", members: [{ initial: "K", count: 2 }, { initial: "O", count: 1 }] },
    { _id: "2", name: "Development Team", members: [{ initial: "K", count: 2 }, { initial: "G", count: 1 }] },
    { _id: "3", name: "Marketing Team", members: [{ initial: "M", count: 2 }, { initial: "O", count: 1 }] },
  ];

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
            {sampleTeams.map((team) => (
              <div key={team._id} className="col-md-4 mb-4">
                <div className="card bg-body-secondary h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h4 className="card-title">{team.name}</h4>
                    <div className="d-flex justify-content-center mb-2">
                      {team.members.map((member, index) => (
                        <span
                          key={index}
                          className="badge rounded-circle bg-primary text-white me-1"
                          style={{ width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                        >
                          {member.initial}
                        </span>
                      ))}
                      <span className="text-muted">{team.members.length > 1 ? `+${team.members[1].count}` : ""}</span>
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