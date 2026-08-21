/**
 * AgriSense AI Frontend API Client
 * Connects React UI to FastAPI Backend (/api/v1/...)
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Token Management
export function getAuthToken() {
  return localStorage.getItem('agrisense_token');
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('agrisense_token', token);
  } else {
    localStorage.removeItem('agrisense_token');
  }
}

// Base Fetch Helper
async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok || data.success === false) {
      const errorMsg = data.error?.message || `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }

    return data.data;
  } catch (err) {
    console.warn(`[API Client Warning] ${endpoint}:`, err.message);
    throw err;
  }
}

// Authentication API
export const authAPI = {
  register: (email, password, fullName) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name: fullName }),
    }),

  login: async (email, password) => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res?.access_token) {
      setAuthToken(res.access_token);
    }
    return res;
  },

  getMe: () => request('/auth/me'),
  logout: () => setAuthToken(null),
};

// Farm API
export const farmAPI = {
  createFarm: (farmData) =>
    request('/farms', {
      method: 'POST',
      body: JSON.stringify(farmData),
    }),
  getFarms: () => request('/farms'),
  getFarm: (id) => request(`/farms/${id}`),
};

// Crop API
export const cropAPI = {
  createCrop: (cropData) =>
    request('/crops', {
      method: 'POST',
      body: JSON.stringify(cropData),
    }),
  getCrops: () => request('/crops'),
  getCrop: (id) => request(`/crops/${id}`),
};

// Soil API
export const soilAPI = {
  saveSoilData: (cropId, soilData) =>
    request(`/crops/${cropId}/soil`, {
      method: 'POST',
      body: JSON.stringify(soilData),
    }),
  getSoilData: (cropId) => request(`/crops/${cropId}/soil`),
};

// Photo & Voice Upload API
export const mediaAPI = {
  uploadPhoto: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return request('/photos/upload', {
      method: 'POST',
      body: formData,
    });
  },

  transcribeVoice: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return request('/voice/transcribe', {
      method: 'POST',
      body: formData,
    });
  },
};

// Diagnosis & Follow-up API
export const diagnosisAPI = {
  runDiagnosis: (cropId, formData) =>
    request(`/crops/${cropId}/diagnose`, {
      method: 'POST',
      body: formData,
    }),

  getDiagnosis: (diagnosisId) => request(`/diagnoses/${diagnosisId}`),
  listDiagnoses: (cropId) => request(`/crops/${cropId}/diagnoses`),

  runFollowup: (diagnosisId, formData) =>
    request(`/diagnoses/${diagnosisId}/followup`, {
      method: 'POST',
      body: formData,
    }),

  listFollowups: (diagnosisId) => request(`/diagnoses/${diagnosisId}/followups`),
};
