const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nestjs-backend-uu26.onrender.com';

// Generic apiClient helper para sa mga susunod na API requests
export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message || 'An error occurred';
    throw new Error(message);
  }

  return response.json();
}

// User Registration Function
export async function registerUser(data: { username: string; pass: string }) {
  const payload = {
    username: data.username,
    email: `${data.username.replace(/\s+/g, '')}@gmail.com`,
    password: data.pass,
  };

  return apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// User Login Function
export async function loginUser(data: { username: string; pass: string }) {
  const payload = {
    username: data.username,
    password: data.pass,
  };

  return apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}