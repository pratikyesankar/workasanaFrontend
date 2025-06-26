# WorkAsana
## Project Overview
WorkAsana is a task and project management application designed to enhance team collaboration and streamline task tracking. It offers an intuitive interface for managing tasks, teams, and projects with robust filtering, reporting, and visualization features. Built with a modern tech stack, WorkAsana ensures scalability, security, and a seamless user experience.
 

### Authentication  

- Login: Secure form for user login with email and password. Validates credentials and stores a JWT token in localStorage. Displays error messages for invalid inputs.  
- Signup: Form for new users to register with name, email, and password. Sends data to the backend and shows success or error messages.  
- Logout: Clears JWT token and redirects to the login page.


### Task Management  

- TaskForm: Create tasks with fields:  
- Task Name  
- Project Name (dropdown)  
- Owners (multi-select dropdown for team members)  
- Team (dropdown: Sales, Marketing, Development, Finance)  
- Tags (multi-select: e.g., Urgent, Bug)  
- Time to Complete (days, number input)  
- Status (dropdown: To Do, In Progress, Completed, Blocked)


## TaskList:
Displays tasks with filters for owner, team, tags, project, and status. Supports URL-based filtering (e.g., /tasks?owner=Tanay&team=development). Allows sorting by completion date or priority.  
## TaskDetails:
Shows detailed task information (project, team, owners, tags, status) with options to update or modify tasks.


## Project and Team Views  

- ProjectView: Groups tasks by project, displaying project name and task details with in-view filtering (e.g., by tags or owner).  
- TeamView: Groups tasks by team (Sales, Marketing, Development, Finance) with sorting and filtering by status or due dates.

## Reports and Visualizations  

Total work completed last week (bar chart).  
Total days of work pending (bar chart).  
Tasks closed by team, owner, or project (pie chart).  
Visualizations powered by Chart.js.


Filtering  

URL-based filters (e.g., /tasks?team=development&tags=Urgent).  
UI updates dynamically based on URL query parameters.



# Backend Features

## API Endpoints  

- POST /auth/signup: Register new users with password hashing (bcrypt).  
- POST /auth/login: Authenticate users and issue JWT tokens.  
- GET /auth/me: Fetch authenticated user details.  
- Task endpoints:  
- POST /tasks: Create a task.  
- GET /tasks: Fetch tasks with filters (team, owner, tags, project, status).  
- POST /tasks/:id: Update a task.  
- DELETE /tasks/:id: Delete a task.


POST /teams, GET /teams: Manage teams.  
POST /projects, GET /projects: Manage projects.  
POST /tags, GET /tags: Manage tags for task categorization.  
Reporting endpoints:  
GET /report/last-week: Tasks completed in the last 7 days.  
GET /report/pending: Sum of pending task completion days.  
GET /report/closed-tasks: Statistics of closed tasks by team, owner, or project.


## Authentication  

JWT-based middleware ensures only authenticated users access protected routes.  
Appropriate error handling for invalid credentials or missing tokens.

Tech Stack

Frontend:  

React (with Vite for fast development)  
React Router for URL-based navigation  
Axios for API requests  
Bootstrap for responsive styling  
Chart.js for visualizations


Backend:  

Express.js for RESTful APIs  
MongoDB with Mongoose for database interactions  
JWT and bcrypt for authentication


Database: MongoDB with models for:  

Tasks  
Teams  
Projects  
Users  
Tags


### Set up environment variables in backend.
JWT_SECRET=your_jwt_secret_key
PORT=4000

### Usage

Sign Up: Register with name, email, and password.<br/>
Log In: Authenticate to access the app; JWT token stored in localStorage.<br/>  
Manage Tasks: Create, view, and edit tasks using TaskForm and TaskList.<br/>  
Filter Tasks: Use URL filters (e.g., /tasks?team=development) or UI controls.<br/>
View Reports: Check task progress and team productivity via visualizations.<br/>
Manage Teams/Projects: Add and organize teams and projects.<br/>
Logout: Clears token and redirects to login page.<br/>

# Database Models

- Task: Stores task details with references to Project, Team, and Users (owners). Includes tags, timeToComplete, and status (To Do, In Progress, Completed, Blocked).  
- Team: Unique team names with optional descriptions.  
- Project: Unique project names with optional descriptions.  
- User: Unique emails and names for task owners.  
- Tag: Unique tag names for task categorization.









