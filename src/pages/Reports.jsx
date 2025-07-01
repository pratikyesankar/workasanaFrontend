import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

 
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Reports = () => {
   

  const sampleProjects = [
    { "_id": "507f1f77bcf86cd799439011", "name": "E-Commerce Platform" },
    { "_id": "507f1f77bcf86cd799439014", "name": "Task Management App" },
    { "_id": "60c72b2f9a7b3c001f8d4c1a", "name": "Marketing Campaign" }
  ];

  const sampleTeams = [
    { "_id": "507f191e810c19729de860ea", "name": "Frontend Crew" },
    { "_id": "507f191e810c19729de860eb", "name": "Backend Squad" },
    { "_id": "60c72b2f9a7b3c001f8d4c1b", "name": "Marketing Team" }
  ];

  const sampleUsers = [
    { "_id": "507f1f77bcf86cd799439012", "name": "John Doe" },
    { "_id": "507f1f77bcf86cd799439013", "name": "Jane Smith" },
    { "_id": "507f1f77bcf86cd799439015", "name": "Alice Johnson" },
    { "_id": "60c72b2f9a7b3c001f8d4c1c", "name": "Bob Williams" }
  ];

  const sampleTasks = [
    {
      "name": "Implement Login Feature",
      "project": "507f1f77bcf86cd799439011",  
      "team": "507f191e810c19729de860ea",  
      "owners": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],  
      "status": "In Progress",
      "updatedAt": "2025-06-18T13:00:00.000Z"
    },
    {
      "name": "Database Optimization",
      "project": "507f1f77bcf86cd799439014",  
      "team": "507f191e810c19729de860eb",  
      "owners": ["507f1f77bcf86cd799439015"],  
      "timeToComplete": 7,
      "status": "To Do",
      "updatedAt": "2025-06-18T12:00:00.000Z"
    },
    {
      "name": "Design Landing Page",
      "project": "507f1f77bcf86cd799439011", 
      "team": "507f191e810c19729de860ea",  
      "owners": ["507f1f77bcf86cd799439012"], 
      "timeToComplete": 3,
      "status": "Completed",
      "updatedAt": "2025-06-28T15:30:00.000Z" 
    },
    {
      "name": "API Integration for Payments",
      "project": "507f1f77bcf86cd799439011",  
      "team": "507f191e810c19729de860eb", 
      "owners": ["507f1f77bcf86cd799439015"],  
      "timeToComplete": 4,
      "status": "Completed",
      "updatedAt": "2025-06-29T11:00:00.000Z"  
    },
    {
      "name": "Develop Marketing Strategy",
      "project": "60c72b2f9a7b3c001f8d4c1a",  
      "team": "60c72b2f9a7b3c001f8d4c1b",  
      "owners": ["60c72b2f9a7b3c001f8d4c1c"],  
      "timeToComplete": 10,
      "status": "In Progress",
      "updatedAt": "2025-06-20T14:00:00.000Z"
    },
    {
      "name": "Fix Critical Bug in Task App",
      "project": "507f1f77bcf86cd799439014",  
      "team": "507f191e810c19729de860ea",  
      "owners": ["507f1f77bcf86cd799439013"],  
      "timeToComplete": 2,
      "status": "Completed",
      "updatedAt": "2025-06-25T10:00:00.000Z"  
    }
  ];

  
  const [lastWeekData, setLastWeekData] = useState({});
  const [pendingData, setPendingData] = useState({});
  const [closedTasksData, setClosedTasksData] = useState({});

  // Helper maps for ID to Name conversion
  const projectMap = new Map(sampleProjects.map(p => [p._id, p.name]));
  const teamMap = new Map(sampleTeams.map(t => [t._id, t.name]));
  const userMap = new Map(sampleUsers.map(u => [u._id, u.name]));

  
  const processReportData = () => {
    console.log("Starting processReportData...");
    const today = new Date('2025-07-01T12:00:00.000Z');  
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Initialize report data structures
    const lastWeekReport = { byProject: {}, totalCompletedTasks: 0 };
    const pendingReport = { byProject: {}, totalPendingDays: 0 };
    const closedTasksReport = { byTeam: {}, byOwner: {} };

    sampleTasks.forEach(task => {
      const projectName = projectMap.get(task.project) || 'Unknown Project';
      const teamName = teamMap.get(task.team) || 'Unknown Team';
      console.log(`Processing task: ${task.name}, Project: ${projectName}, Team: ${teamName}`);

      // 1. Tasks Completed Last Week
      if (task.status === 'Completed') {
        const updatedAtDate = new Date(task.updatedAt);
        if (updatedAtDate >= oneWeekAgo && updatedAtDate <= today) {
          lastWeekReport.byProject[projectName] = (lastWeekReport.byProject[projectName] || 0) + 1;
          lastWeekReport.totalCompletedTasks += 1;
          console.log(`  Task "${task.name}" completed last week.`);
        }
      }

      // 2. Pending Work
      if (task.status !== 'Completed') {
        pendingReport.byProject[projectName] = (pendingReport.byProject[projectName] || 0) + task.timeToComplete;
        pendingReport.totalPendingDays += task.timeToComplete;
        console.log(`  Task "${task.name}" is pending. Time: ${task.timeToComplete}`);
      }

      // 3. Closed Tasks by Team and Owner
      if (task.status === 'Completed') {
        closedTasksReport.byTeam[teamName] = (closedTasksReport.byTeam[teamName] || 0) + 1;
        task.owners.forEach(ownerId => {
          const ownerName = userMap.get(ownerId) || 'Unknown Owner';
          closedTasksReport.byOwner[ownerName] = (closedTasksReport.byOwner[ownerName] || 0) + 1;
          console.log(`  Task "${task.name}" closed by owner: ${ownerName}`);
        });
      }
    });

    console.log("Processed Data:", { lastWeekReport, pendingReport, closedTasksReport });

    setLastWeekData(lastWeekReport);
    setPendingData(pendingReport);
    setClosedTasksData(closedTasksReport);
    console.log("State updated.");
  };

  useEffect(() => {
    try {
      processReportData();  
    } catch (error) {
      console.error("Error in useEffect during data processing:", error);
       
    }
  }, []);  
 

  const lastWeekChartData = {
    labels: Object.keys(lastWeekData.byProject || {}), 
    datasets: [{
      label: 'Tasks Completed Last Week',
      data: Object.values(lastWeekData.byProject || {}), 
      backgroundColor: 'rgba(75, 192, 192, 0.7)',  
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      borderRadius: 5,  
    }]
  };

 
  const pendingChartData = {
    labels: Object.keys(pendingData.byProject || {}), 
    datasets: [{
      label: 'Pending Days by Project',
      data: Object.values(pendingData.byProject || {}), 
      backgroundColor: 'rgba(255, 99, 132, 0.7)', 
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      borderRadius: 5, 
    }]
  };

  
  const closedTasksByTeamChartData = {
    labels: Object.keys(closedTasksData.byTeam || {}), 
    datasets: [{
      label: 'Tasks Closed by Team',
      data: Object.values(closedTasksData.byTeam || {}),  
      backgroundColor: [ 
        'rgba(255, 99, 132, 0.7)',  
        'rgba(54, 162, 235, 0.7)',  
        'rgba(255, 206, 86, 0.7)',  
        'rgba(75, 192, 192, 0.7)',  
        'rgba(153, 102, 255, 0.7)',  
        'rgba(255, 159, 64, 0.7)',  
      ],
      borderColor: '#fff', 
      borderWidth: 2,
    }]
  };

 
  const closedTasksByOwnerChartData = {
    labels: Object.keys(closedTasksData.byOwner || {}), 
    datasets: [{
      label: 'Tasks Closed by Owner',
      data: Object.values(closedTasksData.byOwner || {}),  
      backgroundColor: [  
        'rgba(153, 102, 255, 0.7)',  
        'rgba(255, 159, 64, 0.7)',  
        'rgba(75, 192, 192, 0.7)',  
        'rgba(255, 99, 132, 0.7)',  
        'rgba(54, 162, 235, 0.7)', 
        'rgba(255, 206, 86, 0.7)', 
      ],
      borderColor: '#fff', 
      borderWidth: 2,
    }]
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <div className="container mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Workasana Task Reports</h1>

        
        <div className="mb-10 p-6 bg-blue-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Tasks Completed Last Week</h2>
          <p className="text-center text-lg text-gray-600 mb-6">
            A snapshot of completed tasks across different projects in the past seven days.
          </p>
          <div className="h-[400px] w-full"> 
            <Bar
              data={lastWeekChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,  
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      font: { size: 14 }
                    }
                  },
                  title: {
                    display: true,
                    text: 'Tasks Completed by Project',
                    font: { size: 18, weight: 'bold' },
                    color: '#333'
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: { size: 16 },
                    bodyFont: { size: 14 },
                    padding: 10,
                    cornerRadius: 8,
                  }
                },
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { font: { size: 12 } }
                  },
                  y: {
                    beginAtZero: true,
                    ticks: { font: { size: 12 } }
                  }
                }
              }}
            />
          </div>
        </div>
 

        <div className="mb-10 p-6 bg-red-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">Pending Work by Project</h2>
          <p className="text-center text-lg text-gray-600 mb-2">
            Estimated days remaining to complete all tasks, broken down by project.
          </p>
          <p className="text-center text-xl font-semibold text-red-700 mb-6">
            Total Pending Days: <span className="font-extrabold">{pendingData.totalPendingDays || 0}</span>
          </p>
          <div className="h-[400px] w-full">  
            <Bar
              data={pendingChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      font: { size: 14 }
                    }
                  },
                  title: {
                    display: true,
                    text: 'Pending Days by Project',
                    font: { size: 18, weight: 'bold' },
                    color: '#333'
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: { size: 16 },
                    bodyFont: { size: 14 },
                    padding: 10,
                    cornerRadius: 8,
                  }
                },
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { font: { size: 12 } }
                  },
                  y: {
                    beginAtZero: true,
                    ticks: { font: { size: 12 } }
                  }
                }
              }}
            />
          </div>
        </div>

       
        <div className="mb-10 p-6 bg-purple-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">Tasks Closed by Team</h2>
          <p className="text-center text-lg text-gray-600 mb-6">
            Distribution of completed tasks across different teams.
          </p>
          <div className="h-[500px] w-full flex justify-center items-center">  
            <div className="w-full max-w-md">  
              <Pie
                data={closedTasksByTeamChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right', 
                      labels: {
                        font: { size: 14 }
                      }
                    },
                    title: {
                      display: true,
                      text: 'Tasks Closed by Team',
                      font: { size: 18, weight: 'bold' },
                      color: '#333'
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      titleFont: { size: 16 },
                      bodyFont: { size: 14 },
                      padding: 10,
                      cornerRadius: 8,
                      callbacks: {
                        label: function(context) {
                          let label = context.label || '';
                          if (label) {
                            label += ': ';
                          }
                          if (context.parsed !== null) {
                            label += context.parsed;
                          }
                          return label;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

         
        <div className="mb-10 p-6 bg-green-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Tasks Closed by Owner</h2>
          <p className="text-center text-lg text-gray-600 mb-6">
            Breakdown of completed tasks by individual team members.
          </p>
          <div className="h-[500px] w-full flex justify-center items-center"> 
            <div className="w-full max-w-md"> 
              <Pie
                data={closedTasksByOwnerChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',  
                      labels: {
                        font: { size: 14 }
                      }
                    },
                    title: {
                      display: true,
                      text: 'Tasks Closed by Owner',
                      font: { size: 18, weight: 'bold' },
                      color: '#333'
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      titleFont: { size: 16 },
                      bodyFont: { size: 14 },
                      padding: 10,
                      cornerRadius: 8,
                      callbacks: {
                        label: function(context) {
                          let label = context.label || '';
                          if (label) {
                            label += ': ';
                          }
                          if (context.parsed !== null) {
                            label += context.parsed;
                          }
                          return label;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
