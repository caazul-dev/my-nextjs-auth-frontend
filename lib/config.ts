export const CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://backend-125e.onrender.com",
  ENDPOINTS: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  ROUTES: {
    LOGIN: "/login",
    REGISTER: "/register",
    DASHBOARD: "/dashboard",
  },
};

// Helper function para mag-build ng full API URLs
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = CONFIG.API_BASE_URL.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
};