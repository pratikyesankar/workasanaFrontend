const baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:4000";
export const api = (path) => `${baseURL}${path.startsWith("/") ? path : "/" + path}`;
