const API_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// User API
export const userAPI = {
  register: (userData) => apiCall('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  login: (credentials) => apiCall('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  getAll: () => apiCall('/users'),

  getById: (id) => apiCall(`/users/${id}`),
};

// Internship API
export const internshipAPI = {
  getAll: () => apiCall('/internships'),

  getById: (id) => apiCall(`/internships/${id}`),

  create: (internshipData) => apiCall('/internships', {
    method: 'POST',
    body: JSON.stringify(internshipData),
  }),

  update: (id, internshipData) => apiCall(`/internships/${id}`, {
    method: 'PUT',
    body: JSON.stringify(internshipData),
  }),

  delete: (id) => apiCall(`/internships/${id}`, {
    method: 'DELETE',
  }),
};

// Application API
export const applicationAPI = {
  getAll: (userId) => {
    const query = userId ? `?userId=${userId}` : '';
    return apiCall(`/applications${query}`);
  },

  getById: (id) => apiCall(`/applications/${id}`),

  create: (applicationData) => apiCall('/applications', {
    method: 'POST',
    body: JSON.stringify(applicationData),
  }),

  update: (id, updates) => apiCall(`/applications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),

  delete: (id) => apiCall(`/applications/${id}`, {
    method: 'DELETE',
  }),
};

// Task API
export const taskAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/tasks${query ? `?${query}` : ''}`);
  },

  getById: (id) => apiCall(`/tasks/${id}`),

  create: (taskData) => apiCall('/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  }),

  update: (id, updates) => apiCall(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),

  delete: (id) => apiCall(`/tasks/${id}`, {
    method: 'DELETE',
  }),
};

export default {
  users: userAPI,
  internships: internshipAPI,
  applications: applicationAPI,
  tasks: taskAPI,
};
