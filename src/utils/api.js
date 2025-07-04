const baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "https://workasana-frontend-two.vercel.app";
export const api = (path) => `${baseURL}${path.startsWith("/") ? path : "/" + path}`;
