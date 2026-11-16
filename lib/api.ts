import { CONFIG } from "./config";
import { clearTokens, getAccessToken, setTokens } from "./auth";

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requiresAuth = false, headers, ...restOptions } = options;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...restOptions,
  });

  if (response.status === 401 && requiresAuth) {
    clearTokens();
    if (typeof window !== "undefined") {
      window.location.href = CONFIG.ROUTES.LOGIN;
    }
    throw new Error("Session expired. Please log in again.");
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const errorMessage = Array.isArray(data.message)
      ? data.message.join(", ")
      : data.message || "An unexpected error occurred.";
    throw new Error(errorMessage);
  }

  return data as T;
}

export interface LoginResponse {
  accessToken?: string;
  access_token?: string;
  refreshToken?: string;
  refresh_token?: string;
  token?: string;
  [key: string]: unknown;
}

export async function loginUser(credentials: Record<string, unknown>) {
  const data = await apiClient<LoginResponse>(CONFIG.ENDPOINTS.LOGIN, {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const access = data.accessToken || data.access_token || data.token;
  const refresh = data.refreshToken || data.refresh_token;
  if (access) {
    setTokens(access, refresh);
  }

  return data;
}

export async function registerUser(userData: Record<string, unknown>) {
  return apiClient<Record<string, unknown>>(CONFIG.ENDPOINTS.REGISTER, {
    method: "POST",
    body: JSON.stringify(userData),
  });
}