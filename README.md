#  Anvaya CRM App

A full-stack CRM (Customer Relationship Management) system for managing leads, tracking sales agent performance, adding comments, tagging leads, and viewing visual reports.

---

## 🔗 Demo Link

[Live Demo](https://vercel.com/pratiks-projects-d3474ba5/major-project2frontend)

---

## ⚡ Quick Start

```bash
git clone (https://github.com/pratikyesankar/majorProject2frontend)
cd anvaya-crm
npm install
npm run dev
```
---

## Technologies

* **React JS**
* **React Router**
* **Axios**
* **Chart.js**
* **Node.js**
* **Express**
* **MongoDB**


## Demo Video
[Loom Video] (https://drive.google.com/file/d/1dYTK7snW_LtqlnT6hPdcL-emelmOrfM0/view?usp=sharing)
---

## Features

**LeadForm**

* Create new lead with fields:

  * Lead Name
  * Lead Source (Website, Referral, Cold Call)
  * Assigned Sales Agent
  * Lead Status (New, Contacted, Qualified, Proposal Sent, Closed)
  * Tags (multi-select)
  * Time to Close (in days)
  * Priority (High, Medium, Low)

**LeadList**

* View all leads with filters:

  * Sales Agent
  * Lead Status
  * Tags
  * Lead Source
* URL-based filtering (e.g., `/leads?salesAgent=John&status=Qualified`)
* Sort by estimated closing time or priority

**LeadDetails**

* Detailed view of a single lead
* Comments section with author, timestamp, and comment text
* Update lead details

**LeadStatusView**

* Group leads by their status
* Inline filters (e.g., by agent or tags within status)

**SalesAgentView**

* Group leads by assigned sales agent
* Filter and sort by status or priority

**Reports and Visualization**

* Leads Closed Last Week: Bar chart
* Total Leads in Pipeline: Bar chart grouped by status
* Leads by Sales Agent: Pie chart or bar chart
* Lead Status Distribution: Pie chart

**Filtering**

* URL-based filters like:

  * `/leads?salesAgent=John`
  * `/leads?status=Qualified`
  * `/leads?source=Referral`
  * Combined filters supported

---

## API Reference

### **POST /leads**

 

### **GET /leads**

Get leads with optional filters: `salesAgent`, `status`, `tags`, `source`

### **PATCH /leads/\:id**

Update lead details

### **DELETE /leads/\:id**

Delete a lead

### **POST /agents**

 

### **GET /agents**

Get all sales agents

### **POST /leads/\:id/comments**

---
## Contact
* For bugs or feature requests, please reach out to pratikiitkgp585@gmail.com
