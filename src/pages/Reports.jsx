 import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Tooltip, Legend);

const API_URL = "https://workasana-backend-ten.vercel.app";

const Reports = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchAll = async () => {
      try {
        const [taskRes, userRes, projectRes, teamRes] = await Promise.all([
          axios.get(`${API_URL}/tasks`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/projects`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/teams`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTasks(taskRes.data);
        setUsers(userRes.data);
        setProjects(projectRes.data);
        setTeams(teamRes.data);
      } catch (err) {
        console.error("Error fetching report data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

   
  const lastWeekCompleted = tasks.filter((task) => {
    const updatedAt = new Date(task.updatedAt);
    const now = new Date();
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
    return task.status === "Completed" && updatedAt > sevenDaysAgo;
  });

  
  const pendingDays = tasks
    .filter((task) => task.status !== "Completed")
    .reduce((acc, curr) => acc + curr.timeToComplete, 0);

  
  const groupCount = (arr, key) =>
    arr.reduce((acc, task) => {
      const k = task[key];
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});

  const teamMap = Object.fromEntries(teams.map((t) => [t._id, t.name]));
  const projectMap = Object.fromEntries(projects.map((p) => [p._id, p.name]));
  const userMap = Object.fromEntries(users.map((u) => [u._id, u.name]));

  const closedTasks = tasks.filter((task) => task.status === "Completed");

  const closedByTeam = groupCount(closedTasks, "team");
  const closedByProject = groupCount(closedTasks, "project");

  const closedByOwner = {};
  closedTasks.forEach((task) => {
    task.owners.forEach((owner) => {
      closedByOwner[owner] = (closedByOwner[owner] || 0) + 1;
    });
  });

  if (loading) return <div className="text-center mt-5">Loading Reports...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📊 Workasana Reports</h2>

      
      <div className="mb-5">
        <h5>Total Work Done Last Week</h5>
        <Bar
          data={{
            labels: lastWeekCompleted.map((task) => task.name),
            datasets: [
              {
                label: "Completed Tasks",
                data: lastWeekCompleted.map((task) => task.timeToComplete),
                backgroundColor: "#4caf50",
              },
            ],
          }}
          options={{ responsive: true, plugins: { legend: { display: false } } }}
        />
      </div>

       
      <div className="mb-5">
        <h5>Total Days of Work Pending</h5>
        <Bar
          data={{
            labels: ["Pending Work"],
            datasets: [
              {
                label: "Days",
                data: [pendingDays],
                backgroundColor: "#ff9800",
              },
            ],
          }}
          options={{ responsive: true, plugins: { legend: { display: false } } }}
        />
      </div>

       
      <div className="mb-5">
        <h5>Tasks Closed by Team</h5>
        <Pie
          data={{
            labels: Object.keys(closedByTeam).map((id) => teamMap[id] || "Unknown"),
            datasets: [
              {
                label: "Tasks",
                data: Object.values(closedByTeam),
                backgroundColor: ["#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50"],
              },
            ],
          }}
        />
      </div>

       
      <div className="mb-5">
        <h5>Tasks Closed by Project</h5>
        <Pie
          data={{
            labels: Object.keys(closedByProject).map((id) => projectMap[id] || "Unknown"),
            datasets: [
              {
                label: "Tasks",
                data: Object.values(closedByProject),
                backgroundColor: ["#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4"],
              },
            ],
          }}
        />
      </div>

      
      <div className="mb-5">
        <h5>Tasks Closed by Owner</h5>
        <Pie
          data={{
            labels: Object.keys(closedByOwner).map((id) => userMap[id] || "Unknown"),
            datasets: [
              {
                label: "Tasks",
                data: Object.values(closedByOwner),
                backgroundColor: ["#ff5722", "#ff9800", "#ffc107", "#ffeb3b", "#cddc39"],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Reports;
