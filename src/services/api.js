import axios from "axios"

const API_URL = "http://localhost:5000" // Updated to match backend PORT

export const createLead = (leadData) => axios.post(`${API_URL}/leads`, leadData)
export const getLeads = (filters) =>
  axios.get(`${API_URL}/leads`, { params: filters })
export const updateLead = (id, leadData) =>
  axios.post(`${API_URL}/leads/${id}`, leadData) // Changed to POST
export const deleteLead = (id) => axios.delete(`${API_URL}/leads/${id}`)
export const getAgents = () => axios.get(`${API_URL}/agents`)
export const createComment = (leadId, commentData) =>
  axios.post(`${API_URL}/leads/${leadId}/comments`, commentData)
export const getComments = (leadId) =>
  axios.get(`${API_URL}/leads/${leadId}/comments`)
export const getReportLastWeek = () => axios.get(`${API_URL}/report/last-week`)
export const getReportPipeline = () => axios.get(`${API_URL}/report/pipeline`)
export const getReportClosedByAgent = () =>
  axios.get(`${API_URL}/report/closed-by-agent`)
