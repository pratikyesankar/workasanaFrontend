 import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
     <div className="d-flex justify-content-between">
       <h2>Teams</h2>
        <Link to="/teamForm" className="btn btn-primary">New Team</Link>
     </div>
      <div className="d-flex flex-wrap">
        {teams.map((team, index) => (
          <div key={team._id} className="card m-2">
            <div className="card-body">
              <h4 className="card-title">{team.name}</h4>
              <p className="card-text">{team.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;